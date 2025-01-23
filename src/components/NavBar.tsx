import SearchOrder from "@/features/order/SearchOrder";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import Pizza from "../assets/pizza.svg";
import UserName from "./Username";

const NavBar = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <header
      color="primary"
      className="border bg-primary border-none rounded-none fixed w-full z-10"
    >
      <nav className="flex justify-between items-center p-4 space-x-4">
        <NavLink to="/" className="flex bg-primary text-primary-foreground items-center text-2xl">
          <img src={Pizza} className="w-[40px]" />
          <div className="ml-2 tracking-wider font-semibold hidden md:block">React Pizza Co.</div>
        </NavLink>
        <div className="max-w-[400px] w-full md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          <SearchOrder />
        </div>
        <UserName username={user.username} />
      </nav>
    </header>
  );
};

export default NavBar;
