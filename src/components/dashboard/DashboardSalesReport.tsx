import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/select";
import DashboardCard from "./DashboardCard";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";
import { salesReportData } from "@/data";
import { formatCurrency } from "@/lib/helper";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  sale: {
    label: "Sale",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const DashboardSalesReport = () => {
  const [timeRange, setTimeRange] = useState("90d");
  const filteredData = salesReportData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  return (
    <DashboardCard title="Sales" className="h-full">
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="90d" className="rounded-lg">
            Last 3 months
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            Last 30 days
          </SelectItem>
          <SelectItem value="7d" className="rounded-lg">
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex grow h-full">
        <div className="flex grow justify-center items-center">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillSale" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sale)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-sale)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              {/* Dates */}
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tickFormatter={(value) => {
                  return formatCurrency(value);
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="sale"
                type="natural"
                fill="url(#fillSale)"
                stroke="var(--color-sale)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </DashboardCard>
  );
};

export default DashboardSalesReport;
