"use client";
import { useState } from "react";
import ArticleMetrics from "@/components/dashboard/metrics";
import QuickActions from "@/components/dashboard/quick-actions";
import ProjectList from "@/components/dashboard/projectList";
import ChatWidget from "@/components/dashboard/chatWidget";
import { FloatButton } from "antd";
import { Mail } from "lucide-react";

export default function Dashboard() {
  const [openChatWidget, setOpenChatWidget] = useState(false);

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
      <ArticleMetrics />
      <div className="mt-6">
        <ProjectList />
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
