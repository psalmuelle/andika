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
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex items-center gap-0.5">
            <FileText className="h-5 text-muted-foreground/80" />
            <div>
              <CardDescription className="mb-0.5">Project Type</CardDescription>
              <CardTitle className="font-medium">
                {project?.projectType}
              </CardTitle>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <Calendar className="h-5 text-muted-foreground/80" />
            <div>
              <CardDescription className="mb-0.5">Due Date</CardDescription>
              <CardTitle className="font-medium">{dueDate}</CardTitle>
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
