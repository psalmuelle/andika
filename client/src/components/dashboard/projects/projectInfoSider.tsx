import { BarChart3, Download, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectType } from "types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistance } from "date-fns";
import { Empty, Rate, Table, Tag } from "antd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/config/axios";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const timeAgo = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

const formSchema = z.object({
  rate: z.number(),
  feedback: z.string(),
});

export default function ProjectInfoSidebar({
  project,
  isLoading,
}: {
  project: ProjectType;
  isLoading: boolean;
}) {
  const { toast } = useToast();
  const [btnLoading, setBtnLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: 0,
      feedback: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setBtnLoading(true);

      await axiosInstance.post(
        "/project/review",
        {
          projectId: project.id,
          rating: values.rate,
          feedback: values.feedback,
        },
        {
          withCredentials: true,
        },
      );

      setBtnLoading(false);
      form.reset();
      toast({
        variant: "default",
        title: "Review Submitted Successfully",
        description:
          "Thank you for your feedback. We appreciate your time and effort.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setBtnLoading(false);
    }
  }

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

    {
      title: "Invoice",
      key: "action",
      render: (_: any, record: any) =>
        record.status === "PENDING" &&
        record.datePaid === null && (
          <Button
            size={"sm"}
            onClick={() => {
              getInvoiceUrl(record.invoiceId).then((url) => {
                window.open(url, "_blank");
              });
            }}
          >
            Pay Now
          </Button>
        ),
    },
  ];

  async function getInvoiceUrl(fileName: string) {
    const response = await axiosInstance.post(
      "/upload/get-url",
      {
        fileName: [fileName],
      },
      {
        withCredentials: true,
      },
    );

    return response.data[0];
  }
  return (
    <div className="flex w-full grid-cols-2 flex-col gap-6 max-lg:grid max-sm:grid-cols-1 lg:max-w-[290px]">
      {/* Assigned Writer */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Assigned Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <img
              src={
                project?.assignedPM.avatar
                  ? project.assignedPM.avatar
                  : "https://avatar.iran.liara.run/public/23"
              }
              alt={project?.assignedPM.name}
              className="h-9 w-9 rounded-full"
            />
            <div>
              <h3 className="font-medium">{project?.assignedPM.name}</h3>
              <p className="text-muted-foreground">
                {project?.assignedPM.position}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="row-span-2 w-full max-sm:row-span-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[286px]">
          <CardContent>
            <div className="space-y-4">
              {!isLoading &&
                project?.activities.length > 0 &&
                project?.activities
                  .sort((a, b) => b.id - a.id)
                  .map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <BarChart3 className="mt-1 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p>{activity?.activity}</p>
                        <p className="text-xs text-gray-500">
                          {timeAgo(activity?.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
              {!isLoading && project?.activities.length === 0 && (
                <Empty
                  className="mt-8"
                  description={"No recent activities"}
                  imageStyle={{
                    width: "80px",
                    display: "block",
                    margin: "0px auto",
                  }}
                />
              )}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Quick Actions */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant={"outline"}>
                <CreditCard className="mr-3 h-5 w-5" />
                Make Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Proceed with Payment</DialogTitle>
                <DialogDescription>
                  Confirm and complete the payment to proceed with your project.
                </DialogDescription>

                <div className="pt-4">
                  <Table
                    pagination={false}
                    dataSource={project?.payments}
                    columns={columns}
                    rowKey={(record) => record.id}
                  />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Download className="mr-3 h-5 w-5" />
                Project Files
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle> Project Files</DialogTitle>
                <DialogDescription>
                  Access and review the completed files for your project.
                </DialogDescription>
                <div className="space-y-4 pt-4">
                  {project.files.length === 0 && (
                    <p className="my-6 text-center text-sm font-medium">
                      Nothing here yet. Check back later!
                    </p>
                  )}

                  {project.files.length > 0 &&
                    project.files.map((file) => (
                      <Button
                        className="w-full"
                        variant={"outline"}
                        onClick={() => {
                          window.open(file.url, "_blank");
                        }}
                        key={file.id}
                      >
                        {file.hostname}
                      </Button>
                    ))}
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={
                  project.status !== "COMPLETED" || project.feedback !== null
                }
                className="w-full"
                variant={"secondary"}
              >
                <StarFilledIcon className="mr-3 h-5 w-5" color="gold" />
                Drop a Review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Drop a Review</DialogTitle>
                <DialogDescription>
                  Share your thoughts and feedback on the project.
                </DialogDescription>

                <div className="pt-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate Our Service</FormLabel>
                            <FormControl className="block">
                              <Rate allowHalf {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="feedback"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Write your message here"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={project.feedback !== null}
                        loading={btnLoading}
                        className="w-full"
                        size="lg"
                      >
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
