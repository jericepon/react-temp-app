import FullPageLoader from "@/components/FullPageLoader";
import NavBar from "@/components/NavBar";
import CartOverview from "@/features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router";

const DefaultLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen">
        <NavBar />
        <main className="flex grow pt-24 pb-[56px]">
          <div className="flex flex-col container grow p-4">
            <Outlet />
          </div>
        </main>
        <CartOverview />
      </div>
    </>
  );
};

export default DefaultLayout;
