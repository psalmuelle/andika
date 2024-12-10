import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import { ProfileType } from "types";
import axiosInstance from "@/config/axios";
import { useRouter } from "next/navigation";

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
  assignedPMId: z.string(),
});

export default function CreateProjectForm({
  requestId,
  projectOwnerId,
  requestStatus,
  admins,
}: {
  projectOwnerId: number;
  requestId: number;
  admins: ProfileType[];
  requestStatus: "NEW" | "STARTED"
}) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      projectType: "",
      fee: "",
      assignedPMId: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axiosInstance.post(
        "/project/create",
        {
          ...values,
          assignedPMId: +values.assignedPMId,
          ownerId: projectOwnerId,
          status: "PENDING",
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation.mutateAsync(values);
      await axiosInstance.put(
        `/project-request/update/${requestId}`,
        {},
        {
          withCredentials: true,
        },
      );
      toast({
        title: "Project created successfully!",
        description: "Your project has been created successfully.",
      });
      form.reset();
      router.push("/admin/dashboard/projects");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof AxiosError
            ? error.response?.data.message
            : "There was a problem with your request.",
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
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
                  <Popover>
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

          <FormField
            control={form.control}
            name="assignedPMId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign Writer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Writer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {admins
                      ?.filter((admin) => admin.position === "Technical Writer")
                      ?.map((admin, id) => (
                        <SelectItem key={id} value={admin.userId.toString()}>
                          {admin.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
    </>
  );
}
