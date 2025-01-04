import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Typography } from "antd";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileType, ProjectType } from "types";
import AdminChatClient from "./chatClientModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface Props {
  project: ProjectType;
}

const { Paragraph } = Typography;

export default function InfoCard({ project }: Props) {
  const [projectTitle, setProjectTitle] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutateProjectTitle = useMutation({
    mutationKey: ["project", "title"],
    mutationFn: async (title: string) => {
      const response = await axiosInstance.post(
        `/project/update/${project.id}`,
        {
          title,
        },
      );
      return response.data;
    },

    onSuccess() {
      toast({
        title: "Title Updated Successfully",
        description: "The project title has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error instanceof AxiosError ? error.response?.data.message : "Something went wrong"}`,
        description: "There was a problem with your request.",
      });
    },
  });

  useEffect(() => {
    if(projectTitle.length === 0)
    setProjectTitle(project?.title);
  }, [project, projectTitle]);
  return (
    <div className="mt-8 flex items-center justify-between gap-4 border-b pb-2">
      <div className="w-full">
        <Typography className="text-sm font-semibold">
          Project #PRJB{project?.id}-{project?.createdAt.slice(0, 10)}
        </Typography>
        <Paragraph
          className="mt-2"
          editable={{
            onChange: (value)=> {
                console.log(value)
                setProjectTitle(value);
            },
            icon: "✏️",
            onCancel() {  
                console.log('OnCancel')
             }
            ,
            onEnd() {
                console.log(projectTitle, project.title);
              if (projectTitle !== project.title) {
                mutateProjectTitle.mutate(projectTitle);
              }
              return;
            },
          }}
        >
          {projectTitle}
        </Paragraph>
      </div>
      <div className="flex gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <MessageSquare className="pr-2" />
              Message Client
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <div className="mt-5 h-[85vh] w-full text-sm">
              {project && project.assignedPM && project.owner && (
                <AdminChatClient
                  admin={project.assignedPM as ProfileType}
                  client={project.owner}
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
