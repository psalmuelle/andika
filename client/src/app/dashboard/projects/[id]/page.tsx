"use client";
import ProjectInfoSidebar from "@/components/dashboard/projects/projectInfoSider";
import ProjectOverview from "@/components/dashboard/projects/projectOverviewCard";
import ProjectPayments from "@/components/dashboard/projects/projectPayments";
import { ProjectProgress } from "@/components/dashboard/projects/projectProgress";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { MessageSquare, Phone } from "lucide-react";
import useProjectStore from "@/context/project";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../loading";
import { useEffect } from "react";

type Props = {
  params: { id: string };
};

export default function ProjectPage({ params }: Props) {
  const { id } = params;
  const { getProjectById } = useProjectStore();

  const { data: project, isPending } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => await getProjectById(parseInt(id)),
    refetchInterval: 25000,
  });

  useEffect(() => {
    if (!isPending && project === undefined) {
      window.location.replace("/dashboard/projects");
    }
  }, [project, isPending]);

  if (isPending) return <Loading />;
  return (
    <div className="mt-6 px-[3%] pb-6">
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b pb-2">
        <div>
          <Typography as="p" className="text-sm font-semibold">
            Project #PRJB{project?.id}
          </Typography>
          <p>{project?.title}</p>
        </div>
        <div className="flex gap-4">
          <Button>
            <MessageSquare className="pr-2" />
            Message Writer
          </Button>
          <Button variant={"outline"}>
            <Phone className="pr-2" />
            Schedule Call
          </Button>
        </div>
      </div>
      <div className="mt-6 flex gap-4 max-lg:flex-wrap">
        <div className="w-full max-w-2xl space-y-6">
          {project !== undefined && (
            <>
              <ProjectOverview project={project} />
              <ProjectProgress project={project} />
              <ProjectPayments project={project} />
            </>
          )}
        </div>
        {project !== undefined && <ProjectInfoSidebar project={project} />}
      </div>
    </div>
  );
}
