import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Statistic } from "antd";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";

const data = [
  {
    name: "payment_id-1",
    amt: 240,
  },
  {
    name: "payment_id-2",
    amt: 140,
  },
  {
    name: "payment_id-3",
    amt: 220,
  },
  {
    name: "payment_id-4",
    amt: 200,
  },
  {
    name: "payment_id-5",
    amt: 500,
  },
  {
    name: "payment_id-6",
    amt: 120,
  },
  {
    name: "payment_id-7",
    amt: 210,
  },
  {
    name: "payment_id-8",
    amt: 165,
  },
  {
    name: "payment_id-9",
    amt: 210,
  },
  {
    name: "payment_id-10",
    amt: 150,
  },
  {
    name: "payment_id-11",
    amt: 200,
  },
];

export default function RevenueOverview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>Revenue</CardTitle>
      </CardHeader>

      <CardContent className="mt-4">
        <div className="flex items-center justify-between">
          <Statistic
            title="Total Revenue"
            prefix={"$"}
            value={12000}
            valueStyle={{ fontSize: "20px" }}
          />
          <div className="space-y-4">
            <Statistic
              title="This Month"
              prefix={"$"}
              value={1000}
              valueStyle={{ fontSize: "16px" }}
            />

            <Statistic
              title="Pending Payments"
              prefix={"$"}
              value={200}
              valueStyle={{ fontSize: "16px" }}
            />
          </div>
        </div>
        <div className="mt-4">
          <ResponsiveContainer width={"100%"} height={200}>
            <BarChart width={150} height={40} data={data}>
              <Bar dataKey="amt" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant={"outline"} size={"sm"}>
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
