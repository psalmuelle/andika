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
import { useRouter } from "next/navigation";
import { ProjectType } from "types";

export default function ProjectInfoCard({ project }: { project: ProjectType }) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const router = useRouter();
  return (
    <Card className="w-full max-w-60 transition-all duration-100 ease-in hover:border-t-4">
      <CardHeader
        className="mb-2 cursor-pointer hover:bg-muted"
        onClick={() => router.push(`/admin/dashboard/projects/${project.id}`)}
      >
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          <Tag
            color={
              project.status == "PENDING"
                ? "red"
                : project.status == "IN_PROGRESS"
                  ? "geekblue"
                  : "green"
            }
            className="mt-3 rounded-full capitalize"
          >
            {project.status.toLowerCase()}
          </Tag>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="text-gray-600">Project ID:</span> PRJB{project.id}
          </p>

          <p>
            <span className="text-gray-600">Client:</span> {project.owner?.name}
          </p>

          <p>
            <span className="text-gray-600">Budget:</span> ${" "}
            {project?.payments?.reduce((sum, payment) => {
              return sum + (parseFloat(payment.amount) || 0);
            }, 0)}
          </p>

          <p>
            <span className="text-gray-600">Deadline: </span>
            {formatDate(project.dueDate)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <div className="mb-1.5 flex justify-between">
            <span className="text-xs">Progress</span>
            <span className="text-xs">{project.overallProgress}%</span>
          </div>
          <Progress value={project.overallProgress} className="h-1.5" />
        </div>
      </CardFooter>
    </Card>
  );
}
