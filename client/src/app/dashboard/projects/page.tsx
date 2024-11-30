"use client";
import ProductCard from "@/components/dashboard/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Empty, Spin } from "antd";
import Link from "next/link";
import useProjectStore from "@/context/project";
import { useQuery } from "@tanstack/react-query";

export default function ProjectPage() {
  const { getProjects } = useProjectStore();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  return (
    <div className="mt-6 px-[3%] pb-6">
      <h1 className="mt-8 font-semibold">All projects</h1>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Spin spinning />
        </div>
      ) : projects && projects?.length > 0 ? (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-4 max-sm:justify-center">
            {projects.map((project) => (
              <ProductCard key={project.id} project={project} />
            ))}
          </div>
          <Button
            asChild
            variant={"outline"}
            className="mt-4 block w-full max-w-[290px] rounded-xl max-sm:mx-auto"
          >
            <Link
              className="w-full text-center"
              href={"/dashboard/projects/create"}
            >
              Create New Project
            </Link>
          </Button>
        </>
      ) : (
        <Empty
          description={"No project yet!"}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button
            asChild
            className="mx-auto mt-4 block w-full max-w-[290px] rounded-xl"
          >
            <Link href={"/dashboard/projects/create"}>Create New Project</Link>
          </Button>
        </Empty>
      )}
    </div>
  );
}
