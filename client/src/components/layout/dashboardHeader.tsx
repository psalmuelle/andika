import { Button } from "../ui/button";
import { Badge } from "antd";
import { SidebarTrigger } from "../ui/sidebar";
import { BellIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="mt-4 flex items-center justify-between px-[3%]">
      <div className="flex items-center justify-center">
        <SidebarTrigger />
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="space-x-3">
          <Button size={"icon"} variant={"secondary"} className="rounded-full">
            <Badge dot>
              <ChatBubbleIcon />
            </Badge>
          </Button>
          <Button size={"icon"} variant={"secondary"} className="rounded-full">
            <Badge dot>
              <BellIcon />
            </Badge>
          </Button>
        </div>
        <Button className="block rounded-xl" asChild>
          <Link href={"/dashboard/projects/create"}>Start Project</Link>
        </Button>
      </div>
    </header>
  );
}
