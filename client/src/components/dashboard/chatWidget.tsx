import { useState } from "react";
import Image from "next/image";
import { Send, Phone, VideoIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ChatWidget = () => {
  const admin = {
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  };
  const [message, setMessage] = useState("");

  return (
    <Card className="flex h-[400px] flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <img
            src={admin.avatar}
            alt={admin.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">{admin.name}</h3>
            <p className="text-xs text-secondary-foreground">Project Manager</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size={"icon"} variant={"secondary"} className="rounded-full">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size={"icon"} variant={"secondary"} className="rounded-full">
            <VideoIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* Chat messages would go here */}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />

          <Button size={"icon"} className="px-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatWidget;
