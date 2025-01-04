"use client";
import InfoCard from "@/components/admin/project/basicInfoCard";
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
    refetchInterval: 25000,
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
    </main>
  );
}
