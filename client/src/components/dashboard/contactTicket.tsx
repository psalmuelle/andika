import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Popconfirm, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { useQueryClient } from "@tanstack/react-query";

interface ContactTicketType {
  id: number;
  name: string;
  email: string;
  message: string;
}

export default function ContactUsTicket({
  tickets,
  isLoading,
}: {
  tickets: ContactTicketType[];
  isLoading: boolean;
}) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["deleteContactTickets"],
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(`/mail/delete/${id}`, {
        withCredentials: true,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactTickets"] });
    },
  });

  const confirmDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumnsType<ContactTicketType> = [
    { title: "S/N", dataIndex: "id", key: "1" },
    { title: "Name", dataIndex: "name", key: "2" },
    { title: "Email", dataIndex: "email", key: "3" },
    { title: "Message", dataIndex: "message", key: "4" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete Ticket"
          description="Are you sure to delete this ticket?"
          onConfirm={() => confirmDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button variant={"destructive"} size={"sm"}>
            Mark As Done
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card className="w-full">
      <Spin spinning={isLoading}>
        <CardHeader className="border-b">
          <CardTitle className="flex flex-row items-center justify-between">
            <p>Contact Us Tickets</p>
            <p className="font-medium">Total - {tickets?.length}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            dataSource={tickets}
            loading={isLoading}
            columns={columns}
            rowKey="id"
          />
        </CardContent>
      </Spin>
    </Card>
  );
}
