import axiosInstance from "@/config/axios";
import { create } from "zustand";

interface ProjectState {
  projects: [] | null;
  getProjects: () => Promise<any>;
  createArticleRequest: (request: any) => Promise<any>;
  createWhitepaperRequest: (request: any) => Promise<any>;
  createApiDocRequest: (request: any) => Promise<any>;
  createEditingRequest: (request: any) => Promise<any>;
}

const useProjectStore = create<ProjectState>((set) => ({
  projects: null,

  getProjects: async () => {},

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
