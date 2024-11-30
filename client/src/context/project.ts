import axiosInstance from "@/config/axios";
import { ProjectType } from "types";
import { create } from "zustand";

interface ProjectState {
  getProjects: () => Promise<ProjectType[]>;
  getProjectById: (id: number) => Promise<ProjectType>;
  createArticleRequest: (request: any) => Promise<any>;
  createWhitepaperRequest: (request: any) => Promise<any>;
  createApiDocRequest: (request: any) => Promise<any>;
  createEditingRequest: (request: any) => Promise<any>;
}

const useProjectStore = create<ProjectState>((set) => ({
  getProjects: async () => {
    try {
      const response = await axiosInstance.get("/project/get/all", {
        withCredentials: true,
      });
      return response.data as ProjectType[];
    } catch (err) {
      throw err;
    }
  },

  getProjectById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/project/get/${id}`, {
        withCredentials: true,
      });
      return response.data as ProjectType;
    } catch (err) {
      throw err;
    }
  },

  createArticleRequest: async (request) => {
    try {
      const response = await axiosInstance.post(
        "/project-request/article",
        request,
        { withCredentials: true },
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  createWhitepaperRequest: async (request) => {
    try {
      const response = await axiosInstance.post(
        "/project-request/whitepaper",
        request,
        { withCredentials: true },
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  createApiDocRequest: async (request) => {
    try {
      const response = await axiosInstance.post(
        "/project-request/api-doc",
        request,
        { withCredentials: true },
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  createEditingRequest: async (request) => {
    try {
      const response = await axiosInstance.post(
        "/project-request/editing",
        request,
        { withCredentials: true },
      );
      return response;
    } catch (err) {
      throw err;
    }
  },
}));

export default useProjectStore;
