"use client";
import { useEffect, useState } from "react";
import ArticleMetrics from "@/components/dashboard/metrics";
import QuickActions from "@/components/dashboard/quick-actions";
import ProjectList from "@/components/dashboard/projectList";
import ChatWidget from "@/components/dashboard/chatWidget";
import { FloatButton } from "antd";
import { Mail } from "lucide-react";
import useProjectStore from "@/context/project";
import { ProjectType } from "types";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const [openChatWidget, setOpenChatWidget] = useState(false);
  const [activeBar, setActiveBar] = useState(1);
  const [visibleProjects, setVisibleProjects] = useState<ProjectType[]>([]);
  const [numOfProjects, setNumOfProjects] = useState(0);
  const { getProjects } = useProjectStore();

  const { data: projects, isPending: projectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const categories = ["PENDING", "IN_PROGRESS", "COMPLETED"];

  useEffect(() => {
    if (projects && projects?.length > 0) {
      const activeProjects = projects.filter(
        (project) =>
          project.status.toLowerCase() === categories[activeBar].toLowerCase(),
      );
      setNumOfProjects(activeProjects.length);
      setVisibleProjects(activeProjects);
    }
  }, [activeBar, projects]);

  const toggleChatWidget = () => {
    setOpenChatWidget(!openChatWidget);
  };
  return (
    <div className="px-[3%]">
      <div className="mt-8">
        <h1 className="font-semibold">Hi, Welcome 👋</h1>
        <p className="mt-2">
          Track your documentation projects and connect with our writers
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <QuickActions />
        <div className="min-w-[275px] max-md:hidden">
          <ChatWidget />
        </div>
      </div>
      <ArticleMetrics quantity={numOfProjects} projects={ projects} setActiveBar={setActiveBar} />
      <div className="mt-6">
        <ProjectList isLoading={projectLoading} projects={visibleProjects} />
      </div>

      <FloatButton
        icon={<Mail className="h-5 w-5" />}
        className="md:hidden"
        badge={{ count: 5, color: "red" }}
        onClick={toggleChatWidget}
      />

      {openChatWidget && (
        <div className="fixed bottom-24 right-[3%]">
          <ChatWidget />
        </div>
      )}
    </div>
  );
}
