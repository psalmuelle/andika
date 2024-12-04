import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Typography from "../ui/typography";
import Link from "next/link";

const schedules = [
  {
    title: "Meeting with John Doe",
    time: "9:00 AM",
    date: "Today",
    meetingLink: "https://meet.google.com/abc-xyz",
  },
  {
    title: "Meeting with Jane Doe",
    time: "10:00 AM",
    date: "Today",
    meetingLink: "https://meet.google.com/abc-xyz",
  },
];

export default function CallSchedules() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>Meeting Schedules</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[480px]">
        <CardContent className="divide-y">
          {schedules.map((schedule, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <Typography as="p" className="">
                {schedule.title}
              </Typography>
              <div className="mt-1 flex items-center justify-between gap-1">
                <p>
                  {schedule.date}, {schedule.time}
                </p>
                <Button variant={"link"} size={"sm"} asChild>
                  <a href={schedule.meetingLink} target="_blank">
                    Join Meeting
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
