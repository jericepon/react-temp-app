import API from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validatePhone } from "@/lib/helpers";
import { RootState, rootStore } from "@/store";
import { clearCart } from "@/store/features/cart";
import { useSelector } from "react-redux";
import {
  ActionFunction,
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";

const CreateOrder = () => {
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const { list } = useSelector((state: RootState) => state.cart);
  const { username } = useSelector((state: RootState) => state.user);
  return (
    <>
      <Form className="page-inner space-y-6" method="POST">
        <h1 className="page-title">Ready to order? Let's go!</h1>
        <div className="flex items-center justify-between">
          <div className="min-w-44">First Name</div>
          <Input
            id="name"
            name="name"
            className="max-w-xl rounded-full"
            value={username}
            disabled
          />
        </div>
        <div className="flex items-center justify-between relative">
          <div className="min-w-44">Phone number</div>
          <Input
            type="tel"
            id="phone"
            name="phone"
            className={`max-w-xl rounded-full after: ${
              formErrors?.errors.phone && "border-destructive bg-destructive-foreground"
            }`}
            required
          />
          {formErrors?.errors && (
            <div className="text-red-500 text-sm absolute -bottom-5 right-0">
              {formErrors?.errors.phone}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between relative">
          <div className="min-w-44">Address</div>
          <Input id="address" name="address" className="max-w-xl rounded-full" required />
          <Button
            size={"sm"}
            className="rounded-full uppercase absolute max-w-[125px] max-h-[32px] m-auto mr-1 top-0 bottom-0 right-0"
          >
            Get location
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <input type="hidden" name="cart" value={JSON.stringify(list)} />
          <input id="priority" type="checkbox" name="priority" />
          <label htmlFor="priority" className="text-sm cursor-pointer">
            Make your order a priority?
          </label>
        </div>
        <Button disabled={isSubmitting} className="mt-4 rounded-full uppercase font-bold">
          {/* <span>Order now from ₱500</span> */}
          {isSubmitting ? <span>Placing order...</span> : <span>Place order</span>}
        </Button>
      </Form>
    </>
  );
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { ...rest } = Object.fromEntries(formData);
  const errors: Record<string, string> = {};

  const order = {
    ...rest,
    customer: "Jeric",
    priority: rest.priority === "on",
    cart: JSON.parse(rest.cart as string),
  };

  if (!validatePhone(rest.phone as string)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (Object.keys(errors).length) {
    return { errors };
  }

  const NewOrder = await API.post<{ data: { id: number } }>("/order", order);
  rootStore.dispatch(clearCart()); // Clear the cart
  return redirect(`/order/${NewOrder.data.data.id}`); // Redirect to the newly created order
};

export default CreateOrder;
