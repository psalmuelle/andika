import { createContext, ReactElement, useEffect, useState } from "react";
import socketInstance from "@/config/socket";
import axiosInstance from "@/config/axios";

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

      // socketio.on("updates", () => {
      //   console.log("updates");
      // });

      // Cleanup on component unmount
      return () => {
        socketio.disconnect();
      };
    };

    fetchData();
  }, []);

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
