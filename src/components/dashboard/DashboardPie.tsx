import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import DashboardCard from "./DashboardCard";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
];
const chartConfig = {
  chrome: {
    label: "2 nights",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "3 nights",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "4-5 nights",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "8-14 nights",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const DashboardPie = () => {
  return (
    <DashboardCard title="Today Duration Summary" className="h-full">
      <div className="flex grow h-full">
        <div className="flex grow justify-center items-center">
          <ChartContainer config={chartConfig} className="w-full h-4/5 max-w-[250px] ">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="browser"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="visitors"
                strokeWidth={2}
                radius={8}
                activeIndex={2}
                activeBar={({ ...props }) => {
                  return (
                    <Rectangle
                      {...props}
                      fillOpacity={0.8}
                      stroke={props.payload.fill}
                      strokeDasharray={4}
                      strokeDashoffset={4}
                    />
                  );
                }}
              />
            </BarChart>
          </ChartContainer>
        </div>
        {/* <div className="bg-muted w-3/5 flex justify-center items-center">Legend</div> */}
      </div>
    </DashboardCard>
  );
};

export default DashboardPie;
