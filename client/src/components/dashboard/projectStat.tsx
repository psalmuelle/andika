import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProjectRequestType, ProjectType } from "types";
import { Skeleton } from "../ui/skeleton";

export default function ProjectStat({
  data,
  isPending,
  projectRequests,
}: {
  projectRequests: ProjectRequestType[];
  data: ProjectType[];
  isPending: boolean;
}) {
  const numActiveProj = data?.filter(
    (val) => val.status === "In Progress",
  ).length;

  const numReviewProj = data?.filter(
    (val) => val.status === "In Review",
  ).length;

  const numCompletedProj = data?.filter(
    (val) => val.status === "Completed",
  ).length;

  const numDelayedProj = projectRequests?.filter(
    (val) => val.status === "NEW",
  ).length;
  const stats = [
    {
      label: "Active Projects",
      value: numActiveProj,
      change: Math.round((numActiveProj / data?.length) * 100) + "%",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
    },
    {
      label: "In Review",
      value: numReviewProj,
      change: Math.round((numReviewProj / data?.length) * 100) + "%",
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
    },
    {
      label: "Completed",
      value: numCompletedProj,
      change: Math.round((numCompletedProj / data?.length) * 100) + "%",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    {
      label: "Delayed",
      value: numDelayedProj,
      change:
        Math.round((numDelayedProj / projectRequests?.length) * 100) + "%",
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
    },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        {stats.map((stat, index) => {
          return (
            <Card key={index} className="w-full max-w-[250px]">
              <CardHeader>
                <CardTitle className="flex flex-row items-center justify-between">
                  {stat.icon}
                  {isPending ? (
                    <Skeleton className="h-6 w-14" />
                  ) : (
                    <div>{stat.change}</div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-center gap-1">
                  {isPending ? (
                    <Skeleton className="h-6 w-20" />
                  ) : (
                    <div className="text-2xl font-semibold">{stat.value}</div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
