import API from "@/api";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store";
import { addItem } from "@/store/features/cart";
import { MenuItem } from "@/types/menu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router";
import Cart from "../cart/Cart";

const Menu = () => {
  const menu = useLoaderData();
  const { data } = menu;
  const menuItems: MenuItem[] = data;

  return (
    <div className="page-inner flex flex-col items-center text-center">
      {menuItems.map((menuItem) => (
        <Menu.Item key={menuItem.id} pizza={menuItem} />
      ))}
    </div>
  );
};

Menu.Item = ({ pizza }: { pizza: MenuItem }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [pizzaQty, setPizzaQty] = useState(0);
  const { name, ingredients, imageUrl, soldOut, unitPrice } = pizza;
  const handleOnChange = (type: string) => {
    setPizzaQty(type === "plus" ? pizzaQty + 1 : pizzaQty - 1);
  };
  return (
    <div
      className={`group flex flex-wrap sm:flex-nowrap w-full border-b py-2 first:pt-0 ${
        soldOut ? "filter grayscale" : ""
      }`}
    >
      <div className="max-w-[70px] sm:max-w-[100px] grow">
        <img src={imageUrl} alt="Pizza" className="w-full" />
      </div>
      <div className="flex flex-col text-left ml-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="text-sm max-w-64">
          {ingredients.map((i, index) => (
            <div className="mr-4 inline-block" key={index}>
              {i}
            </div>
          ))}
        </div>
        <div className="mt-auto font-semibold text-muted-foreground">
          {
            // Show sold out badge
            soldOut ? (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full uppercase">
                Sold out
              </span>
            ) : (
              <span>${unitPrice}</span>
            )
          }
        </div>
      </div>
      <div
        className={`flex sm:ml-auto items-center justify-between w-full sm:justify-end min-w-[200px] space-x-4 mt-4 sm:mt-0 ${
          soldOut ? "hidden" : ""
        }`}
      >
        <div className="md:hidden md:group-hover:block">
          <Cart.QuintityInput value={pizzaQty} onChange={handleOnChange} />
        </div>
        <Button
          disabled={!pizzaQty}
          className="uppercase font-bold"
          onClick={() => dispatch(addItem({ ...pizza, pizzaId: pizza.id, quantity: pizzaQty }))}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export async function loader() {
  const res = await API.get("/menu").then((res) => res.data);
  return res;
}

export default Menu;
