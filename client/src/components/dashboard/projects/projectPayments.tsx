import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "antd";
import { ProjectType } from "types";

export default function ProjectPayments({ project }: { project: ProjectType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments Made</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {project?.payments
            .sort((a, b) => a.id - b.id)
            .map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">
                  {payment.id}
                  {payment.id == 1
                    ? "st Payment"
                    : payment.id == 2
                      ? "nd Payment"
                      : payment.id == 3
                        ? "rd Payment"
                        : "th Payment"}{" "}
                  <Tag
                    color={payment.status === "Paid" ? "success" : "warning"}
                  >
                    {payment.status}
                  </Tag>
                </span>
                <span className="font-medium">${payment?.amount}</span>
              </div>
            ))}
        </div>
        <hr className="mt-4" />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <span className="font-medium">Total</span>
          <span className="text-base font-medium">${project?.fee}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
