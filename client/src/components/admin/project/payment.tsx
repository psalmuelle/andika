import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectType } from "types";
import { date, z } from "zod";
import { Popover as PopoverAntd } from "antd";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Enter title with atleast 3 characters",
  }),
  amount: z.string().min(1, {}),
  dueDate: z.date(),
  status: z.enum(["PAID", "PENDING"]),
  file: z.any(),
});

const PaymentPopoverContent = ({
  status,
  handleClick,
}: {
  status: string;
  handleClick: (dateIso: string) => void;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [dateIso, setDateIso] = useState<string>();
  const handlePayments = async () => {
    handleClick(dateIso!);
  };
  return (
    <div>
      <div className="mt-2 flex items-center gap-1">
        <input
          type={"checkbox"}
          id="status"
          onChange={(e) => setIsActive(e.target.checked)}
        />
        <label htmlFor="status" className="font-medium">
          {status === "PAID" ? "Mark as Pending" : "Mark as Paid"}
        </label>
      </div>

      <Input
        className="mb-4 mt-2 h-7"
        type={"date"}
        onChange={(e) => {
          if (e.currentTarget.valueAsDate) {
            setDateIso(e.currentTarget.valueAsDate?.toISOString());
          }
        }}
      />
      <Button
        disabled={!isActive || !dateIso}
        size={"sm"}
        variant={"outline"}
        className="mt-2 w-full"
        onClick={handlePayments}
      >
        Change Status
      </Button>
    </div>
  );
};

export default function ProjectPayments({ project }: { project: ProjectType }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createPayment = useMutation({
    mutationKey: ["project", "payment"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("amount", data.amount);
      formData.append("dueDate", data.dueDate.toISOString());
      formData.append("status", data.status);
      formData.append("projectId", project.id.toString());
      formData.append("invoice", data.file[0]);

      const response = await axiosInstance.post(
        "/project/payment/create",
        formData,
        {
          withCredentials: true,
          headers: { Accept: "multipart/form-data" },
        },
      );
      return response;
    },
    onSuccess() {
      toast({
        title: `Payment Added Successfully`,
        description: `Payment has been added to project`,
      });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error instanceof AxiosError ? error.response?.data.message : "Something went wrong"}`,
        description: "There was a problem with your request.",
      });
    },
  });

  const mutatePayment = useMutation({
    mutationKey: ["project", "payment", "update"],
    mutationFn: async (data: {
      status: string;
      id: number;
      datePaid: string | null;
    }) => {
      const response = await axiosInstance.put(
        `/project/payment/update/${data.id}`,
        {
          status: data.status,
          datePaid: data.datePaid,
        },
        {
          withCredentials: true,
        },
      );
      return response;
    },
    onSuccess(_data, { status }) {
      toast({
        title: `Marked payment as ${status === "PAID" ? "Paid" : "Pending"}`,
        description: `Payment has been updated successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error instanceof AxiosError ? error.response?.data.message : "Something went wrong"}`,
        description: "There was a problem with your request.",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createPayment.mutateAsync(values);
    form.reset();
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
      render: (status: string, data: any) => (
        <PopoverAntd
          title="Change Payment Status"
          trigger={"click"}
          content={
            <PaymentPopoverContent
              status={status}
              handleClick={(dateIso) =>
                mutatePayment.mutate({
                  status: status === "PAID" ? "PENDING" : "PAID",
                  datePaid: status === "PENDING" ? dateIso : null,
                  id: data.id,
                })
              }
            />
          }
        >
          <Tag
            className="cursor-pointer capitalize"
            color={status === "PAID" ? "success" : "processing"}
          >
            {status.toLowerCase()}
          </Tag>
        </PopoverAntd>
      ),
    },
  ];
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Payments</CardTitle>

        <Dialog
          onOpenChange={(open) => {
            if (open) {
              form.reset();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button size={"sm"} variant={"outline"}>
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payment</DialogTitle>
              <DialogDescription>
                Add payment and invoice to project. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Title of Payment"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type={"number"}
                          placeholder="Enter Amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`"pl-3 font-normal", text-left text-sm ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PP")
                              ) : (
                                <span>Select Due Date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="PAID">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>Upload Invoice</FormLabel>
                      <FormControl>
                        <Input
                          type={"file"}
                          placeholder="Upload file"
                          onChange={(e) => {
                            form.setValue("file", e.target.files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  loading={createPayment.isPending}
                  type="submit"
                  className="w-full"
                >
                  Save
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div>
          <Table
            pagination={false}
            dataSource={project?.payments}
            columns={columns}
            rowKey={(record) => record.id}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full max-w-[464px] items-center justify-between px-4">
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
