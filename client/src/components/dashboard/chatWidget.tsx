import React, { useEffect, useRef, useState } from "react";
import { Send, Phone, Paperclip } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { Socket } from "socket.io-client";
import socketInstance from "@/config/socket";
import { useUserContext } from "@/context/UserProvider";
import { Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { ScrollArea } from "../ui/scroll-area";
import { Spin, Upload } from "antd";
import { ReactElement } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { getCalApi } from "@calcom/embed-react";

interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  content: string | ReactElement;
  createdAt: string;
  isRead: boolean;
}

type MessageBoxProps = Pick<
  MessageType,
  "senderId" | "content" | "id" | "createdAt" | "receiverId"
> & {
  userId: number;
};

export function MessageBox({ senderId, content, userId }: MessageBoxProps) {
  return (
    <div className={`${senderId === userId && "flex w-full justify-end"}`}>
      <p
        className={`mb-3 w-fit max-w-[70%] whitespace-pre-line rounded-2xl p-2 ${senderId === userId ? "rounded-tr-none bg-white" : "rounded-tl-none bg-accent-foreground text-white"}`}
      >
        {content}
      </p>
    </div>
  );
}

function ChatWidget() {
  const { user } = useUserContext();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userIsTyping, setUserIsTyping] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const { data: admin, isPending: adminLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/admin/support`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages && bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [messages, userIsTyping]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  //get chat messages
  useEffect(() => {
    async function getChat() {
      const res = await axiosInstance.get(`/chat/${admin?.userId}`, {
        withCredentials: true,
      });
      if (res.data.length > 0) {
        setMessages(res.data);
      }
    }
    if (!admin) return;
    getChat();
  }, [admin]);

  useEffect(() => {
    if (!user || !admin) return;

    const socketio = socketInstance();
    setSocket(socketio);

    const roomData = {
      user: user?.id.toString(),
      admin: admin?.userId.toString(),
    };
    socketio.emit("joinRoom", roomData);

    // Listen for incoming private messages
    socketio.on("chat", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Listen for other user typing
    socketio.on("isTyping", (data) => {
      if (data.user === admin?.userId.toString()) {
        setUserIsTyping(data.isTyping);
      }
    });

    // Cleanup on component unmount
    return () => {
      socketio.disconnect();
    };
  }, [user, admin]);

  // Mark messages as Read
  const markMessagesAsRead = async () => {
    try {
      if (messages.length > 0) {
        const unReadMsgs = messages.filter(
          (msg) => msg.isRead === false && msg.receiverId === user.id,
        );

        if (
          unReadMsgs.length > 0 &&
          inputRef.current &&
          socket &&
          user &&
          admin
        ) {
          unReadMsgs.forEach((msg) => {
            socket.emit("markAsRead", {
              id: msg.id,
              user: user.id,
              admin: admin.userId,
            });
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSendMessage = () => {
    if (newMessage.length > 1 && socket && user && admin) {
      socket.emit("chat", {
        senderId: user.id,
        receiverId: admin.userId,
        content: newMessage,
      });
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.style.height = "40px";
      }
    }
  };

  const onTyping = () => {
    if (socket) {
      socket.emit("isTyping", {
        user: user?.id.toString(),
        admin: admin?.userId.toString(),
        isTyping: true,
      });
    }
  };
  const onTypingEnd = () => {
    if (socket) {
      socket.emit("isTyping", {
        user: user?.id.toString(),
        admin: admin?.userId.toString(),
        isTyping: false,
      });
    }
  };

  return (
    <Card className="flex h-full min-h-[400px] w-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <Spin spinning={adminLoading}>
          <div className="flex items-center gap-3">
            <img
              src={admin?.avatar || "https://avatar.iran.liara.run/public/23"}
              alt={admin?.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">{admin?.name}</h3>
              <p className="text-xs text-secondary-foreground">
                {admin?.position}
              </p>
            </div>
          </div>
        </Spin>
        <div className="flex gap-2">
          <Button
            data-cal-namespace="30min"
            data-cal-link="erinle-samuel-1zabaa/30min"
            data-cal-config='{"layout":"month_view", "theme": "light"}'
            size={"icon"}
            variant={"secondary"}
            className="rounded-full"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button size={"icon"} variant={null} className="rounded-full">
            ❇️
          </Button>
        </div>
      </div>
      <ScrollArea ref={bottomRef} className="h-64 flex-1 bg-accent p-2">
        {messages.length > 0 &&
          messages.map((msg) => (
            <MessageBox
              key={msg.id}
              id={msg.id}
              content={
                typeof msg.content == "string" &&
                msg.content.includes("https://andikauploader.s3") ? (
                  <a
                    href={msg.content}
                    target="_blank"
                    rel="noreferrer"
                    download={"download"}
                    className="flex items-center hover:text-gray-600"
                  >
                    <Paperclip className="h-4" />
                    Shared File
                  </a>
                ) : (
                  msg.content
                )
              }
              createdAt={msg.createdAt}
              receiverId={msg.receiverId}
              senderId={msg.senderId}
              userId={user?.id}
            />
          ))}

        {(adminLoading || !socket) && (
          <div className="min-h-60 w-full">
            <Spin
              spinning={true}
              className="flex min-h-60 items-center justify-center"
            />
          </div>
        )}

        {!adminLoading && messages.length === 0 && (
          <div className="min-h-60 w-full">
            <p className="mt-8 flex min-h-60 items-center justify-center text-center">
              No messages yet!
            </p>
          </div>
        )}

        {userIsTyping && (
          <p
            className={`mb-3 w-fit animate-bounce whitespace-pre-line rounded-2xl rounded-tl-none bg-accent-foreground/60 p-2 text-white`}
          >
            Typing...
          </p>
        )}
      </ScrollArea>

      <div className="border-t p-2">
        <div className="">
          <Input
            referance={inputRef}
            onFocus={() => {
              onTyping();
              markMessagesAsRead();
            }}
            onBlur={onTypingEnd}
            multiline
            minHeight={40}
            maxHeight={200}
            inputStyle={{ height: 40 }}
            leftButtons={
              <Upload
                maxCount={1}
                showUploadList={false}
                withCredentials={true}
                action={"http://localhost:8000/api/upload"}
                onChange={(info) => {
                  const { status } = info.file;
                  if (status === "uploading") {
                    setIsUploadingFile(true);
                  }
                  if (status === "done") {
                    setIsUploadingFile(false);
                    if (socket) {
                      socket.emit("chat", {
                        senderId: user?.id,
                        receiverId: admin?.userId,
                        content: info.file.response.fileUrl,
                      });
                    }
                  }
                  if (status === "error") {
                    setIsUploadingFile(false);
                  }
                }}
              >
                <Paperclip className="h-4 cursor-pointer font-bold text-gray-500" />
              </Upload>
            }
            rightButtons={
              <Button
                type="submit"
                onClick={onSendMessage}
                size={"icon"}
                className="rounded-full"
              >
                {isUploadingFile ? (
                  <ReloadIcon className={`h-4 animate-spin`} />
                ) : (
                  <Send className="h-4" />
                )}
              </Button>
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewMessage(e.target.value)
            }
            placeholder="Type your message..."
          />
        </div>
      </div>
    </Card>
  );
}

export default ChatWidget;
