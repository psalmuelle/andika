"use client";
import {
  FolderDot,
  House,
  CircleUser,
  LogOut,
  MessageSquareText,
  BadgeCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useUserStore from "@/context/auth";
import useProfileStore from "@/context/profile";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: House,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderDot,
  },
  {
    title: "Support",
    url: "/dashboard/support",
    icon: MessageSquareText,
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: CircleUser,
  },
  {
    title: "Logout",
    url: "#logout",
    icon: LogOut,
  },
];

export default function AppSidebar() {
  const { logout } = useUserStore();
  const { getProfile } = useProfileStore();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <Sidebar collapsible={"icon"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span className="pl-4 font-mono text-xl font-semibold tracking-tight text-zinc-800">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="max-h-[28px] w-full max-w-[28px]"
                />
                Andika
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-8 space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      onClick={() => {
                        item.url == "#logout" && logout();
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-accent-foreground">
              <BadgeCheck color={"blue"} />{" "}
              {isProfileLoading ? (
                <Skeleton className="h-4 w-36" />
              ) : (
                profile?.name
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
