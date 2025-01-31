import DashboardBookings from "@/components/dashboard/DashboardBookings";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardPie from "@/components/dashboard/DashboardPie";
import DashboardSalesReport from "@/components/dashboard/DashboardSalesReport";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import { CalendarCheck, ChartLine, DollarSignIcon, Luggage } from "lucide-react";
import { ReactNode } from "react";

const DashboardHomePage = () => {
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
      <div className="flex grow flex-wrap gap-4 overflow-y-auto no-scrollbar">
        <div className="flex w-full space-x-4">
          {statCardData.map((stat, index) => (
            <div className="w-1/4" key={index}>
              <DashboardStatCard {...stat} />
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="flex h-full w-full space-x-4 grow flex-1">
            <div className="w-2/3">
              <DashboardBookings />
            </div>
            <div className="w-1/3">
              <DashboardPie />
            </div>
          </div>
        </div>
        <div className="h-[50%] w-full">
          <DashboardSalesReport />
        </div>
      </div>
    </>
  );
};

export default DashboardHomePage;
