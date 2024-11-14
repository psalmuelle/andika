import axiosInstance from "@/config/axios";
import { create } from "zustand";
interface UserState {
  user: {} | null;
  init: () => Promise<any>;
  register: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any>;
  logout: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: null,

  // initialize the store with the current user session
  init: async () => {
    const response = await axiosInstance.get("/auth/status", {
      withCredentials: true,
    });

    if (response.status === 200) {
      set({ user: response.data.user });
    }
    return response;
  },

  //signup function
  register: async ({ email, password }) => {
    try {
      const register = await axiosInstance.post("/auth/email/register", {
        email,
        password,
      });
      if (register.status === 201) return true;
      throw new Error(register.statusText);
    } catch (error: any) {
      console.log("Registration failed", error.message);
      return false;
    }
  },

  // login function
  login: async ({ email, password }) => {
    try {
      const login = await axiosInstance.post(
        "/auth/email",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (login.status === 200) {
        return login;
      }
      throw new Error("Login failed");
    } catch (error: any) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(error.response.data, "text/html");
      const preElement = doc.querySelector("pre");
      const message = preElement ? preElement.textContent : "Unknown error";
      return message;
    }
  },

  // logout function
  logout: async () => {
    try {
      const logout = await axiosInstance.post(
        "/auth/logout",
        {},
        { withCredentials: true },
      );
      if (logout.status === 200) {
        set({ user: null });
        window.location.href = "/";
      } else {
        throw new Error("logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  },
}));

export default useUserStore;
