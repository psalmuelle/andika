import React, { useState } from "react";
import { BarChart3, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectType } from "types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistance } from "date-fns";
import { Empty } from "antd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const timeAgo = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

const formSchema = z.object({
  hostname: z.string(),
  url: z.string().url(),
});

export default function ProjectInfoSidebar({
  project,
  isLoading,
}: {
  project: ProjectType;
  isLoading: boolean;
}) {
  const [activityInput, setActivityInput] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostname: "",
      url: "",
    },
  });

  const createActivity = useMutation({
    mutationKey: ["activity", "create"],
    mutationFn: async (activity: string) => {
      const response = await axiosInstance.post(
        `/project/activity/create`,
        {
          activity,
          projectId: project.id,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess() {
      toast({
        title: `Activity created Successfully`,
        description: "A project activity has been added.",
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

  const createProjectFile = useMutation({
    mutationKey: ["project", "file"],
    mutationFn: async ({
      hostname,
      url,
    }: {
      hostname: string;
      url: string;
    }) => {
      const response = await axiosInstance.post(
        `/project/file/create`,
        {
          hostname,
          url,
          projectId: project.id,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess() {
      toast({
        title: `Project File added Successfully`,
        description: "A project file has been added.",
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createProjectFile.mutateAsync({
      hostname: values.hostname,
      url: values.url,
    });
    form.resetField("hostname");
    form.resetField("url");
  }

  return (
    <div className="flex w-full max-w-xs grid-cols-2 flex-col gap-6 max-lg:grid max-sm:grid-cols-1">
      {/* Assigned Writer */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src={project?.owner?.avatar}
                alt={project?.owner?.name}
              />
              <AvatarFallback>
                {project?.owner?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{project?.owner?.name}</h3>
              <p className="text-xs font-semibold text-muted-foreground">
                {project?.owner?.company} || {project?.owner?.position}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="row-span-2 w-full max-sm:row-span-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[286px]">
          <CardContent>
            <div className="space-y-4">
              {!isLoading &&
                project?.activities.length > 0 &&
                project?.activities
                  .sort((a, b) => b.id - a.id)
                  .map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <BarChart3 className="mt-1 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-gray-600">{activity?.activity}</p>
                        <p className="text-xs text-gray-500">
                          {timeAgo(activity?.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
              {!isLoading && project?.activities.length === 0 && (
                <Empty
                  className="mt-8"
                  description={"No recent activities"}
                  imageStyle={{
                    width: "80px",
                    display: "block",
                    margin: "0px auto",
                  }}
                />
              )}
            </div>
          </CardContent>
        </ScrollArea>
        <CardFooter>
          <div className="w-full space-y-3 rounded-lg bg-muted-foreground/10 p-4">
            <Input
              onChange={(e) => {
                setActivityInput(e.target.value);
              }}
              value={activityInput}
              placeholder="Add activity..."
              className="block w-full"
            />
            <Button
              variant={"outline"}
              type="submit"
              loading={createActivity.isPending}
              onClick={() => {
                if (activityInput.trim() === "") return;
                createActivity.mutate(activityInput);
                setActivityInput("");
              }}
              className="w-full"
            >
              Add Activity
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Link to Project Work */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Link to Project Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="w-full list-inside list-disc space-y-1">
            {project &&
              project.files.length > 0 &&
              project.files.map((file) => (
                <li key={file.id}>
                  <a
                    className="text-blue-500"
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.hostname}
                  </a>
                </li>
              ))}
          </ul>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Download className="mr-3 h-5 w-5" />
                Upload Project Work
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Finished Project</DialogTitle>
                <DialogDescription>
                  Upload the finished project file to the client.
                </DialogDescription>
              </DialogHeader>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="hostname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder="Name of site file is hosted"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Url</FormLabel>
                          <FormControl>
                            <Input
                              type={"url"}
                              placeholder="https://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      loading={createProjectFile.isPending}
                      type="submit"
                      className="w-full"
                    >
                      Save
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
