import React from "react";
import { BarChart3, Download, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectType } from "types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistance } from "date-fns";
import { Empty } from "antd";

const timeAgo = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export default function ProjectInfoSidebar({
  project,
  isLoading,
}: {
  project: ProjectType;
  isLoading: boolean;
}) {
  return (
    <div className="flex w-max grid-cols-2 flex-col gap-6 max-lg:grid max-sm:grid-cols-1">
      {/* Assigned Writer */}
      <Card className="w-full max-w-[264px]">
        <CardHeader>
          <CardTitle>Assigned Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <img
              src={
                project?.assignedPM.avatar
                  ? project.assignedPM.avatar
                  : "https://avatar.iran.liara.run/public/23"
              }
              alt={project?.assignedPM.name}
              className="h-9 w-9 rounded-full"
            />
            <div>
              <h3 className="font-medium">{project?.assignedPM.name}</h3>
              <p className="text-muted-foreground">
                {project?.assignedPM.position}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="row-span-2 w-full max-w-[264px] max-sm:row-span-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[286px]">
          <CardContent>
            <div className="space-y-4">
              {!isLoading &&
                project?.activities.length > 0 &&
                project?.activities
                  .sort((a, b) => b.id - a.id)
                  .map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <BarChart3 className="mt-1 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-gray-600">{activity?.activity}</p>
                        <p className="text-xs text-gray-500">
                          {timeAgo(activity?.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
              {!isLoading && project?.activities.length === 0 && (
                <Empty
                  className="mt-8"
                  description={"No recent activities"}
                  imageStyle={{
                    width: "80px",
                    display: "block",
                    margin: "0px auto",
                  }}
                />
              )}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Quick Actions */}
      <Card className="w-full max-w-[264px]">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" variant={"outline"}>
            <CreditCard className="mr-3 h-5 w-5" />
            Make Payment
          </Button>
          <Button className="w-full">
            <Download className="mr-3 h-5 w-5" />
            Finished Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
