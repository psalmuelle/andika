"use client";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import axiosInstance from "@/config/axios";
import { LayoutDashboard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import CreateProjectForm from "@/components/dashboard/projects/project-forms/CreateProject";
import { ProfileType } from "types";

export default function CreateProject() {
  const searchParams = useSearchParams();
  const [requestId, setRequestId] = useState<string>();
  const { data: projectRequest } = useQuery({
    queryKey: ["projectRequest", requestId],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) return;
      const response = await axiosInstance.get(
        `/project-request/${queryKey[1]}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    enabled: !!requestId,
  });

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const response = await axiosInstance.get("/profile/admin/get/all", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const requestId = searchParams.get("requestId");
    if (!requestId) return;
    setRequestId(requestId);
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white/70 px-[5%] py-3 shadow-sm backdrop-blur">
        <div className="flex w-full max-w-[200px] items-center justify-between gap-2">
          <h1 className="font-mono text-xl font-semibold tracking-tight text-zinc-800">
            Andika
          </h1>

          <Button variant={"secondary"} size={"sm"}>
            Dashbord <LayoutDashboard className="pl-2" />
          </Button>
        </div>
        <div>
          <Button
            onClick={async () => {
              await axiosInstance.post(
                "/auth/logout",
                {},
                { withCredentials: true },
              );
              window.location.href = "/admin/auth/login";
            }}
            variant={"link"}
            size={"sm"}
          >
            Exit Admin
          </Button>
        </div>
      </header>
      <main className="min-h-[90vh] px-[5%]">
        <Typography className="mt-8 border-b pb-2" as={"h4"}>
          Create Project
        </Typography>
        <section className="mb-8 mt-4 flex justify-center space-x-12">
          {projectRequest && (
            <div className="mt-4 space-y-4">
              <Typography as={"p"} className="font-semibold">
                <span>Request Id:</span> {projectRequest?.id}
              </Typography>

              <Typography as={"p"} className="font-semibold">
                <span>Type:</span>{" "}
                <span className="rounded-lg bg-accent-foreground p-1 text-white">
                  {projectRequest?.requestType}
                </span>
              </Typography>

              <Typography as={"p"} className="font-semibold">
                <span>Request By:</span> {projectRequest?.user.name} -{" "}
                {projectRequest?.user.id}
              </Typography>

              <div className="max-w-sm">
                <Typography as={"p"} className="font-semibold">
                  Request Details
                </Typography>
                {projectRequest?.ArticleRequest && (
                  <JsonView
                    data={projectRequest.ArticleRequest}
                    style={darkStyles}
                    shouldExpandNode={allExpanded}
                  />
                )}
                {projectRequest?.WhitepaperRequest && (
                  <JsonView
                    data={projectRequest.WhitepaperRequest}
                    style={darkStyles}
                    shouldExpandNode={allExpanded}
                  />
                )}
                {projectRequest?.ApiDocRequest && (
                  <JsonView
                    data={projectRequest.ApiDocRequest}
                    style={darkStyles}
                    shouldExpandNode={allExpanded}
                  />
                )}
                {projectRequest?.EditingRequest && (
                  <JsonView
                    data={projectRequest.EditingRequest}
                    style={darkStyles}
                    shouldExpandNode={allExpanded}
                  />
                )}
              </div>

              <Typography as={"p"} className="font-semibold">
                <span>Created At:</span> {formatDate(projectRequest?.createdAt)}
              </Typography>
            </div>
          )}

          <div className="mt-4 w-full max-w-xl p-4">
            <CreateProjectForm
              projectOwnerId={projectRequest?.user.id}
              requestId={projectRequest?.id}
              requestStatus={projectRequest?.status}
              admins={admins as ProfileType[]}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
