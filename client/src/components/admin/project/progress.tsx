import {
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusIcon,
  CalendarIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Empty } from "antd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectType } from "types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { PopoverClose } from "@radix-ui/react-popover";

const formSchema = z.object({
  task: z.string().min(3, {
    message: "Enter task name",
  }),
  dueDate: z.date(),
});

export function ProjectProgress({
  project,
  isLoading,
}: {
  project: ProjectType;
  isLoading: boolean;
}) {
  const [editName, setEditName] = useState<string>();
  const [addBtnLoading, setAddBtnLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      dueDate: new Date(),
    },
  });

  const mutateTaskStatus = useMutation({
    mutationKey: ["project", "task"],
    mutationFn: async ({
      status,
      taskId,
    }: {
      status: string;
      taskId: number;
    }) => {
      const response = await axiosInstance.put(
        `/project/task/update/${taskId}`,
        {
          status,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },

    onSuccess() {
      toast({
        title: `${editName} Updated Successfully`,
        description: `The ${editName} has been updated.`,
      });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error instanceof AxiosError ? error.response?.data.message : "Something went wrong"}`,
        description: "There was a problem with your request.",
      });
    },
  });

  const mutateProjectProgress = useMutation({
    mutationKey: ["project", "title"],
    mutationFn: async ({ status }: { status?: string; dueDate?: string }) => {
      const response = await axiosInstance.put(
        `/project/update/${project.id}`,
        {
          status,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },

    onSuccess() {
      toast({
        title: `${editName} Updated Successfully`,
        description: `The ${editName} has been updated.`,
      });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error instanceof AxiosError ? error.response?.data.message : "Something went wrong"}`,
        description: "There was a problem with your request.",
      });
    },
  });

  const createTask = useMutation({
    mutationKey: ["project", "task"],
    mutationFn: async ({
      task,
      projectId,
      dueDate,
    }: {
      task: string;
      projectId: number;
      dueDate: Date;
    }) => {
      setAddBtnLoading(true);
      const response = await axiosInstance.post(
        `/project/task/create`,
        {
          task,
          projectId,
          dueDate,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess() {
      setAddBtnLoading(false);
      toast({
        title: `Task Created Successfully`,
        description: "A task has been added.",
      });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error instanceof AxiosError ? error.response?.data.message : "Something went wrong"}`,
        description: "There was a problem with your request.",
      });
      setAddBtnLoading(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createTask.mutateAsync({
      task: values.task,
      projectId: project.id,
      dueDate: values.dueDate,
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Progress</CardTitle>
        <Select
          defaultValue={project?.status}
          onValueChange={(value) => {
            if (value !== project?.status) {
              mutateProjectProgress.mutate({ status: value });
              setEditName("Project status");
            }
          }}
        >
          <SelectTrigger className="w-fit capitalize">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex justify-between font-medium">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="">{project?.overallProgress}%</span>
        </div>
        <Progress className="h-2" value={project?.overallProgress} />

        <div className="mt-6 space-y-4">
          {!isLoading &&
            project?.tasks.length > 0 &&
            project?.tasks
              .sort((a, b) => a.id - b.id)
              .map((milestone, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex items-center space-x-3">
                        {milestone.status === "COMPLETED" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : milestone.status === "IN_PROGRESS" ? (
                          <Clock className="h-5 w-5 text-blue-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-300" />
                        )}
                        <span
                          className={
                            milestone.status === "COMPLETED"
                              ? "text-gray-600 line-through"
                              : "text-gray-600"
                          }
                        >
                          {milestone.task}
                        </span>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      align="start"
                      className={
                        milestone.status === "COMPLETED" ? "hidden" : ""
                      }
                    >
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Confirm changes
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            You are about to change the status to{" "}
                            {milestone.status === "NEW"
                              ? "In Progress"
                              : "Completed"}
                            . Are you sure?
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <Button
                            size={"sm"}
                            className="w-full"
                            onClick={() => {
                              mutateTaskStatus.mutate({
                                status:
                                  milestone.status === "NEW"
                                    ? "IN_PROGRESS"
                                    : "COMPLETED",
                                taskId: milestone.id,
                              });
                              setEditName(milestone.task);
                            }}
                          >
                            Yes
                          </Button>
                          <PopoverClose asChild>
                            <Button
                              size={"sm"}
                              className="w-full"
                              variant="outline"
                            >
                              No
                            </Button>
                          </PopoverClose>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <span className="text-sm text-gray-500">
                    {format(milestone.dueDate, 'PP')}
                  </span>
                </div>
              ))}
          {!isLoading && project.tasks.length === 0 && (
            <>
              <Empty
                description={"No task found"}
                imageStyle={{
                  width: "100px",
                  display: "block",
                  margin: "0px auto",
                }}
              />
            </>
          )}

          <div className="w-full pt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-no-wrap flex w-full items-center gap-2"
              >
                <FormField
                  control={form.control}
                  name="task"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Add Task..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex min-w-44 flex-col">
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`"pl-3 font-normal", text-left text-sm ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PP")
                              ) : (
                                <span>Select Due Date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size={"sm"}
                  className="h-9 w-9 rounded-full"
                  loading={addBtnLoading}
                >
                  <PlusIcon />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
