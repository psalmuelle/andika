import { Button } from "../ui/button";
import { Badge } from "antd";
import { SidebarTrigger } from "../ui/sidebar";
import { BellIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NotificationContext } from "@/context/notificationProvider";
import { useContext } from "react";
import { Paperclip } from "lucide-react";

export default function DashboardHeader() {
  const { unreadMessages, updates } = useContext(NotificationContext);
  return (
    <header className="mt-4 flex items-center justify-between px-[3%]">
      <div className="flex items-center justify-center">
        <SidebarTrigger />
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="space-x-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size={"icon"}
                variant={"secondary"}
                className="rounded-full"
              >
                <Badge dot={unreadMessages.length > 0}>
                  <ChatBubbleIcon />
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-48" align="end">
              <h3 className="border-b pb-2 text-sm font-medium">
                Unread Messages
              </h3>
              <section className="mt-3 text-sm text-gray-700">
                {unreadMessages.length > 0 &&
                  unreadMessages.map((msg, index) => (
                    <div className="border-b pb-2" key={index}>
                      📢{" "}
                      {typeof msg.content == "string" &&
                      msg.content.includes("https://andikauploader.s3") ? (
                        <a
                          href={msg.content}
                          target="_blank"
                          rel="noreferrer"
                          download={"download"}
                          className="flex items-center hover:text-gray-600"
                        >
                          <Paperclip className="mr-1 h-4" />A file was shared
                          with you!
                        </a>
                      ) : (
                        msg.content
                      )}
                    </div>
                  ))}
                {unreadMessages.length === 0 && (
                  <div className="my-5 text-center">No unread messages!</div>
                )}
              </section>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                size={"icon"}
                variant={"secondary"}
                className="rounded-full"
              >
                <Badge dot={updates.length > 0}>
                  <BellIcon />
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-48" align="end">
              <h3 className="border-b pb-2 text-sm font-medium">
                Notifications
              </h3>
              <section className="mt-3 text-sm text-gray-700">
                {updates.length > 0 &&
                  updates.map((update, index) => (
                    <div className="border-b pb-2" key={index}>
                      🔔 {update.content}
                    </div>
                  ))}

                {updates.length === 0 && (
                  <div className="my-5 text-center">No new updates!</div>
                )}
              </section>
            </PopoverContent>
          </Popover>
        </div>
        <Button className="block rounded-xl" asChild>
          <Link href={"/dashboard/projects/create"}>Start Project</Link>
        </Button>
      </div>
    </header>
  );
}
