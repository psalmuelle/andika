"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { MessageBox } from "./chatWidget";
import { Paperclip, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Upload } from "antd";
import { Input } from "react-chat-elements";
import useActiveChat from "@/context/activeChat";
import { ProfileType } from "types";
import { Socket } from "socket.io-client";
import socketInstance from "@/config/socket";
import { ReloadIcon } from "@radix-ui/react-icons";

interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export default function AdminChatbox({
  admin,
  usersMessages,
}: {
  admin: ProfileType | undefined;
  usersMessages: MessageType[][] | undefined;
}) {
  const [socket, setSocket] = useState<Socket>();
  const [userIsTyping, setUserIsTyping] = useState<boolean>();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { activeChatId } = useActiveChat();
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  useEffect(() => {
    if (usersMessages && activeChatId !== null) {
      const usermessages = usersMessages.find(
        (msg) =>
          msg[0].receiverId === activeChatId ||
          msg[0].senderId === activeChatId,
      );

      setMessages(usermessages || []);
    }
    if (activeChatId === null) {
      setMessages([]);
    }
  }, [usersMessages, activeChatId]);

  // Mark messages as Read
  useEffect(() => {
    const markMessagesAsRead = async () => {
      try {
        if (messages.length > 0) {
          const unReadMsgs = messages.filter(
            (msg) => msg.isRead === false && msg.receiverId === admin?.userId,
          );

          if (
            unReadMsgs.length > 0 &&
            socket &&
            activeChatId !== null &&
            admin
          ) {
            unReadMsgs.forEach((msg) => {
              socket.emit("markAsRead", {
                id: msg.id,
                user: admin?.userId,
                admin: activeChatId,
              });
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    markMessagesAsRead();
  }, [activeChatId, messages, admin, socket]);

  useEffect(() => {
    if (messages && bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [messages, userIsTyping]);

  useEffect(() => {
    if (!messages || !admin || activeChatId === null) return;

    const socketio = socketInstance();
    setSocket(socketio);

    const roomData = {
      user: activeChatId.toString(),
      admin: admin?.userId.toString(),
    };
    socketio.emit("joinRoom", roomData);

    // Listen for incoming private messages
    socketio.on("chat", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Listen for other user typing
    socketio.on("isTyping", (data) => {
      if (data.user === activeChatId.toString()) {
        setUserIsTyping(data.isTyping);
      }
    });

    // Cleanup on component unmount
    return () => {
      socketio.disconnect();
    };
  }, [messages, admin, activeChatId]);

  const onTyping = () => {
    if (socket && activeChatId !== null) {
      socket.emit("isTyping", {
        user: admin?.userId.toString(),
        admin: activeChatId.toString(),
        isTyping: true,
      });
    }
  };

  const onTypingEnd = () => {
    if (socket && activeChatId !== null) {
      socket.emit("isTyping", {
        user: admin?.userId.toString(),
        admin: activeChatId.toString(),
        isTyping: false,
      });
    }
  };

  const onSendMessage = () => {
    if (newMessage.length > 1 && socket && activeChatId && admin) {
      socket.emit("chat", {
        senderId: admin?.userId,
        receiverId: activeChatId,
        content: newMessage,
      });
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.style.height = "40px";
      }
    }
  };

  return (
    <div>
      <ScrollArea ref={bottomRef} className="h-[65vh] flex-1 bg-accent p-4">
        {messages &&
          messages.length > 0 &&
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
              userId={admin?.userId!}
            />
          ))}
        {activeChatId === null && (
          <div className="mt-10 text-center">
            Start a conversation with a client!
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
      <div className="border-y p-2">
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
                        senderId: admin?.userId,
                        receiverId: activeChatId,
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewMessage(e.target.value);
            }}
            placeholder="Type your message..."
          />
        </div>
      </div>
    </div>
  );
}
