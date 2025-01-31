import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";
type PropType = {
  className?: string;
  title?: string;
  children?: ReactNode;
};
const DashboardCard = (props: PropType) => {
  const { className, title, children } = props;
  return (
    <Card className={["flex flex-col grow flex-1", className].join(" ")}>
      {title && (
        <CardHeader>
          <CardTitle className="text-xl capitalize">{title}</CardTitle>
        </CardHeader>
      )}
      {title ? (
        <CardContent className="grow">{children}</CardContent>
      ) : (
        <CardContent className="grow pt-6">{children}</CardContent>
      )}
    </Card>
  );
};

export default DashboardCard;
