"use client";
import ProjectStat from "@/components/dashboard/projectStat";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { ProjectRequestType, ProjectType } from "types";
import RecentProjects from "@/components/dashboard/projects/RecentProjects";
import WriterOverview from "@/components/dashboard/writerOverview";
import AdminMessages from "@/components/dashboard/allMessages";
import UsersList from "@/components/dashboard/usersList";
import AdminRecentActivities from "@/components/dashboard/AdminActivities";
import RevenueOverview from "@/components/dashboard/RevenueOverview";
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

  const { data: users, isPending: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/profile/all", {
        withCredentials: true,
      });
      return response.data;
    },
    refetchInterval: 25000,
  });

  return (
    <>
      <div className="min-h-[90vh] px-[5%]">
        <div className="mt-8 flex items-center justify-between">
          <Typography as={"h4"}>Admin Dashboard</Typography>
          <div className="flex space-x-4">
            <ProjectRequestDrawer
              isLoading={projectRequestLoading}
              data={projectRequests}
            />
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
          <div className="flex gap-6 max-sm:flex-wrap">
            <RecentProjects projects={projects as ProjectType[]} />
            <RevenueOverview />
          </div>

          <div className="flex justify-between gap-6 max-md:flex-wrap">
            {/* <CallSchedules /> */}
            <AdminMessages />
            <AdminRecentActivities />
          </div>

          <div className="flex justify-between gap-6 max-lg:flex-wrap max-sm:flex-wrap">
            <UsersList users={users} isLoading={usersLoading} />
            <WriterOverview />
          </div>
        </div>
      </div>
    </>
  );
}
