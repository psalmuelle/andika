import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import { ProfileType } from "types";

export default function UsersList({
  users,
  isLoading,
}: {
  users: (ProfileType & { _count: { projects: number } })[];
  isLoading: boolean;
}) {
  const columns: TableColumnsType<
    ProfileType & { _count: { projects: number } }
  > = [
    { title: "S/N", dataIndex: "id", key: "1" },
    { title: "Name", dataIndex: "name", key: "2" },
    { title: "Company", dataIndex: "company", key: "3" },
    { title: "Position", dataIndex: "position", key: "4" },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "5",
    },
    {
      title: "No Projects",
      dataIndex: ["_count", "projects"],
      key: "6",
      sorter: (a, b) => a._count.projects - b._count.projects,
    },
  ];

  return (
    <Card className="w-full">
      <Spin spinning={isLoading}>
        <CardHeader className="border-b">
          <CardTitle className="flex flex-row items-center justify-between">
            <p>Clients</p>
            <p className="font-medium">Total - {users?.length}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            dataSource={users}
            loading={false}
            columns={columns}
            rowKey="id"
          />
        </CardContent>
      </Spin>
    </Card>
  );
}
