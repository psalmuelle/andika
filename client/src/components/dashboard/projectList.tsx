import { Card } from "../ui/card";
import { Empty, Spin } from "antd";
import { Button } from "../ui/button";
import ProductCard from "./projects/ProjectCard";
import { ProjectType } from "types";
import Link from "next/link";

export default function ProjectList({
  projects,
  isLoading,
}: {
  projects: ProjectType[];
  isLoading: boolean;
}) {
  return (
    <Card>
      <div className="w-full p-4">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Spin spinning />
          </div>
        ) : projects.length === 0 ? (
          <Empty
            description={"No project here!"}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="mx-auto"
          >
            <Button variant={"link"} asChild>
              <Link href={"/dashboard/projects/create"}>Start a Project</Link>
            </Button>
          </Empty>
        ) : (
          projects.map((project) => (
            <ProductCard key={project.id} project={project} />
          ))
        )}
      </div>
    </Card>
  );
}
