"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "antd";
import { Button } from "@/components/ui/button";

const { Paragraph } = Typography;

export default function AccountPage() {
  const userProfile = {
    name: "Erinle Samuel",
    email: "psalmuelle1@gmail.com",
    position: "Software Engineer",
    company: "TechStart Solutions",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    refferalCode: "EHUI3J",
    refferalCount: 5,
  };

  return (
    <div className="mt-6 px-[3%] pb-6">
      <div className="mt-8">
        <h1 className="font-semibold">My Account</h1>
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-14 w-14 rounded-full"
              />
              <div className="">
                <h2 className="font-semibold">{userProfile.name}</h2>
                <p className="text-muted-foreground">
                  {userProfile.position}, {userProfile.company}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="mt-4 font-medium">Personal Information</h2>

            <div className="mt-5 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="space-y-2">
                <label className="text-muted-foreground">Full Name</label>
                <p>{userProfile.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-muted-foreground">Email Address</label>
                <p>{userProfile.email}</p>
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground">Working at</label>
                <p>{userProfile.company}</p>
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground">Position</label>
                <p>{userProfile.position}</p>
              </div>
            </div>

            <h2 className="mt-8 font-medium">Refferal</h2>

            <div className="mt-5 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="space-y-2">
                <label className="text-muted-foreground">Refferal Code</label>
                <Paragraph copyable>{userProfile.refferalCode}</Paragraph>
              </div>
              <div className="space-y-2">
                <label className="text-muted-foreground">Total Referrals</label>
                <p>{userProfile.refferalCount}</p>
              </div>
              <div className="space-y-2">
                <label className="text-muted-foreground">Total Reward</label>
                <p>$100</p>
              </div>
            </div>
            <Button variant={"outline"} className="mt-6">
              Claim Reward
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
