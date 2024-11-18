import { Card, CardTitle } from "../ui/card";
import { Empty } from "antd";
import { Button } from "../ui/button";
import ProductCard from "./projects/ProjectCard";

export default function ProjectList() {
  const projects = [""];

  return (
    <Card>
      <div className="p-4">
        {projects.length === 0 ? (
          <Empty
            description={"No project yet!"}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button>Start a Project</Button>
          </Empty>
        ) : (
          <div className="mt-4 flex flex-wrap items-stretch justify-stretch gap-4 max-sm:justify-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        )}
      </div>
    </Card>
  );
}
