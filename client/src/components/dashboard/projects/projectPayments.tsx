import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "antd";

export default function ProjectPayments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments Made</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Initial Payment <Tag color="success">Paid</Tag>
            </span>
            <span className="font-medium">$1,500</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Second Payment <Tag color="warning">Pending</Tag>
            </span>
            <span className="font-medium">$1,500</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Final Payment <Tag color="warning">Pending</Tag>
            </span>
            <span className="font-medium">$1,500</span>
          </div>
        </div>
        <hr className="mt-4" />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <span className="font-medium">Total</span>
          <span className="text-base font-medium">$4,500</span>
        </div>
      </CardFooter>
    </Card>
  );
}
