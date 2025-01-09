import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Rate, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";

interface ReviewType {
  id: number;
  rating: number;
  feedback: string;
  projectId: number;
}

export default function ClientReviews({
  reviews,
  isPending,
}: {
  reviews: ReviewType[];
  isPending: boolean;
}) {
  const columns: TableColumnsType<ReviewType> = [
    { title: "S/N", dataIndex: "id", key: "1" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "2",
      render(value) {
        return <Rate defaultValue={value} disabled />;
      },
    },
    { title: "Feedback", dataIndex: "feedback", key: "3" },
    { title: "Project ID", dataIndex: "projectId", key: "4" },
  ];

  return (
    <Card className="w-full">
      <Spin spinning={isPending}>
        <CardHeader className="border-b">
          <CardTitle className="flex flex-row items-center justify-between">
            <p>Reviews From Clients</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            dataSource={reviews}
            loading={isPending}
            columns={columns}
            rowKey="id"
          />
        </CardContent>
      </Spin>
    </Card>
  );
}
