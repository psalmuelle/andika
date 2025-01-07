import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, Tag } from "antd";
import { ProjectType } from "types";

export default function ProjectPayments({ project }: { project: ProjectType }) {
  const columns = [
    {
      title: "Description",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: string) => `$${parseFloat(amount).toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          className="capitalize"
          color={status === "PAID" ? "success" : "processing"}
        >
          {status.toLowerCase()}
        </Tag>
      ),
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments Made</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Table
            pagination={false}
            dataSource={project?.payments}
            columns={columns}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full max-w-[420px] items-center justify-between px-4">
          <span className="font-medium">Total</span>
          <span className="text-base font-medium">
            $
            {project?.payments
              ?.reduce((sum, payment) => {
                return sum + (parseFloat(payment.amount) || 0);
              }, 0)
              .toLocaleString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
