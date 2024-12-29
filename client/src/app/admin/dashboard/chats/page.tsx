"use client";
import AdminChatbox from "@/components/dashboard/adminChatbox";
import { ChatList } from "@/components/dashboard/adminChatList";
import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ProfileType } from "types";

interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export default function Chat() {
  const [usersMessages, setUsersMessages] = useState<MessageType[][]>([]);
  const [messages, setMessages] = useState<MessageType[]>();

  const [socket, setSocket] = useState<Socket | null>(null);

  const { data: users, isPending: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/profile/all", {
        withCredentials: true,
      });
      return response.data as ProfileType[];
    },
    refetchInterval: 25000,
  });

  const { data: admin, isPending: adminLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const response = await axiosInstance.get("/profile/admin/get", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (!users && !admin) return;
    async function getChat() {
      users?.forEach(async (user) => {
        const res = await axiosInstance.get(`/chat/${user.userId}`, {
          withCredentials: true,
        });
        if (res.data.length > 0) {
          setUsersMessages((prev) => [...prev, res.data]);
        }
      });
    }
    getChat();
  }, [users, admin]);
 
  return (
    <div className="flex">
      {/* Left sidebar */}
      <div className="flex w-full max-w-xs flex-col border-r">
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <h1 className="text-base font-semibold">Messages</h1>
          </div>
        </div>
        <ChatList admin={admin} usersMessages={usersMessages} users={users} />
      </div>

      {/* Right chat area */}
      <div className="flex flex-1 flex-col">
        <div className="border-b p-4">
          <h2 className="font-semibold">Alice Johnson</h2>
        </div>
        <AdminChatbox />
      </div>
    </div>
  );
}
