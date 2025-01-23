import { NavLink } from "react-router";
import Pizza from "../assets/pizza.svg";
import { Input } from "./ui/input";
import { ModeToggle } from "./ui/mode-toggle";
import SearchOrder from "@/features/order/SearchOrder";
const NavBar = () => {
  return (
    <header
      color="primary"
      className="border bg-primary border-none rounded-none fixed w-full z-10"
    >
      <nav className="flex justify-between items-center p-4">
        <NavLink to="/" className="flex bg-primary text-primary-foreground items-center text-2xl">
          <img src={Pizza} className="w-[40px]" />
          <div className="ml-2 tracking-wider font-semibold hidden md:block">React Pizza Co.</div>
        </NavLink>
        <SearchOrder />
        <ModeToggle />
      </nav>
    </header>
  );
};

export default NavBar;
