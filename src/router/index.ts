import Menu from "@/features/menu/Menu";
import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "menu",
        Component: Menu,
      },
    ],
  },
]);

export default router;