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
  users,
}: {
  admin: ProfileType | undefined;
  usersMessages: MessageType[][] | undefined;
  users: ProfileType[] | undefined;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { activeChatId } = useActiveChat();

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
  useEffect(() => {
    if (messages && bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <ScrollArea ref={bottomRef} className="h-[65vh] flex-1 bg-accent p-4">
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
              userId={admin?.userId!}
            />
          ))}
        {activeChatId === null && (
          <div className="mt-10 text-center">
            Start a conversation with a client!
          </div>
        )}
        {/* 
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
            <p className="mt-8 flex min-h-60 items-center justify-center text-center text-white">
              No messages yet!
            </p>
          </div>
        )}

        {userIsTyping && (
          <p
            className={`mb-3 w-fit animate-bounce whitespace-pre-line rounded-2xl rounded-tl-none bg-accent-foreground/60 p-2 text-xs text-white`}
          >
            Typing...
          </p>
        )} */}
      </ScrollArea>
      <div className="border-y p-2">
        <div className="">
          <Input
            referance={inputRef}
            onFocus={() => {
              //   onTyping();
              //   markMessagesAsRead();
            }}
            // onBlur={onTypingEnd}
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
                    // setIsUploadingFile(true);
                  }
                  if (status === "done") {
                    // setIsUploadingFile(false);
                    // if (socket) {
                    //   const res = axiosInstance.post(
                    //     "upload/get-url",
                    //     {
                    //       fileName: [info.file.response.fileName],
                    //     },
                    //     {
                    //       withCredentials: true,
                    //     },
                    //   );
                    //   Promise.resolve(res).then((data) => {
                    //     if (data.data.length > 0) {
                    //       socket.emit("chat", {
                    //         senderId: user?.id,
                    //         receiverId: admin?.userId,
                    //         content: data.data[0],
                    //       });
                    //     }
                    //   });
                    // }
                  }
                  if (status === "error") {
                    // setIsUploadingFile(false);
                  }
                }}
              >
                <Paperclip className="h-4 cursor-pointer font-bold text-gray-500" />
              </Upload>
            }
            rightButtons={
              <Button
                type="submit"
                // onClick={onSendMessage}
                size={"icon"}
                className="rounded-full"
              >
                {/* {isUploadingFile ? (
                  <ReloadIcon className={`h-4 animate-spin`} />
                ) : (
                  <Send className="h-4" />
                )} */}

                {/* Temporary */}
                <Send className="h-4" />
              </Button>
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   setNewMessage(e.target.value)
            }}
            placeholder="Type your message..."
          />
        </div>
      </div>
    </div>
  );
}
