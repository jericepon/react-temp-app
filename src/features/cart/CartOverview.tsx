import { formatCurrency } from "@/lib/helpers";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigation } from "react-router";

const CartOverview = () => {
  const navigation = useNavigation();
  const { list } = useSelector((state: RootState) => state.cart);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalQty(list.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(list.reduce((acc, item) => acc + item.totalPrice, 0));
  }, [list]);
  return (
    <>
      {list.length ? (
        <footer className="flex justify-between bg-secondary-foreground text-secondary p-4 text-center mt-auto uppercase fixed bottom-0 w-full min-h-14">
          <span>{totalQty} Pizzas {formatCurrency(totalPrice)}</span>
          <Link to="/cart">open cart &rarr;</Link>
        </footer>
      ) : null}
    </>
  );
};

export default CartOverview;
