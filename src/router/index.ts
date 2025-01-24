import Cart from "@/features/cart/Cart";
import Menu, { loader as menuLoader } from "@/features/menu/Menu";
import CreateOrder, { action as createOrderAction } from "@/features/order/CreateOrder";
import Order, { loader as orderLoader } from "@/features/order/Order";
import OrderNotFound from "@/features/order/OrderNotFound";
import DefaultLayout from "@/layouts/DefaultLayout";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import { ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

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
        Component: () => ProtectedRoute(Menu),
        loader: menuLoader,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "order/new",
        Component: CreateOrder,
        action: createOrderAction,
      },
      {
        path: "order/:orderId",
        Component: Order,
        ErrorBoundary: OrderNotFound as ComponentType,
        loader: orderLoader
      },
    ],
  },
]);

export default router;