import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ui/theme-privider";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-col flex-1 grow">
            <AppHeader />
            <div className="grid flex-1 grow p-4 grid-cols-4 gap-4">
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default DashboardLayout;
