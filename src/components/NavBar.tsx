import SearchOrder from "@/features/order/SearchOrder";
import { NavLink } from "react-router";
import Pizza from "../assets/pizza.svg";
import { ModeToggle } from "./ui/mode-toggle";
const NavBar = () => {
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
        <div className="min-w-[40px]">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
