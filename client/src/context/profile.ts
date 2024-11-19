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
    const response = await axiosInstance.get("/profile", {
      withCredentials: true,
    });

    if (response.status === 200) {
      set({ profile: response.data.profile });
    }
    return response;
  },

  createProfile: async (profile) => {
    try {
      const response = await axiosInstance.post("/profile", profile, {
        withCredentials: true,
      });
      if (response.status === 201) return response;
      throw new Error(response.data.message);
    } catch (error: any) {
      console.log("Profile creation failed", error.message);
      return error.response;
    }
  },
}));

export default useProfileStore;
