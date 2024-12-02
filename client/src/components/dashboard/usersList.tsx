import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: number;
  name: string;
  startup: string;
  email: string;
  projects: number;
}

const dataSource = [
  {
    key: 1,
    name: "John Doe",
    startup: "Compani",
    email: "main@gmail.com",
    projects: 3,
  },
  {
    key: 2,
    name: "Erinle Samuel",
    startup: "Andika",
    email: "andika@gmail.com",
    projects: 5,
  },
];

export default function UsersList() {
  const columns: TableColumnsType<DataType> = [
    { title: "S/N", dataIndex: "key", key: "1" },
    { title: "Name", dataIndex: "name", key: "2" },
    { title: "Startup", dataIndex: "startup", key: "3" },
    { title: "Email", dataIndex: "email", key: "4" },
    {
      title: "No Projects",
      dataIndex: "projects",
      key: "5",
      sorter: (a, b) => a.projects - b.projects,
    },
  ];
  return (
    <Card className="w-full max-w-5xl">
      <CardHeader className="border-b">
        <CardTitle className="flex flex-row items-center justify-between">
          <p>Clients</p>
          <p className="font-medium">Total - {dataSource.length}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table dataSource={dataSource} loading={false} columns={columns} />
      </CardContent>
    </Card>
  );
}
