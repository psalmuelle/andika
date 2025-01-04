import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, FileText } from "lucide-react";
import { ProjectType } from "types";
import { Typography } from "antd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";

const { Paragraph } = Typography;

export default function ProjectOverview({ project }: { project: ProjectType }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editName, setEditName] = useState<string>();

  const mutateProjectOverview = useMutation({
    mutationKey: ["project", "title"],
    mutationFn: async ({
      description,
      dueDate,
    }: {
      description?: string;
      dueDate?: string;
    }) => {
      const response = await axiosInstance.put(
        `/project/update/${project.id}`,
        {
          description,
          dueDate,
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
        description: "The project title has been updated.",
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

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          <div className="flex items-center gap-0.5">
            <FileText className="h-5 text-muted-foreground/80" />
            <div>
              <CardDescription className="mb-0.5">Project Type</CardDescription>
              <CardTitle className="font-medium">
                {project?.projectType}
              </CardTitle>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <CalendarIcon className="h-5 text-muted-foreground/80" />
            <div>
              <CardDescription className="mb-0.5">Start Date</CardDescription>
              <CardTitle className="font-medium">
                {format(project?.startDate, "PPP")}
              </CardTitle>
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <div className="flex cursor-pointer items-center gap-0.5">
                <CalendarIcon className="h-5 text-muted-foreground/80" />
                <div>
                  <CardDescription className="mb-0.5">Due Date</CardDescription>
                  <CardTitle className="font-medium">
                    {format(project?.dueDate, "PPP")}
                  </CardTitle>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(project?.dueDate)}
                onSelect={(date) => {
                  if (
                    date &&
                    date.getTime() !== new Date(project?.dueDate).getTime()
                  ) {
                    setEditName("Due Date");
                    mutateProjectOverview.mutate({
                      dueDate: date.toISOString(),
                    });
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <Paragraph
          editable={{
            onChange: (value) => {
              setEditName("Description");
              mutateProjectOverview.mutate({ description: value });
            },
            icon: "✏️",
            tooltip: "Click to edit project title",
          }}
        >
          {project.description}
        </Paragraph>
      </CardContent>
    </Card>
  );
}
