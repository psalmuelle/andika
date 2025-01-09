"use client";
import InfoCard from "@/components/admin/project/basicInfoCard";
import ProjectOverview from "@/components/admin/project/overview";
import ProjectPayments from "@/components/admin/project/payment";
import { ProjectProgress } from "@/components/admin/project/progress";
import ProjectInfoSidebar from "@/components/admin/project/projectSidebar";
import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { ProjectType } from "types";

type Props = {
  params: { id: string };
};

export default function ProjectPage({ params }: Props) {
  const { id } = params;

  const { data: project, isPending } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/project/get/${id}`, {
          withCredentials: true,
        });
        return response.data as ProjectType;
      } catch (err) {
        throw err;
      }
    },
  });

  if (isPending) {
    return (
      <div className="min-h-[90vh] px-[5%]">
        <Spin spinning={isPending} fullscreen />
      </div>
    );
  }
  return (
    <main className="min-h-[90vh] px-[5%]">
      <div className="mt-8">
        <InfoCard project={project!} />
      </div>
      <div className="mx-auto mt-12 flex gap-4 max-lg:flex-wrap">
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
    </main>
  );
}
