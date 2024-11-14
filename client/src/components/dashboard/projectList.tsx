import { Card, CardTitle } from "../ui/card";
import { Empty } from "antd";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

const ProjectBrief = () => {
  return (
    <div className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 max-sm:flex-col">
      <Pen size={15} color="green" />
      <p className="font-medium">{`Whitepaper`}</p>
      <p>24-02-2024 {`->`} 29-05-2024</p>
      <Button size="sm" variant={"default"}>
        View More 
      </Button>
    </div>
  );
};

export default function ProjectList() {
  const projects = [''];

  return (
    <Card>
      <CardTitle className="mt-8 px-4 text-sm font-medium">
        Active Projects
      </CardTitle>
      <div className="p-4">
        {projects.length === 0 ? (
          <Empty
            description={"No project yet!"}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button>Start a Project</Button>
          </Empty>
        ) : (
          <div className="mt-4 space-y-4">
            <ProjectBrief />
            <ProjectBrief />
          </div>
        )}
      </div>
    </Card>
  );
}
