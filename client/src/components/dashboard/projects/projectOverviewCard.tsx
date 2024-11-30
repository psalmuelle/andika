import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";
import { ProjectType } from "types";

export default function ProjectOverview({ project }: { project: ProjectType }) {
  const dueDate = new Date(project?.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-1.5">
            <FileText className="text-muted-foreground/70" />
            <div>
              <CardDescription className="mb-1">Project Type</CardDescription>
              <CardTitle>{project?.projectType}</CardTitle>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="text-muted-foreground/70" />
            <div>
              <CardDescription className="mb-1">Due Date</CardDescription>
              <CardTitle>{dueDate}</CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{project?.description}</p>
      </CardContent>
    </Card>
  );
}
