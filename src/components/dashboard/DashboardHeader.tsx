import { FC, ReactNode } from "react";

type PropType = {
  children?: ReactNode;
  title?: string;
};
const DashboardHeader: FC<PropType> = (props) => {
  const { title, children } = props;
  return (
    <div className="flex items-center justify-between">
      {title && <h1 className="font-bold text-2xl">{title}</h1>}
      {children && children}
      {/* <div className="flex items-center space-x-2 bg-card shadow p-3 rounded-xl space-x-4">
        <button className="text-sm p-2 bg-primary text-primary-foreground rounded-xl">
          Last 7 days
        </button>
        <button className="text-sm p-2 rounded-xl">Last 30 days</button>
        <button className="text-sm p-2 rounded-xl">Last 90 days</button>
      </div> */}
    </div>
  );
};

export default DashboardHeader;
