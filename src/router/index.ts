import DashboardLayout from "@/layouts/DashboardLayout";
import BookingsPage from "@/pages/BookingsPage";
import CabinsPage from "@/pages/CabinsPage";
import DashboardHomePage from "@/pages/DashboardHomePage";
import SettingsPage from "@/pages/SettingsPage";
import UsersPage from "@/pages/UsersPage";
import { createBrowserRouter } from "react-router";

let router = createBrowserRouter([
  {
    path: "",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: DashboardHomePage,
      },
      {
        path: "/bookings",
        Component: BookingsPage,
      },
      {
        path: "/cabins",
        Component: CabinsPage,
      },
      {
        path: "/users",
        Component: UsersPage,
      },
      {
        path: "/settings",
        Component: SettingsPage,
      },
    ]
  },
  {
    path: "*",
    // Component: NotFoundPage,
  },
]);

export default router;