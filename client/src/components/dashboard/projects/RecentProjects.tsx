"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { ProjectType } from "types";

export default function RecentProjects({
  projects,
}: {
  projects: ProjectType[];
}) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="border-b py-3.5">
        <CardTitle className="flex flex-row items-center justify-between">
          <p>Recent Projects</p>
          <Button variant={"link"} asChild>
            <Link href="/admin/dashboard/projects">View All</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <ScrollArea className="h-[500px]">
        <CardContent>
          <div className="divide-y">
            {projects &&
              projects
                .sort((a, b) => b.id - a.id)
                .slice(0, 5)
                .map((project) => (
                  <div key={project.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="text-muted-foreground">
                            PRJB{project.id}
                          </span>
                          <h3 className="font-semibold">{project.title}</h3>
                        </div>
                        <div className="mt-1 opacity-90">
                          {project.owner?.company} • {project.owner?.name}
                        </div>
                      </div>
                      <Button
                        asChild
                        className="text-muted-foreground hover:text-primary"
                        variant={"link"}
                        size={"icon"}
                      >
                        <Link href={`/admin/dashboard/projects/${project.id}`}>
                          <MoreVertical className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2.5 flex justify-between">
                        <span className="">Progress</span>
                        <span className="font-medium">
                          {project.overallProgress}%
                        </span>
                      </div>
                      <Progress
                        value={project.overallProgress}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
