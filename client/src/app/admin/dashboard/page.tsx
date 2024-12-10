"use client";
import ProjectStat from "@/components/dashboard/projectStat";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { LayoutDashboard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { ProjectRequestType, ProjectType } from "types";
import RecentProjects from "@/components/dashboard/projects/RecentProjects";
import WriterOverview from "@/components/dashboard/writerOverview";
import AdminMessages from "@/components/dashboard/allMessages";
import UsersList from "@/components/dashboard/usersList";
import AdminRecentActivities from "@/components/dashboard/AdminActivities";
import RevenueOverview from "@/components/dashboard/RevenueOverview";
import CallSchedules from "@/components/dashboard/CallSchedules";
import ProjectRequestDrawer from "@/components/dashboard/projects/ProjectRequesDrawer";

export default function Dashboard() {
  const { data: projects, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axiosInstance.get("/project/get/all", {
        withCredentials: true,
      });
      return response.data;
    },
    refetchInterval: 25000,
  });

  const { data: projectRequests, isPending: projectRequestLoading } = useQuery({
    queryKey: ["projectRequests"],
    queryFn: async () => {
      const response = await axiosInstance.get("/project-request/all", {
        withCredentials: true,
      });
      return response.data;
    },
    refetchInterval: 25000,
  });

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white/70 px-[5%] py-3 shadow-sm backdrop-blur">
        <div className="flex w-full max-w-[200px] items-center justify-between gap-2">
          <h1 className="font-mono text-xl font-semibold tracking-tight text-zinc-800">
            Andika
          </h1>

          <Button variant={"secondary"} size={"sm"}>
            Dashbord <LayoutDashboard className="pl-2" />
          </Button>
        </div>
        <div>
          <Button
            onClick={async () => {
              await axiosInstance.post(
                "/auth/logout",
                {},
                { withCredentials: true },
              );
              window.location.href = "/admin/auth/login";
            }}
            variant={"link"}
            size={"sm"}
          >
            Exit Admin
          </Button>
        </div>
      </header>
      <div className="min-h-[90vh] px-[5%]">
        <div className="mt-8 flex items-center justify-between">
          <Typography as={"h4"}>Admin Dashboard</Typography>
          <div className="flex space-x-4">
            <ProjectRequestDrawer isLoading={projectRequestLoading} data={projectRequests} />
            <Button variant={"outline"}>Message Client</Button>
          </div>
        </div>

        {/* Project Stats */}
        <ProjectStat
          data={projects as ProjectType[]}
          isPending={isPending}
          projectRequests={projectRequests as ProjectRequestType[]}
        />

        {/* Recent Activities */}
        <div className="mt-12 space-y-6">
          <div className="flex gap-6">
            <RecentProjects projects={projects as ProjectType[]} />
            <RevenueOverview />
          </div>

          <div className="flex justify-between gap-6">
            <CallSchedules />
            <AdminMessages />
            <AdminRecentActivities />
          </div>

          <div className="flex justify-between gap-6">
            <UsersList />
            <WriterOverview />
          </div>
        </div>
      </div>
    </>
  );
}
