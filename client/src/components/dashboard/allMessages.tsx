import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function AdminMessages() {
  const messages = [
    {
      user: {
        name: "John Doe",
        company: "Compani",
      },
      message: "Hey, I need help with my project.",
      time: "2 hours ago",
      status: "unread",
    },
    {
      user: {
        name: "John Doe",
        company: "Compani",
      },
      message: "Hey, I need help with my project.",
      time: "2 hours ago",
      status: "unread",
    },
    {
      user: {
        name: "Erinle Samuel",
        company: "Andika",
      },
      message: "Do you have any updates on the project?",
      time: "3 hours ago",
      status: "read",
    },
    {
      user: {
        name: "John Lasseter",
        company: "Apple",
      },
      message: "When will the project be completed?",
      time: "4 hours ago",
      status: "read",
    },
  ];
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <ScrollArea className="h-80">
        <CardContent className="divide-y">
          {messages.map((message, index) => (
            <div key={index} className="cursor-pointer p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{message.user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {message.user.company}
                  </p>
                </div>
                <p className="text-muted-foreground">{message.time}</p>
              </div>
              <p className="mt-2">{message.message}</p>
              <span>
                {message.status === "unread" && (
                  <span className="float-right text-xs text-green-700">
                    Unread
                  </span>
                )}
              </span>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
