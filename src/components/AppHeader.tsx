import { LogOutIcon, UserIcon } from "lucide-react";
import { NavLink } from "react-router";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./ui/mode-toggle";

const AppHeader = () => {
  return (
    <header className="bg-card p-1 flex items-center p-4">
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
        <ModeToggle className="rounded-full" />
        <NavLink to="/">
          <LogOutIcon />
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
