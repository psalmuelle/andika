"use client";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { MessageBox } from "./chatWidget";
import { Paperclip, Send } from "lucide-react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Upload } from "antd";
import { Input } from "react-chat-elements";
import axiosInstance from "@/config/axios";

const messages = [
  {
    id: 1,
    content: "Hey, how are you doing?",
    senderId: 2,
    receiverId: 1,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    createdAt: "10:30 AM",
    isSelf: false,
  },
  {
    id: 2,
    content: "I'm good, thanks! How about you?",
    senderId: 1,
    receiverId: 2,
    createdAt: "10:31 AM",
    isSelf: true,
  },
  {
    id: 3,
    content: "Just finished a great meeting. Want to grab lunch later?",
    senderId: 2,
    receiverId: 1,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    createdAt: "10:32 AM",
    isSelf: false,
  },
];

export default function AdminChatbox() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
              userId={1}
            />
          ))}
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
