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
        <div className="p-6 flex grow">{children}</div>
      )}
    </Card>
  );
};

export default DashboardCard;
