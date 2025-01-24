import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigation } from "react-router";

const CartOverview = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation?.location?.pathname === "/cart") {
      console.log("You are on the cart page");
    }
    return () => {};
  });

  const { list } = useSelector((state: RootState) => state.cart);
  return (
    <>
      {list.length ? (
        <footer className="flex justify-between bg-secondary-foreground text-secondary p-4 text-center mt-auto uppercase fixed bottom-0 w-full min-h-14">
          <span>{list.length} Pizzas ₱250.00</span>
          <Link to="/cart">open cart &rarr;</Link>
        </footer>
      ) : null}
    </>
  );
};

export default CartOverview;
