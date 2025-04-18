import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tag } from "antd";
import { ProjectType } from "types";
import { useRouter } from "next/navigation";

function ProjectCard({ project }: { project: ProjectType }) {
  const date = new Date(project.dueDate);
  const dueDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const router = useRouter();
  return (
    <Card
      className="w-full max-w-[280px] cursor-pointer"
      onClick={() => {
        router.push(`/dashboard/projects/${project.id}`);
      }}
    >
      <CardHeader>
        <CardTitle className="leading-tight">{project.title}</CardTitle>
        <CardDescription>{project.projectType}</CardDescription>
        <Tag className="w-fit rounded-xl capitalize">
          {project.status.toLowerCase()}
        </Tag>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Project Manager</span>
          <span className="font-medium text-primary">
            {project.assignedPM.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Due date</span>
          <span className="font-medium text-primary">{dueDate}</span>
        </div>
      </CardContent>
      <CardFooter className="my-1">
        <Progress value={project.overallProgress} />
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
