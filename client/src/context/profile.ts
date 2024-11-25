import axiosInstance from "@/config/axios";
import { ProfileType } from "types";
import { create } from "zustand";

interface ProfileState {
  profile: ProfileType | null;
  getProfile: () => Promise<any>;
  createProfile: (profile: any) => Promise<any>;
}

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,

  getProfile: async () => {
    try {
      const response = await axiosInstance.get("/profile", {
        withCredentials: true,
      });
      set({ profile: response.data });
      return true;
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
