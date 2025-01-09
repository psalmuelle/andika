import { LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import axiosInstance from "@/config/axios";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white/70 px-[5%] py-3 shadow-sm backdrop-blur">
      <div className="flex w-full max-w-[200px] items-center justify-between gap-2">
        <h1 className="font-mono text-xl font-semibold tracking-tight text-zinc-800">
          Andika
        </h1>

        <Button variant={"secondary"} size={"sm"} asChild>
          <Link href={"/admin/dashboard"}>
            <p className="flex items-center">
              Dashbord <LayoutDashboard className="pl-2" />
            </p>
          </Link>
        </Button>
      </div>
      <div>
        <Button
          onClick={async () => {
            await axiosInstance.post(
              "/auth/logout",
              {},
              { withCredentials: true },
            );
            window.location.href = "/admin/login";
          }}
          variant={"link"}
          size={"sm"}
        >
          Exit Admin
        </Button>
      </div>
    </header>
  );
}
