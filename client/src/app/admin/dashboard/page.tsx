"use client";
import ProjectStat from "@/components/dashboard/projectStat";
import Typography from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { ProjectRequestType, ProjectType } from "types";
import RecentProjects from "@/components/dashboard/projects/RecentProjects";
import UsersList from "@/components/dashboard/usersList";
import RevenueOverview from "@/components/dashboard/RevenueOverview";
import ProjectRequestDrawer from "@/components/dashboard/projects/ProjectRequesDrawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, RssIcon } from "lucide-react";
import ClientReviews from "@/components/admin/clientReviews";
import ContactUsTicket from "@/components/dashboard/contactTicket";

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

  const { data: reviews, isPending: reviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axiosInstance.get("project/review/all", {
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

  const { data: contactTickets, isPending: contactTicketsLoading } = useQuery({
    queryKey: ["contactTickets"],
    queryFn: async () => {
      const response = await axiosInstance.get("/mail", {
        withCredentials: true,
      });
      return response.data;
    },
    refetchInterval: 35000,
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
            <Button asChild variant={"secondary"}>
              <Link href="/admin/dashboard/chats">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chats
              </Link>
            </Button>

            <Button asChild variant={"secondary"}>
              <Link href="/admin/dashboard/blog">
                <RssIcon className="mr-2 h-4 w-4" />
                Blog
              </Link>
            </Button>
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
            <RevenueOverview projects={projects as ProjectType[]} />
          </div>

          <UsersList users={users} isLoading={usersLoading} />
          <ClientReviews reviews={reviews} isPending={reviewsLoading} />
          <ContactUsTicket
            tickets={contactTickets}
            isLoading={contactTicketsLoading}
          />
        </div>
      </div>
    </>
  );
}
