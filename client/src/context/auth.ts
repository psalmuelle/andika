import axiosInstance from "@/config/axios";
import { create } from "zustand";
interface UserState {
  getUser: () => Promise<any>;
  register: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any>;
  logout: () => Promise<void>;
}

const useUserStore = create<UserState>(() => ({
  getUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/status", {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  //signup function
  register: async ({ email, password }) => {
    try {
      const register = await axiosInstance.post("/auth/email/register", {
        email,
        password,
      });
      if (register.status === 201) return register.data;
    } catch (error: any) {
      throw error;
    }
  },

  // login function
  login: async ({ email, password }) => {
    try {
      const login = await axiosInstance.post(
        "/auth/email/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      return login;
    } catch (error) {
      throw error;
    }
  },

  // logout function
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      window.location.href = "/";
    } catch (error) {
      throw error;
    }
  },
}));

export default useUserStore;
