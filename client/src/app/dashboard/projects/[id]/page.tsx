import ProjectInfoSidebar from "@/components/dashboard/projects/projectInfoSider";
import ProjectOverview from "@/components/dashboard/projects/projectOverviewCard";
import ProjectPayments from "@/components/dashboard/projects/projectPayments";
import { ProjectProgress } from "@/components/dashboard/projects/projectProgress";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { MessageSquare, Phone } from "lucide-react";

type Props = {
  params: { id: string };
};

export default function ProjectPage({ params }: Props) {
  const { id } = params;
  console.log(typeof id);
  return (
    <div className="mt-6 px-[3%] pb-6">
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b pb-2">
        <div>
          <Typography as="p" className="text-sm font-semibold">
            Project #FJU7B
          </Typography>
          <p>API Documentation for Payment Gateway SDK</p>
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
          <ProjectOverview />
          <ProjectProgress />
          <ProjectPayments />
        </div>
        <ProjectInfoSidebar />
      </div>
    </div>
  );
}
