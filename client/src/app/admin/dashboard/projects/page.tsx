'use client'
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import axiosInstance from "@/config/axios";
import { LayoutDashboard } from "lucide-react";

export default function Projects() {
  return (
    <div>
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white/70 px-[5%] py-3 shadow-sm backdrop-blur">
        <div className="flex w-full max-w-[200px] items-center justify-between gap-2">
          <h1 className="font-mono text-xl font-semibold tracking-tight text-zinc-800">
            Andika
          </h1>

          <Button variant={"secondary"} size={"sm"}>
            Dashbord <LayoutDashboard className="pl-2" />
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
              window.location.href = "/admin/auth/login";
            }}
            variant={"link"}
            size={"sm"}
          >
            Exit Admin
          </Button>
        </div>
      </header>
      <main className="min-h-[90vh] px-[5%]">
        <Typography className="mt-8" as={"h4"}>Projects</Typography>
        <section>

        </section>
      </main>
    </div>
  );
}
