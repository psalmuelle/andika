"use client";
import AdminChatbox from "@/components/dashboard/adminChatbox";
import { ChatList } from "@/components/dashboard/adminChatList";
import axiosInstance from "@/config/axios";
import useActiveChat from "@/context/activeChat";
import { useQuery } from "@tanstack/react-query";
import { Button, Popover } from "antd";
import { EllipsisIcon, MessageSquare, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
  const { activeChatId, setActiveChatId } = useActiveChat();
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleDeleteChats = async (userId: string) => {
    try {
      await axiosInstance.delete(`/chat/delete/${userId}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/profile/all", {
        withCredentials: true,
      });
      return response.data as ProfileType[];
    },
  });

  const { data: admin } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const response = await axiosInstance.get("/profile/admin/get", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const getAllUsersMsgs = async () => {
    const messagesMap: { [key: number]: MessageType[] } = {};
    await Promise.all(
      users?.map(async (user) => {
        const res = await axiosInstance.get(`/chat/${user?.userId}`, {
          withCredentials: true,
        });

        if (res.data.length > 0) {
          messagesMap[user.userId] = res.data;
        }
      }) || [],
    );

    setUsersMessages(Object.values(messagesMap));
  };

  useEffect(() => {
    if (!users && !admin) return;
    getAllUsersMsgs();
  }, [users, admin]);

  useEffect(() => {
    if (usersMessages.length === 0) return;
    const intervalId = setInterval(getAllUsersMsgs, 20000);
    return () => clearInterval(intervalId);
  }, [usersMessages]);

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
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">
              {activeChatId
                ? `${users?.find((a) => a.userId === activeChatId)?.name} - ${users?.find((a) => a.userId === activeChatId)?.user.email}`
                : "Chat"}
            </h2>
            <Popover
              content={
                <div className="pb-2 pt-4">
                  <Button
                    onClick={() => {
                      if (activeChatId) {
                        handleDeleteChats(activeChatId.toString());
                        setActiveChatId(null);
                      }
                    }}
                    size="small"
                    danger
                    className="w-full"
                  >
                    Delete Chats
                  </Button>
                </div>
              }
              title="Chat Options"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button
                size="small"
                className="rounded-full"
                icon={<EllipsisIcon className="h-4" />}
                variant="outlined"
              />
            </Popover>
          </div>
          {activeChatId && (
            <Button
              onClick={() => setActiveChatId(null)}
              shape="circle"
              type="text"
              icon={<XIcon className="h-4" />}
            />
          )}
        </div>
        <AdminChatbox admin={admin} usersMessages={usersMessages} />
      </div>
    </div>
  );
}
