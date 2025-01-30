import useIncrementAnimation from "@/hooks/use-increment-animation";
import { FC, ReactNode } from "react";
import DashboardCard from "./DashboardCard";
type CardPropType = {
  icon?: ReactNode;
  title?: string;
  value?: number;
  iconColorClass?: string;
};
const DashboardStatCard: FC<CardPropType> = ({ icon: Icon, title, value, iconColorClass }) => {
  const animatedValue = useIncrementAnimation(100, 1000); // 2000ms duration for animation

  return (
    <>
      <DashboardCard>
        <div className="flex grow flex-1 space-x-4">
          <div className="flex grow flex-1 w-1/3">
            <div
              className={[
                iconColorClass,
                "flex rounded-full justify-center items-center h-[70px] w-[70px]",
              ].join(" ")}
            >
              {Icon && Icon}
            </div>
          </div>
          <div className="flex flex-col grow justify-center items-start w-2/3">
            <div className="text-lg font-medium uppercase text-lg text-gray-500 text-sm">
              {title}
            </div>
            <div className="text-4xl font-bold">{Math.round(animatedValue)}</div>
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default DashboardStatCard;
