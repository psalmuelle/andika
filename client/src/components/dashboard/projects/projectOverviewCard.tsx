import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";

export default function ProjectOverview() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-1.5">
            <FileText className="text-muted-foreground/70" />
            <div>
              <CardDescription className="mb-1">Project Type</CardDescription>
              <CardTitle>API/SDK Documentation</CardTitle>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="text-muted-foreground/70" />
            <div>
              <CardDescription className="mb-1">Due Date</CardDescription>
              <CardTitle>2024-03-15</CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          Comprehensive documentation for the payment gateway SDK, including
          installation guides, API reference, and implementation examples.
        </p>
      </CardContent>
    </Card>
  );
}
