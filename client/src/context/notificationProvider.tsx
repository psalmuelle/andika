import { createContext, useEffect, useState } from "react";
import socketInstance from "@/config/socket";
import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

interface MessageTypes {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}

interface UpdateTypes {
  id: number;
  content: string;
  createdAt: string;
}

export const NotificationContext = createContext({
  unreadMessages: [] as MessageTypes[],
  updates: [] as UpdateTypes[],
  getUnreadMessages: (messages: MessageTypes[]) => {},
  getUpdates: (updates: UpdateTypes[]) => {},
});

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [unreadMessages, setUnreadMessages] = useState<MessageTypes[]>([]);
  const [updates, setUpdates] = useState<UpdateTypes[]>([]);

  const { data: updateData } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/notifications", {
        withCredentials: true,
      });
      return res.data;
    },
    refetchInterval: 30000,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/profile/admin/support`, {
        withCredentials: true,
      });

      const socketio = socketInstance();

      socketio.emit("unreadMessages", {
        user: "1",
        admin: res.data?.userId.toString(),
      });
      socketio.on("unreadMessages", (messages) => {
        setUnreadMessages(messages);
      });

      // Cleanup on component unmount
      return () => {
        socketio.disconnect();
      };
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (updateData) {
      setUpdates(updateData);
    }
  }, [updateData]);

  const getUnreadMessages = (messages: MessageTypes[]) => {
    setUnreadMessages(messages);
  };

  const getUpdates = (updates: UpdateTypes[]) => {
    setUpdates(updates);
  };

  return (
    <NotificationContext.Provider
      value={{ unreadMessages, updates, getUnreadMessages, getUpdates }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
