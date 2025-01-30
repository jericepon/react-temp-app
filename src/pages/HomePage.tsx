import DashboardHeader from "@/components/DashboardHeader";
import DashboardStatCard from "@/components/DashboardStatCard";
import {
  CalendarCheck,
  ChartLine,
  DollarSignIcon,
  Luggage,
} from "lucide-react";
import { ReactNode } from "react";

const HomePage = () => {
  type StatCardData = {
    title: string;
    value: number;
    icon: ReactNode;
    iconColorClass?: string;
  };

  const statCardData: StatCardData[] = [
    {
      title: "Bookings",
      value: 0,
      icon: <Luggage size="45px" />,
      iconColorClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Sales",
      value: 0,
      icon: <DollarSignIcon size="45px" />,
      iconColorClass: "bg-green-100 text-green-600",
    },
    {
      title: "Check Ins",
      value: 0,
      icon: <CalendarCheck size="45px" />,
      iconColorClass: "bg-purple-100 text-purple-600",
    },
    {
      title: "Occupancy Rate",
      value: 0,
      icon: <ChartLine size="45px" />,
      iconColorClass: "bg-yellow-100 text-yellow-600",
    },
  ];
  return (
    <>
      <DashboardHeader />
      <div className="flex grow flex-wrap gap-4">
        <div className="flex h-[15%] w-full space-x-4">
          {statCardData.map((stat, index) => (
            <DashboardStatCard {...stat} />
          ))}
        </div>
        <div className="bg-muted h-[35%] w-full" />
        <div className="bg-muted h-[50%] w-full" />
      </div>
    </>
  );
};

export default HomePage;
