import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Cart = () => {
  return (
    <div className="page-inner">
      {/* Back link */}
      <Link to="/menu" className="text-blue-500 mb-4">
        &larr; Back to Menu
      </Link>
      <div className="flex flex-col items-center text-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Cart.Item key={index} />
        ))}
      </div>
      {/* Order action buttons */}
      <div className="flex space-x-4 mt-6">
        <Button className="uppercase font-bold">Order Pizzas</Button>
        <Button variant={"outline"} className="uppercase text-muted-foreground">
          Clear cart
        </Button>
      </div>
    </div>
  );
};

Cart.Item = () => {
  return (
    <>
      <div className="flex items-center w-full border-b py-4">
        <div className="flex flex-col text-left">
          <p className="">[n]x Margherita</p>
        </div>

        <div className="font-semibold ml-auto mr-6">$9.99</div>

        <div className="flex items-center justify-end min-w-[200px] space-x-4">
          <Cart.QuintityInput />
          <Button variant={"outline"} className="uppercase font-bold text-muted-foreground">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

Cart.QuintityInput = ({ onChange }: { onChange?: (value: number) => void }) => {
  const handleOnchange = (type: "plus" | "minus") => {
    if (type === "plus") {
      console.log("plus");
    } else {
      console.log("minus");
    }
  };
  return (
    <div className="flex flex-row items-center">
      <Button
        size="icon"
        className="uppercase rounded-full"
        onClick={() => handleOnchange("minus")}
      >
        -
      </Button>
      <div className="mx-2 min-w-8">[n]</div>
      <Button size="icon" className="uppercase rounded-full" onClick={() => handleOnchange("plus")}>
        +
      </Button>
    </div>
  );
};

export default Cart;
