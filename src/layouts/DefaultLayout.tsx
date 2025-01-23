import FullPageLoader from "@/components/FullPageLoader";
import NavBar from "@/components/NavBar";
import { Link, Outlet, useNavigation } from "react-router";

const DefaultLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="flex flex-col h-screen">
        <NavBar />
        <main className="flex grow pt-[72px] pb-[56px]">
          <div className="container p-4">
            <Outlet />
          </div>
        </main>
        <footer className="flex justify-between bg-secondary-foreground text-secondary p-4 text-center mt-auto uppercase fixed bottom-0 w-full">
          <span>2 Pizzas ₱250.00</span>
          <Link to="/cart">open cart &rarr;</Link>
        </footer>
      </div>
    </>
  );
};

export default DefaultLayout;
