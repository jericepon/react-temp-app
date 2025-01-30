
const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="flex items-center space-x-2 bg-card shadow p-3 rounded-xl space-x-4">
        <button className="text-sm p-2 bg-primary text-primary-foreground rounded-xl">
          Last 7 days
        </button>
        <button className="text-sm p-2 rounded-xl">Last 30 days</button>
        <button className="text-sm p-2 rounded-xl">Last 90 days</button>
      </div>
    </div>
  );
};

export default DashboardHeader;
