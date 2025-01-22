import Cart from "@/features/cart/Cart";
import Menu from "@/features/menu/Menu";
import CreateOrder from "@/features/order/CreateOrder";
import Order from "@/features/order/Order";
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