import axiosInstance from "@/config/axios";
import { create } from "zustand";

interface ProjectState {
  projects: [] | null;
  getProjects: () => Promise<any>;
  createProject: (project: any) => Promise<any>;
  updateProject: (project: any) => Promise<any>;
}

const useProjectStore = create<ProjectState>((set) => ({
  projects: null,

  getProjects: async () => {},

  createProject: async (project) => {},

  updateProject: async (project) => {},
}));


export default useProjectStore;