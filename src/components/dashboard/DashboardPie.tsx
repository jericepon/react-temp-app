import DashboardCard from "./DashboardCard";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
  { duration: "2", value: 275, fill: "var(--color-2)" },
  { duration: "3", value: 200, fill: "var(--color-3)" },
  { duration: "4", value: 287, fill: "var(--color-4)" },
  { duration: "8", value: 173, fill: "var(--color-8)" },
];
const chartConfig = {
  2: {
    label: "2 nights",
    color: "hsl(var(--chart-1))",
  },
  3: {
    label: "3 nights",
    color: "hsl(var(--chart-2))",
  },
  4: {
    label: "4-5 nights",
    color: "hsl(var(--chart-3))",
  },
  8: {
    label: "8-14 nights",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const DashboardPie = () => {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);
  return (
    <DashboardCard title="Today Duration Summary" className="h-full">
      <div className="flex grow h-full">
        <div className="flex grow justify-center items-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[350px] h-full"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="duration"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          {/* <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Value
                          </tspan> */}
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="duration" />}
                className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </div>
        {/* <div className="bg-muted w-3/5 flex justify-center items-center">Legend</div> */}
      </div>
    </DashboardCard>
  );
};

export default DashboardPie;
