import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function WriterOverview() {
  const writers = [
    {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      activeProjects: 3,
      completedThisMonth: 8,
    },
    {
      name: "David Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      activeProjects: 2,
      completedThisMonth: 6,
    },
    {
      name: "Emily Wong",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      activeProjects: 4,
      completedThisMonth: 5,
    },
  ];
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="border-b">
        <CardTitle>Writer Overview</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[240px]">
        <CardContent className="divide-y">
          {writers.map((writer, index) => (
            <div key={index} className="cursor-pointer p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <img
                  src={writer.avatar || "/icon-profile.png"}
                  alt={writer.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium">{writer.name}</h3>
                  <div className="mt-1 flex space-x-3 text-sm text-muted-foreground">
                    <span>{writer.activeProjects} active</span>
                    <span>•</span>
                    <span>{writer.completedThisMonth} completed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
