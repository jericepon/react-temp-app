import Cart from "@/features/cart/Cart";
import Menu, { loader as menuLoader } from "@/features/menu/Menu";
import CreateOrder from "@/features/order/CreateOrder";
import Order from "@/features/order/Order";
import DefaultLayout from "@/layouts/DefaultLayout";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import { ComponentType } from "react";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    ErrorBoundary: ErrorPage as ComponentType,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "menu",
        Component: Menu,
        loader: menuLoader,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "order/new",
        Component: CreateOrder,
      },
      {
        path: "order/:orderId",
        Component: Order,
      },
    ],
  },
]);

export default router;