import { Button } from "./ui/button";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between py-4 col-span-4 row-span-1 h-16">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="flex">
        <div className="flex items-center space-x-2">
          <Button variant="default">Last 7 days</Button>
          <Button variant="ghost">Last 30 days</Button>
          <Button variant="ghost">Last 90 days</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
