"use client";
import ArticleMetrics from "@/components/dashboard/metrics";
import QuickActions from "@/components/dashboard/quick-actions";
import ProjectList from "@/components/dashboard/projectList";

export default function Dashboard() {
  return (
    <div className="px-[3%]">
      <h1 className="mt-8 font-semibold">Hi, Welcome 👋</h1>
      <ArticleMetrics />
      <div className="mt-6">
        <QuickActions />
      </div>
      <div className="mt-6">
        <ProjectList />
      </div>
    </div>
  );
}
