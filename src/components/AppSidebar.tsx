import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/shadcn/sidebar";
import { ArrowRight, Calendar, Home, Settings, Tent, Users } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./shadcn/button";

const AppSidebar = () => {
  const { open, setOpen } = useSidebar();
  const items = [
    {
      title: "Home",
      url: "/",
      icon: <Home />,
      color: "text-primary",
    },
    {
      title: "Bookings",
      url: "/bookings",
      icon: <Calendar />,
    },
    {
      title: "Cabins",
      url: "/cabins",
      icon: <Tent />,
    },
    {
      title: "Users",
      url: "/users",
      icon: <Users />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings />,
    },
  ];
  return (
    <Sidebar className="dark:bg-card" collapsible="icon">
      <Button
        size={"icon"}
        className="absolute top-0 bottom-0 m-auto -right-[18px] z-10 rounded-full"
        onClick={() => setOpen(!open)}
      >
        <ArrowRight className={[!open ? "rotate-0" : "rotate-180", "transition-all"].join(" ")} />
      </Button>
      <SidebarHeader className="text-center">
        <img
          src="https://ui-avatars.com/api/?name=The+Wild+Oasis"
          className="max-w-16 m-auto w-full"
        />
        {open && <div className="font-bold text-xl capitalize">The wild oasis</div>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      [
                        "rounded rounded-lg py-2",
                        "flex items-center",
                        isActive ? "bg-muted text-primary" : "",
                        !open ? "justify-center" : "px-2 hover:bg-muted",
                      ].join(" ")
                    }
                  >
                    {item.icon}
                    {open && <div className="ml-3">{item.title}</div>}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
