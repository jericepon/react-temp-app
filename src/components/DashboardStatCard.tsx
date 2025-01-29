import { ElementType, FC, ReactNode } from "react";
import { Card } from "./ui/card";
import useIncrementAnimation from "@/hooks/use-increment-animation";
type CardPropType = {
  icon?: ReactNode;
  title?: string;
  value?: number;
  iconColorClass?: string;
};
const DashboardStatCard: FC<CardPropType> = ({ icon: Icon, title, value, iconColorClass }) => {
  const animatedValue = useIncrementAnimation(100, 1000); // 2000ms duration for animation

  return (
    <Card className="flex grow flex-1 space-x-6 p-6">
      <div
        className={[
          iconColorClass,
          "flex grow flex-1 rounded-full m-auto justify-center items-center max-h-[90px] max-w-[90px] h-full w-full",
        ].join(" ")}
      >
        {Icon && Icon}
      </div>
      <div className="flex flex-col grow justify-center items-start px-4">
        <div className="text-lg font-medium uppercase text-lg text-gray-500 text-sm">{title}</div>
        <div className="text-4xl font-bold">{Math.round(animatedValue)}</div>
      </div>
    </Card>
  );
};

export default DashboardStatCard;
