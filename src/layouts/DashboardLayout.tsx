import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/shadcn/sidebar";
import { ThemeProvider } from "@/components/shadcn/theme-privider";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col flex-1 grow bg-muted">
          <AppHeader />
          <div className="flex flex-col flex-1 p-4 space-y-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
