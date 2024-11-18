import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tag } from "antd";

function ProjectCard() {
  return (
    <Card className="w-full max-w-[290px]">
      <CardHeader>
        <CardTitle className="leading-tight">
          API Documentation - Payment Gateway{" "}
        </CardTitle>
        <CardDescription>API Documentation</CardDescription>
        <Tag className="w-fit rounded-xl">
          Active
        </Tag>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Assigned to</span>
          <span className="font-medium text-gray-900">Erinle Samuel</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Due date</span>
          <span className="font-medium text-gray-900">Mar 28, 2024</span>
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={65} />
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
