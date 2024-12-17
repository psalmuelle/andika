import React, { useEffect, useRef, useState } from "react";
import { Send, Phone, VideoIcon, FilePlusIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { io, Socket } from "socket.io-client";
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
}

function MessageBox({
  senderId,
  content,
  userId,
}: MessageType & { userId: number }) {
  return (
    <div
      className={`${senderId === userId && "flex max-w-[284px] justify-end"}`}
    >
      <p
        className={`mb-3 max-w-[75%] whitespace-pre-line rounded-2xl p-2 ${senderId === userId ? "rounded-tr-none bg-white" : "rounded-tl-none bg-accent-foreground text-white"}`}
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
  const [uploadedFileName, setUploadedFileName] = useState<string>();
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
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [messages]);

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

  useEffect(() => {
    if (!user || !admin) return;

    const res = axiosInstance.get(`/chat/${admin?.userId}`, {
      withCredentials: true,
    });
    Promise.resolve(res).then((data) => {
      if (data.data.length > 0) {
        setMessages(data.data);
      }
    });

    const socketio = io("http://localhost:8000", {
      withCredentials: true,
    });
    setSocket(socketio);

    const roomData = {
      user: user?.id.toString(),
      admin: admin?.userId.toString(),
    };
    socketio.emit("joinRoom", roomData, (room: any) => {
      console.log("Joined Room", room);
    });

    // Listen for incoming private messages
    socketio.on("chat", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socketio.on("isTyping", (data) => {
      console.log("isTyping", data);
      if (data.senderId === admin?.userId) {
        setUserIsTyping(data.isTyping);
      }
    });

    // Cleanup on component unmount
    return () => {
      socketio.disconnect();
    };
  }, [user, admin]);

  const onSendMessage = () => {
    if (newMessage.length > 1 && socket) {
      console.log("Sending Message");
      socket.emit("chat", {
        senderId: user?.id,
        receiverId: admin?.userId,
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
        senderId: user?.id,
        receiverId: admin?.userId,
        isTyping: true,
      });
    }
  };
  const onTypingEnd = () => {
    if (socket) {
      socket.emit("isTyping", {
        senderId: user?.id,
        receiverId: admin?.userId,
        isTyping: false,
      });
    }
  };

  return (
    <Card className="flex h-[400px] flex-col">
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
          <Button
            data-cal-namespace="30min"
            data-cal-link="erinle-samuel-1zabaa/30min"
            data-cal-config='{"layout":"month_view", "theme": "light"}'
            size={"icon"}
            variant={"secondary"}
            className="rounded-full"
          >
            <VideoIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea
        ref={bottomRef}
        className="h-64 w-full max-w-[304px] flex-1 bg-accent p-2"
      >
        {messages.map((msg) => (
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
                  className="flex items-center hover:underline"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=11321&format=png&color=000000"
                    className="mr-2 h-4"
                    alt="file"
                  />{" "}
                  File
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

        {userIsTyping && (
          <p
            className={`mb-3 w-fit animate-bounce whitespace-pre-line rounded-2xl rounded-tl-none bg-accent-foreground/60 p-2 text-xs text-white`}
          >
            Typing...
          </p>
        )}
      </ScrollArea>

      <div className="border-t p-2">
        <div className="">
          <Input
            referance={inputRef}
            onFocus={onTyping}
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
                    setUploadedFileName(info.file.response.fileName);
                    if (socket) {
                      const res = axiosInstance.post(
                        "upload/get-url",
                        {
                          fileName: [info.file.response.fileName],
                        },
                        {
                          withCredentials: true,
                        },
                      );
                      Promise.resolve(res).then((data) => {
                        if (data.data.length > 0) {
                          socket.emit("chat", {
                            senderId: user?.id,
                            receiverId: admin?.userId,
                            content: data.data[0],
                          });
                        }
                      });
                    }
                  }
                  if (status === "error") {
                    setIsUploadingFile(false);
                  }
                }}
              >
                <FilePlusIcon className="h-4 cursor-pointer font-bold text-gray-500" />
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
