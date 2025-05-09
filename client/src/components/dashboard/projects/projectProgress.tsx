import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Empty, Tag } from "antd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectType } from "types";

export function ProjectProgress({
  project,
  isLoading,
}: {
  project: ProjectType;
  isLoading: boolean;
}) {
  function changeDateFormat(date: string): string {
    const dueDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return dueDate;
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Progress</CardTitle>
        <Tag className="w-fit capitalize">{project?.status.toLowerCase()}</Tag>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex justify-between font-medium">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="">{project?.overallProgress}%</span>
        </div>
        <Progress className="h-2" value={project?.overallProgress} />

        <div className="mt-6 space-y-4">
          {!isLoading &&
            project?.tasks.length > 0 &&
            project?.tasks
              .sort((a, b) => a.id - b.id)
              .map((milestone, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {milestone.status === "COMPLETED" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : milestone.status === "IN_PROGRESS" ? (
                      <Clock className="h-5 w-5 text-blue-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-gray-300" />
                    )}
                    <span
                      className={
                        milestone.status === "COMPLETED"
                          ? "text-gray-600 line-through"
                          : "text-gray-600"
                      }
                    >
                      {milestone.task}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {changeDateFormat(milestone.dueDate)}
                  </span>
                </div>
              ))}
          {!isLoading && project.tasks.length === 0 && (
            <>
              <Empty
                description={"No task found"}
                imageStyle={{
                  width: "100px",
                  display: "block",
                  margin: "0px auto",
                }}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
