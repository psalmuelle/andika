"use client";
import { useEffect } from "react";
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
import { getCalApi } from "@calcom/embed-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ChatWidget from "@/components/dashboard/chatWidget";

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

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  if (isPending) return <Loading />;
  return (
    <div className="mt-6 px-[3%] pb-6">
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b pb-2">
        <div>
          <Typography as="p" className="text-sm font-semibold">
            Project #PRJB{project?.id}-{project?.createdAt.slice(0, 10)}
          </Typography>
          <p>{project?.title}</p>
        </div>
        <div className="flex gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <MessageSquare className="pr-2" />
                Message PM
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <div className="mt-5 h-[85vh] w-full text-sm">
                <ChatWidget />
              </div>
            </SheetContent>
          </Sheet>

          <Button
            data-cal-namespace="30min"
            data-cal-link="erinle-samuel-1zabaa/30min"
            data-cal-config='{"layout":"month_view", "theme": "light"}'
            variant={"outline"}
          >
            <Phone className="pr-2" />
            Schedule Call
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-6 flex gap-4 max-lg:flex-wrap">
        <div className="w-full space-y-6">
          {project !== undefined && (
            <>
              <ProjectOverview project={project} />
              <ProjectProgress isLoading={isPending} project={project} />
              <ProjectPayments project={project} />
            </>
          )}
        </div>
        {project !== undefined && (
          <ProjectInfoSidebar isLoading={isPending} project={project} />
        )}
      </div>
    </div>
  );
}
