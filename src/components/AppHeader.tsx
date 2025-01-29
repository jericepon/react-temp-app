import { LogOutIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { NavLink } from "react-router";

const AppHeader = () => {
  return (
    <header className="bg-muted p-1 flex justify-between items-center p-4">
      <SidebarTrigger />
      <nav className="flex items-center space-x-4">
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
