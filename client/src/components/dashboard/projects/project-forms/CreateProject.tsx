import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileType } from "types";
import axiosInstance from "@/config/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Typography from "@/components/ui/typography";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(6, {
    message: "Enter a title with at least 6 characters",
  }),
  description: z.string().min(6, {
    message: "Enter a description with at least 6 characters",
  }),
  projectType: z.string().min(2, {
    message: "Select project type",
  }),
  startDate: z.date(),
  dueDate: z.date(),
  fee: z.string(),
});

export default function CreateProjectForm({ admin }: { admin: ProfileType }) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [projReqId, setProjReqId] = useState<string>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      projectType: "",
      fee: "",
    },
  });

  useEffect(() => {
    const projectRequestId = searchParams.get("create");
    if (!projectRequestId) return;
    setProjReqId(projectRequestId);
    setOpenModal(true);
  }, []);

  const { data: projectRequest } = useQuery({
    queryKey: ["projectRequest", projReqId],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return;
      const response = await axiosInstance.get(
        `/project-request/${queryKey[1]}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    enabled: !!projReqId,
  });

  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axiosInstance.post(
        "/project/create",
        {
          ...values,
          assignedPMId: admin.userId,
          ownerId: projectRequest.user.id,
          status: "PENDING",
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Project created successfully!",
        description: "Your project has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      form.reset();
      setProjReqId("");
      setOpenModal(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof AxiosError
            ? error.response?.data.message
            : "There was a problem with your request.",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation.mutateAsync(values);
      await axiosInstance.put(
        `/project-request/update/${projReqId}`,
        {},
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            <p className="flex items-center gap-4">
              <span> Create Project For Request Id:</span>{" "}
              <Input
                className="w-10 text-center font-semibold text-gray-900"
                maxLength={3}
                defaultValue={projReqId}
                onChange={(e) => setProjReqId(e.target.value)}
              />
            </p>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh]">
          {projectRequest && (
            <div>
              <Typography as={"p"} className="font-semibold">
                Request Details
              </Typography>
              <div className="rounded-lg">
                <JsonView
                  data={projectRequest}
                  style={darkStyles}
                  shouldExpandNode={allExpanded}
                />
              </div>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-4 space-y-6 px-2"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"description"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description of the project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select documentation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="API/SDK Documentation">
                          API/SDK Documentation
                        </SelectItem>
                        <SelectItem value="Editing/Proofreading">
                          Editing/Proofreading
                        </SelectItem>
                        <SelectItem value="Technical Articles">
                          Technical Articles
                        </SelectItem>
                        <SelectItem value="Whitepapers">Whitepapers</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`"pl-3 font-normal", text-left ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick Start Date</span>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`"pl-3 font-normal", text-left ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick Deadline</span>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"Enter the fee for the project"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size={"lg"}
                type="submit"
                loading={mutation.isPending}
                className="w-full"
              >
                Submit
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
