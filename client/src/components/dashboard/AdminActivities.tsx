import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function AdminRecentActivities() {
  const activities = [
    {
      id: 1,
      activity: "Code example sections of the main page",
      projectId: 1,
      project: {
        assignedPM: {
          name: "Mark Musk",
        },
      },
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      activity: "Code example sections of the main page",
      projectId: 1,
      project: {
        assignedPM: {
          name: "Mark Musk",
        },
      },
      createdAt: "2 hours ago",
    },
    {
      id: 3,
      activity: "Code example sections of the main page",
      projectId: 1,
      project: {
        assignedPM: {
          name: "Mark Musk",
        },
      },
      createdAt: "2 hours ago",
    },
    {
      id: 4,
      activity: "Code example sections of the main page",
      projectId: 1,
      project: {
        assignedPM: {
          name: "Mark Musk",
        },
      },
      createdAt: "2 hours ago",
    },
    {
      id: 5,
      activity: "Code example sections of the main page",
      projectId: 1,
      project: {
        assignedPM: {
          name: "Mark Musk",
        },
      },
      createdAt: "2 hours ago",
    },
  ];
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[480px]">
        <CardContent className="divide-y">
          {activities.map((val, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{val.activity}</h3>
                <p className="text-muted-foreground">{val.createdAt}</p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                #PRJB{val.projectId} | {val.project.assignedPM.name}
              </p>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
