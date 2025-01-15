import React, { useEffect, useRef, useState } from "react";
import { Send, Phone, Paperclip } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios";
import { Socket } from "socket.io-client";
import socketInstance from "@/config/socket";
import { Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spin, Upload } from "antd";
import { ReactElement } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ProfileType } from "types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className={`${senderId !== userId && "flex w-full justify-end"}`}>
      <p
        className={`mb-3 w-fit max-w-[70%] whitespace-pre-line rounded-2xl p-2 ${senderId !== userId ? "rounded-tr-none bg-white" : "rounded-tl-none bg-accent-foreground text-white"}`}
      >
        {content}
      </p>
    </div>
  );
}

interface Props {
  admin: ProfileType;
  client: ProfileType;
}

function AdminChatClient({ admin, client }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userIsTyping, setUserIsTyping] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages && bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [messages, userIsTyping]);

  //get chat messages
  useEffect(() => {
    async function getChat() {
      const res = await axiosInstance.get(`/chat/${client?.userId}`, {
        withCredentials: true,
      });
      if (res.data.length > 0) {
        setMessages(res.data);
      }
    }
    if (!client) return;
    getChat();
  }, [client]);

  useEffect(() => {
    if (!client || !admin) return;

    const socketio = socketInstance();
    setSocket(socketio);

    const roomData = {
      admin: client?.userId.toString(),
      user: admin?.userId.toString(),
    };
    socketio.emit("joinRoom", roomData);

    // Listen for incoming private messages
    socketio.on("chat", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Listen for other user typing
    socketio.on("isTyping", (data) => {
      if (data.user === client?.userId.toString()) {
        setUserIsTyping(data.isTyping);
      }
    });

    // Cleanup on component unmount
    return () => {
      socketio.disconnect();
    };
  }, [client, admin]);

  // Mark messages as Read
  const markMessagesAsRead = async () => {
    try {
      if (messages.length > 0) {
        const unReadMsgs = messages.filter(
          (msg) => msg.isRead === false && msg.receiverId === admin.userId,
        );

        if (
          unReadMsgs.length > 0 &&
          inputRef.current &&
          socket &&
          client &&
          admin
        ) {
          unReadMsgs.forEach((msg) => {
            socket.emit("markAsRead", {
              id: msg.id,
              admin: client.userId,
              user: admin.userId,
            });
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSendMessage = () => {
    if (newMessage.length > 1 && socket && client && admin) {
      socket.emit("chat", {
        senderId: admin.userId,
        receiverId: client.userId,
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
        user: admin?.userId.toString(),
        admin: client?.userId.toString(),
        isTyping: true,
      });
    }
  };
  const onTypingEnd = () => {
    if (socket) {
      socket.emit("isTyping", {
        user: admin?.userId.toString(),
        admin: client?.userId.toString(),
        isTyping: false,
      });
    }
  };

  return (
    <Card className="flex h-full min-h-[400px] w-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={client?.avatar} alt={client?.name} />
            <AvatarFallback>
              {client?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{client?.name}</h3>
            <p className="text-xs text-secondary-foreground">
              {client?.position}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            disabled
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
              userId={admin?.id}
            />
          ))}

        {!socket && (
          <div className="min-h-60 w-full">
            <Spin
              spinning={true}
              className="flex min-h-60 items-center justify-center"
            />
          </div>
        )}

        {messages.length === 0 && (
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
                action={`${process.env.NEXT_PUBLIC_API_URL}/upload`}
                onChange={(info) => {
                  const { status } = info.file;
                  if (status === "uploading") {
                    setIsUploadingFile(true);
                  }
                  if (status === "done") {
                    setIsUploadingFile(false);
                    if (socket) {
                      socket.emit("chat", {
                        senderId: admin.userId,
                        receiverId: client?.userId,
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

export default AdminChatClient;
