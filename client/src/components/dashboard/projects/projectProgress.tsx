import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tag } from "antd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projectData = {
  id: "PRJ-2024-001",
  title: "API Documentation for Payment Gateway SDK",
  type: "API/SDK Documentation",
  status: "In Progress",
  progress: 48,
  startDate: "2024-03-01",
  dueDate: "2024-03-15",
  assignedWriter: {
    name: "Erinle Samuel",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "Senior Technical Writer",
  },
  description:
    "Comprehensive documentation for the payment gateway SDK, including installation guides, API reference, and implementation examples.",
  milestones: [
    { title: "Initial Draft", status: "completed", date: "2024-03-05" },
    { title: "Technical Review", status: "completed", date: "2024-03-08" },
    { title: "Code Examples", status: "in-progress", date: "2024-03-10" },
    { title: "Final Review", status: "pending", date: "2024-03-13" },
    { title: "Delivery", status: "pending", date: "2024-03-15" },
  ],
  recentActivities: [
    { action: "Code examples section updated", time: "2 hours ago" },
    { action: "Technical review completed", time: "1 day ago" },
    { action: "Initial draft submitted", time: "3 days ago" },
  ],
};

export function ProjectProgress() {
  const project = projectData;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Progress</CardTitle>
        <Tag className="w-fit">{project.status}</Tag>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex justify-between font-medium">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="">{project.progress}%</span>
        </div>
        <Progress className="h-2" value={project.progress} />

        <div className="mt-6 space-y-4">
          {project.milestones.map((milestone, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {milestone.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : milestone.status === "in-progress" ? (
                  <Clock className="h-5 w-5 text-blue-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-300" />
                )}
                <span
                  className={
                    milestone.status === "completed"
                      ? "text-gray-600 line-through"
                      : "text-gray-600"
                  }
                >
                  {milestone.title}
                </span>
              </div>
              <span className="text-sm text-gray-500">{milestone.date}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
