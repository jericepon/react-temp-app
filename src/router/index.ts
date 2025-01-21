import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    handle: async () => {
      return {
        title: "Home Page",
      };
    }
  },
  // {
  //   path: "/",
  //   Component: DefaultLayout,
  //   children: [
  //     // {
  //     //   path: "cart",
  //     //   Component: () => (ProtectedRouteWrapper(CartPage)),
  //     // },
  //   ],
  // },
  // {
  //   path: "*",
  // },
]);

export default router;