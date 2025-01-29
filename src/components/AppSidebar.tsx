import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, Hotel, Settings, Tent } from "lucide-react";
import { NavLink } from "react-router";

const AppSidebar = () => {
  const { open } = useSidebar();
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
      icon: <Hotel />,
    },
    {
      title: "Cabins",
      url: "/cabins",
      icon: <Tent />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings />,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="text-center">
        <img
          src="https://ui-avatars.com/api/?name=The+Wild+Oasis"
          className="max-w-16 m-auto w-full"
        />
        {open && <div className="font-bold text-xl capitalize">The wild oasis</div>}
      </SidebarHeader>
      <SidebarContent className={open ? "px-4" : ""}>
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
