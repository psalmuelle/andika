import axiosInstance from "@/config/axios";
import { ProfileType } from "types";
import { create } from "zustand";

interface ProfileState {
  getProfile: () => Promise<ProfileType>;
  createProfile: (profile: any) => Promise<any>;
}

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,

  getProfile: async () => {
    try {
      const response = await axiosInstance.get("/profile", {
        withCredentials: true,
      });
      return response.data as ProfileType;
    } catch (error) {
      throw error;
    }
  },

  createProfile: async (profile) => {
    try {
      const response = await axiosInstance.post("/profile", profile, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
}));

export default useProfileStore;
