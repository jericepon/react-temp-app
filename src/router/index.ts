import DashboardLayout from "@/layouts/DashboardLayout";
import BookingsPage from "@/pages/BookingsPage";
import CabinsPage from "@/pages/CabinsPage";
import HomePage from "@/pages/HomePage";
import SettingsPage from "@/pages/SettingsPage";
import { createBrowserRouter } from "react-router";

let router = createBrowserRouter([
  {
    path: "",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: HomePage,
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