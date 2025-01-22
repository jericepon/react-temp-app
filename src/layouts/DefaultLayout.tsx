import NavBar from "@/components/NavBar";
import { Link, Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="flex grow pt-[72px]">
        <div className="container p-4">
          <Outlet />
        </div>
      </main>
      <footer className="flex justify-between bg-secondary-foreground text-secondary p-4 text-center mt-auto uppercase">
        <span>2 Pizzas ₱250.00</span>
        <Link to="/cart">open cart &rarr;</Link>
      </footer>
    </div>
  );
};

export default DefaultLayout;
