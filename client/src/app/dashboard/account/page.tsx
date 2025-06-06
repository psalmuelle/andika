"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useProfileStore from "@/context/profile";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

export default function AccountPage() {
  const { getProfile } = useProfileStore();

  const { data: profile, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <div className="mt-6 px-[3%] pb-6">
      <div className="mt-8">
        <h1 className="font-semibold">My Account</h1>
      </div>
      <div className="mt-8">
        <Card>
          <Spin spinning={isPending}>
            <CardHeader className="border-b">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={profile?.avatar} alt={profile?.name} />
                  <AvatarFallback>
                    {profile?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <h2 className="font-semibold">{profile?.name}</h2>
                  <p className="text-muted-foreground">
                    {profile?.position}, {profile?.company}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="mt-4 font-medium">Personal Information</h2>

              <div className="mt-5 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="space-y-2">
                  <label className="text-muted-foreground">Full Name</label>
                  <p>{profile?.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-muted-foreground">Email Address</label>
                  <p>{profile?.user.email}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground">Working at</label>
                  <p>{profile?.company}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground">Position</label>
                  <p>{profile?.position}</p>
                </div>
              </div>
            </CardContent>
          </Spin>
        </Card>
      </div>
    </div>
  );
}
