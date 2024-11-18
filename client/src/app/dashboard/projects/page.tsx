"use client";
import ProductCard from "@/components/dashboard/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Empty } from "antd";

export default function ProjectPage() {
  const allProjects = [""];
  return (
    <div className="px-[3%]">
      <h1 className="mt-8 font-semibold">All projects</h1>

      {allProjects.length > 0 ? (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-4 max-sm:justify-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <Button
            variant={"outline"}
            className="mt-4 block w-full max-w-[290px] rounded-xl max-sm:mx-auto"
          >
            Create New Project
          </Button>
        </>
      ) : (
        <Empty
          description={"No project yet!"}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button className="mx-auto mt-4 block w-full max-w-[290px] rounded-xl">
            Create New Project
          </Button>
        </Empty>
      )}
    </div>
  );
}
