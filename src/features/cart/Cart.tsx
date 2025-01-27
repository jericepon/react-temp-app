import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helpers";
import { AppDispatch, RootState } from "@/store";
import { clearCart, deleteItem, minusQuantity, plusQuantity } from "@/store/features/cart";
import { CartItem } from "@/types/cart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import EmptyCart from "./EmptyCart";

type CartInputType = "plus" | "minus";

const Cart = () => {
  const navigate = useNavigate();
  const { list } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="page-inner">
      {/* Back link */}
      <Link to="/menu" className="text-blue-500 mb-4">
        &larr; Back to Menu
      </Link>
      {/* Empty cart */}
      {!list.length ? (
        <EmptyCart />
      ) : (
        <>
          <div className="flex flex-col items-center text-center">
            {list.map((item) => (
              <Cart.Item key={item.pizzaId} item={item} />
            ))}
          </div>
          {/* Order action buttons */}
          <div className="flex space-x-4 mt-6">
            <Button className="uppercase font-bold" onClick={() => navigate("/order/new")}>
              Order Pizzas
            </Button>
            <Button
              variant={"outline"}
              className="uppercase text-muted-foreground"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

Cart.Item = ({ item }: { item: CartItem }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { name, quantity, totalPrice } = item;
  const handleOnChange = (type: CartInputType) => {
    type === "plus" ? dispatch(plusQuantity(item.pizzaId)) : dispatch(minusQuantity(item.pizzaId));
  };

  return (
    <>
      <div className="flex items-start md:items-center w-full border-b py-4 md:flex-row flex-col space-y-6 md:space-y-0">
        <div className="flex flex-col md:text-left">
          <p className="">
            {quantity}x {name}
          </p>
        </div>

        <div className="flex items-center justify-between md:w-full">
          <div className="font-semibold ml-auto mr-6">{formatCurrency(totalPrice)}</div>

          <div className="flex items-center justify-end min-w-[200px] space-x-4">
            <Cart.QuintityInput value={quantity} onChange={handleOnChange} />
            <Button
              variant={"outline"}
              className="uppercase font-bold text-muted-foreground"
              onClick={() => dispatch(deleteItem(item.pizzaId))}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

Cart.QuintityInput = ({
  onChange,
  value,
}: {
  onChange?: (type: CartInputType) => void;
  value: number;
}) => {
  const handleOnchange = (type: "plus" | "minus") => {
    if (type === "plus") {
      onChange?.("plus");
    } else {
      onChange?.("minus");
    }
  };
  return (
    <div className="flex flex-row items-center">
      <Button
        disabled={!value}
        size="icon"
        className={`uppercase rounded-full ${!value ? "pointer-events-none" : ""}`}
        onClick={() => handleOnchange("minus")}
      >
        -
      </Button>
      <div className="mx-2 min-w-8">{value}</div>
      <Button size="icon" className="uppercase rounded-full" onClick={() => handleOnchange("plus")}>
        +
      </Button>
    </div>
  );
};

export default Cart;
