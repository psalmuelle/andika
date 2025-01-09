import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Statistic } from "antd";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import { ProjectType } from "types";
import { ChartContainer } from "../ui/chart";
import { type ChartConfig } from "@/components/ui/chart";

function getProjectMetrics(projects: ProjectType[]) {
  const totalRevenue = projects.reduce((sum, project) => {
    const paidPayments = project.payments.filter(
      (payment) => payment.status === "PAID" && payment.datePaid !== null,
    );
    const revenue = paidPayments.reduce(
      (subSum, payment) => subSum + parseFloat(payment.amount),
      0,
    );
    return sum + revenue;
  }, 0);

  const thisMonthRevenue = projects.reduce((sum, project) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthPayments = project.payments.filter((payment) => {
      if (payment.status === "PAID" && payment.datePaid) {
        const datePaid = new Date(payment.datePaid);
        return (
          datePaid.getMonth() === currentMonth &&
          datePaid.getFullYear() === currentYear
        );
      }
      return false;
    });

    const revenue = thisMonthPayments.reduce(
      (subSum, payment) => subSum + parseFloat(payment.amount),
      0,
    );
    return sum + revenue;
  }, 0);

  const pendingPayments = projects.reduce((sum, project) => {
    const pendingPayments = project.payments.filter(
      (payment) => payment.status === "PENDING" && payment.datePaid === null,
    );
    const pendingAmount = pendingPayments.reduce(
      (subSum, payment) => subSum + parseFloat(payment.amount),
      0,
    );
    return sum + pendingAmount;
  }, 0);

  const revenueData = projects.flatMap((project) =>
    project.payments
      .filter(
        (payment) => payment.status === "PAID" && payment.datePaid !== null,
      )
      .map((payment) => {
        const datePaid = new Date(payment?.datePaid!);
        const month = datePaid.toLocaleString("default", { month: "short" });
        return {
          name: `payment_id-${payment.id}`,
          amt: parseFloat(payment.amount),
          month,
        };
      }),
  );

  return {
    totalRevenue,
    thisMonthRevenue,
    pendingPayments,
    revenueData,
  };
}

export default function RevenueOverview({
  projects,
}: {
  projects: ProjectType[];
}) {
  const chartConfig = {
    payment: {
      label: "Payments",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full w-full max-w-[400px]">
      <CardHeader className="border-b">
        <CardTitle>Revenue</CardTitle>
      </CardHeader>

      {projects && projects.length === 0 && (
        <CardContent className="mt-4">
          <div className="flex h-56 items-center justify-center">
            <p className="text-center">No projects found</p>
          </div>
        </CardContent>
      )}

      {projects && projects.length > 0 && (
        <CardContent className="mt-4">
          <div className="">
            <Statistic
              title="Total Revenue"
              prefix={"$"}
              className="text-center"
              value={getProjectMetrics(projects).totalRevenue}
              valueStyle={{
                fontSize: "28px",
                fontWeight: 700,
                textAlign: "center",
              }}
            />
            <div className="mt-4 flex justify-between border-t pt-4">
              <Statistic
                title="This Month"
                prefix={"+ $"}
                value={getProjectMetrics(projects).thisMonthRevenue}
                valueStyle={{ fontSize: "20px", fontWeight: 600 }}
              />

              <Statistic
                title="Pending Payments"
                prefix={"$"}
                value={getProjectMetrics(projects).pendingPayments}
                valueStyle={{ fontSize: "18px", fontWeight: 500, color: "red" }}
              />
            </div>
          </div>
          <div className="mt-6">
            <ChartContainer
              config={chartConfig}
              className="min-h-[280px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={getProjectMetrics(projects).revenueData}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <Bar dataKey="amt" fill="var(--color-payment)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
