import API from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActionFunction, ActionFunctionArgs, Form, redirect } from "react-router";

const CreateOrder = () => {
  return (
    <>
      <Form className="page-inner space-y-6" method="POST">
        <h1 className="page-title">Ready to order? Let's go!</h1>
        <div className="flex items-center">
          <div className="min-w-44">First Name</div>
          <Input id="name" name="name" className="max-w-xl rounded-full" required />
        </div>
        <div className="flex items-center">
          <div className="min-w-44">Phone number</div>
          <Input id="phone" name="phone" className="max-w-xl rounded-full" required />
        </div>
        <div className="flex items-center relative">
          <div className="min-w-44">Address</div>
          <Input id="address" name="address" className="max-w-2xl rounded-full" required />
          <Button
            size={"sm"}
            className="rounded-full uppercase absolute max-w-[125px] max-h-[32px] m-auto mr-1 top-0 bottom-0 right-0"
          >
            Get location
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <input id="priority" type="checkbox" name="priority" />
          <label htmlFor="priority" className="text-sm cursor-pointer">
            Make your order a priority?
          </label>
        </div>
        <Button className="mt-4 rounded-full uppercase font-bold">
          {/* <span>Order now from ₱500</span> */}
          <span>Placing order...</span>
        </Button>
      </Form>
    </>
  );
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { ...rest } = Object.fromEntries(formData);

  const order = {
    ...rest,
    customer: "Jeric",
    priority: rest.priority === "on",
    cart: [
      {
        addIngredients: [],
        removeIngredients: [],
        pizzaId: 1,
        name: "Margherita",
        quantity: 2,
        unitPrice: 12,
        totalPrice: 24,
      },
      {
        addIngredients: [],
        removeIngredients: [],
        pizzaId: 4,
        name: "Prosciutto e Rucola",
        quantity: 3,
        unitPrice: 16,
        totalPrice: 48,
      },
      {
        addIngredients: [],
        removeIngredients: [],
        pizzaId: 6,
        name: "Vegetale",
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
      },
      {
        addIngredients: [],
        removeIngredients: [],
        pizzaId: 7,
        name: "Napoli",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
      },
      {
        addIngredients: [],
        removeIngredients: [],
        pizzaId: 11,
        name: "Spinach and Mushroom",
        quantity: 2,
        unitPrice: 15,
        totalPrice: 30,
      },
    ],
  };

  const NewOrder = await API.post<{ data: { id: number } }>("/order", order);

  return redirect(`/order/${NewOrder.data.data.id}`); // Redirect to the newly created order
};

export default CreateOrder;
