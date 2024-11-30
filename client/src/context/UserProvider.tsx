"use client";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/context/auth";
import { UserType } from "types";
import { AxiosError } from "axios";

interface UserContextType {
  user: UserType;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { getUser } = useUserStore();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  useEffect(() => {
    if (error instanceof AxiosError) {
      error.status === 403 && window.location.replace("/auth/login");
    }
  }, [error, isError]);

  return (
    <UserContext.Provider value={{ user, isLoading, isError, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
