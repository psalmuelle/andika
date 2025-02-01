"use client";
import { useEffect, useState, useContext } from "react";
import ArticleMetrics from "@/components/dashboard/metrics";
import QuickActions from "@/components/dashboard/quick-actions";
import ProjectList from "@/components/dashboard/projectList";
import ChatWidget from "@/components/dashboard/chatWidget";
import { FloatButton } from "antd";
import { Mail } from "lucide-react";
import useProjectStore from "@/context/project";
import { ProjectType } from "types";
import { useQuery } from "@tanstack/react-query";
import { NotificationContext } from "@/context/notificationProvider";

export default function Dashboard() {
  const [openChatWidget, setOpenChatWidget] = useState(false);
  const [activeBar, setActiveBar] = useState(1);
  const [visibleProjects, setVisibleProjects] = useState<ProjectType[]>([]);
  const [numOfProjects, setNumOfProjects] = useState(0);
  const { getProjects } = useProjectStore();
  const { unreadMessages } = useContext(NotificationContext);

  const { data: projects, isPending: projectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  useEffect(() => {
    const categories = ["PENDING", "IN_PROGRESS", "COMPLETED"];
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
          Track your documentation projects and connect with our support team
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <QuickActions />
        <div className="h-[400px] w-[50%] min-w-[304px] max-w-[360px] max-md:hidden">
          <ChatWidget />
        </div>
      </div>
      <ArticleMetrics
        quantity={numOfProjects}
        projects={projects}
        setActiveBar={setActiveBar}
      />
      <div className="mt-6">
        <ProjectList isLoading={projectLoading} projects={visibleProjects} />
      </div>

      <FloatButton
        style={{ width: "48px", height: "48px", bottom: "30px", right: "20px" }}
        type={"primary"}
        icon={<Mail className="h-5 w-5" />}
        className="md:hidden"
        badge={{ count: unreadMessages.length, color: "red" }}
        onClick={toggleChatWidget}
      />

      {openChatWidget && (
        <div
          className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpenChatWidget(false);
            }
          }}
        >
          <div className="fixed bottom-[84px] right-[5%] h-[80vh] w-[90%] md:hidden">
            <ChatWidget />
          </div>
        </div>
      )}
    </div>
  );
}
