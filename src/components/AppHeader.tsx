import { LogOutIcon, UserIcon } from "lucide-react";
import { NavLink } from "react-router";
import { Avatar, AvatarImage } from "./shadcn/avatar";
import { ModeToggle } from "./shadcn/mode-toggle";

const AppHeader = () => {
  return (
    <header className="bg-card p-1 flex items-center p-4">
      <div className="font-bold text-xl capitalize text-primary">The wild oasis</div>
      <nav className="flex items-center space-x-4 ml-auto">
        <div className="flex items-center space-x-3 mr-6">
          <Avatar>
            <AvatarImage src="https://ui-avatars.com/api/?name=The+Wild+Oasis" alt="@shadcn" />
          </Avatar>
          <div>Lucas Epon</div>
        </div>
        <NavLink to="/">
          <UserIcon />
        </NavLink>
        <div className="cursor-pointer">
          <ModeToggle className="rounded-full" />
        </div>
        <NavLink to="/">
          <LogOutIcon />
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
