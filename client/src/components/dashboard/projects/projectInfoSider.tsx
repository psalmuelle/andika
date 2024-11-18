import React from "react";
import {
  FileEdit,
  ArrowRight,
  BarChart3,
  Download,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projectData = {
  id: "PRJ-2024-001",
  title: "API Documentation for Payment Gateway SDK",
  type: "API/SDK Documentation",
  status: "In Progress",
  progress: 65,
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

export default function ProjectInfoSidebar() {
  const project = projectData;
  return (
    <div className="flex w-max grid-cols-2 flex-col gap-6 max-lg:grid max-sm:grid-cols-1">
      {/* Assigned Writer */}
      <Card className="w-full max-w-[264px]">
        <CardHeader>
          <CardTitle>Assigned Writer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <img
              src={project.assignedWriter.avatar}
              alt={project.assignedWriter.name}
              className="h-9 w-9 rounded-full"
            />
            <div>
              <h3 className="font-medium">{project.assignedWriter.name}</h3>
              <p className="text-muted-foreground">
                {project.assignedWriter.role}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="row-span-2 w-full max-w-[264px] max-sm:row-span-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <BarChart3 className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="w-full max-w-[264px]">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" variant={"outline"}>
            <CreditCard className="mr-3 h-5 w-5" />
            Make Payment
          </Button>
          <Button className="w-full" variant={"outline"}>
            <FileEdit className="mr-3 h-5 w-5" />
            Request Revision
          </Button>
          <Button disabled className="w-full">
            <Download className="mr-3 h-5 w-5" />
            Finished Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
