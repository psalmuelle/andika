"use client";
import InfoCard from "@/components/admin/project/basicInfoCard";
import ProjectOverview from "@/components/admin/project/overview";
import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useEffect } from "react";
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

  useEffect(() => {
    console.log(project);
  }, [project]);
  if (isPending) {
    return (
      <div>
        <Spin spinning={isPending} />
      </div>
    );
  }
  return (
    <main className="min-h-[90vh] px-[5%]">
      <div className="mt-8">
        <InfoCard project={project!} />
      </div>
      <div className="mt-6 w-full max-w-2xl space-y-6">
        {project !== undefined && (
          <>
            <ProjectOverview project={project} />
            {/* <ProjectProgress isLoading={isPending} project={project} />
                    <ProjectPayments project={project} /> */}
          </>
        )}
      </div>
    </main>
  );
}
