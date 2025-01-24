import RestrictedPage from "@/pages/RestrictedPage";
import { RootState } from "@/store";
import { ComponentType, FC } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute: FC<ComponentType> = (Component) => {
  const { username } = useSelector((state: RootState) => state.user);

  if (!username) {
    return <RestrictedPage />;
  }

  return <Component />;
};

export default ProtectedRoute;
