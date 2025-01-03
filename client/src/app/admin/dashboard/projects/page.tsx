"use client";
import ProjectInfoCard from "@/components/dashboard/projects/adminProjectCard";
import CreateProjectForm from "@/components/dashboard/projects/project-forms/CreateProject";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Typography from "@/components/ui/typography";
import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectType } from "types";

export default function Projects() {
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data: projects, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axiosInstance.get("/project/get/all", {
        withCredentials: true,
      });
      return response.data as ProjectType[];
    },
    refetchInterval: 25000,
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/profile/admin/get", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (projects) {
      setAllProjects(projects);
    }

    if (filter.length > 0 && filter !== "none" && projects) {
      const filteredProjects = projects.filter((project) =>
        project.status.toLowerCase().includes(filter.toLowerCase()),
      );
      setAllProjects(filteredProjects);
    }

    if (search.length > 0 && projects) {
      const filteredProjects = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.owner?.name.toLowerCase().includes(search.toLowerCase()),
      );
      setAllProjects(filteredProjects);
    }
  }, [projects, filter, search]);

  return (
    <div>
      <main className="min-h-[90vh] px-[5%]">
        <div className="mt-8 flex items-center justify-between">
          <Typography as={"h4"}>Projects</Typography>
          <CreateProjectForm admin={profile} />
        </div>
        <section className="mt-8 flex gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search projects by title or client name..."
              className="pl-10"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            onValueChange={(e) => {
              setFilter(e);
            }}
          >
            <SelectTrigger className="max-w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="IN_PROGRESS">In-Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </section>

        <section className="mt-12 flex flex-wrap gap-5">
          {isPending && <Spin spinning />}
          {!isPending && allProjects && allProjects.length === 0 && (
            <div className="my-8 w-full text-center text-gray-400">
              No projects found
            </div>
          )}

          {!isPending &&
            allProjects &&
            allProjects?.length > 0 &&
            allProjects?.map((project) => (
              <ProjectInfoCard key={project.id} project={project} />
            ))}
        </section>
      </main>
    </div>
  );
}
