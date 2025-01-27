import API from "@/api";
import { Button } from "@/components/ui/button";
import { useLoadingDots } from "@/hooks/UseDots";
import { calcMinutesLeft, formatCurrency } from "@/lib/helpers";
import { OrderCartItem, Order as OrderData } from "@/types/order";
import { useState } from "react";
import {
  ActionFunction,
  ActionFunctionArgs,
  Form,
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router";

const Order = () => {
  const { orderId } = useParams();
  const order = useLoaderData();
  const { data } = order;
  const orderData: OrderData = data;
  const [isPriority, setIsPriority] = useState(orderData.priority);
  const dot = useLoadingDots();

  return (
    <>
      <div className="page-inner space-y-6">
        {/* Order header */}
        <div className="flex items-center">
          <h1 className="page-title">Order #{orderId}</h1>
          {/* Status */}
          <div className="flex ml-auto space-x-4">
            {orderData.priority && (
              <div className="rounded-full uppercase bg-destructive text-white px-4 py-1 text-xs align-middle">
                priority
              </div>
            )}
            {orderData.status === "delivered" ? (
              <div className="rounded-full flex uppercase bg-success px-4 py-1 text-xs align-middle">
                {orderData.status}
              </div>
            ) : (
              <div className="rounded-full flex uppercase bg-success px-4 py-1 text-xs align-middle min-w-[120px] animate-pulse">
                <div className="float-left">{orderData.status}</div>
                {dot}
              </div>
            )}
          </div>
        </div>
        {/* ETA */}
        <div className="flex p-4 bg-muted text-muted-foreground">
          <div className="font-lg font-bold">
            Order {calcMinutesLeft(orderData.estimatedDelivery)} minutes left
          </div>
          <div className="ml-auto">
            <div className="text-sm">
              (Estimated delivery:{" "}
              {new Date(orderData.estimatedDelivery).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
              )
            </div>
          </div>
        </div>

        {/* Order items */}
        <div className="block">
          {orderData.cart.map((orderItem, index) => (
            <Order.Item orderItem={orderItem} key={index} />
          ))}
        </div>
        {/* Total */}
        <div className="flex flex-col p-4 bg-muted text-muted-foreground">
          <div className="flex justify-between">
            <div className="font-lg">Price pizza:</div>
            <div>{formatCurrency(orderData.orderPrice)}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-lg">Price priority:</div>
            <div>{formatCurrency(orderData.priorityPrice)}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-lg font-bold">To pay on delivery:</div>
            <div className="font-bold">
              {formatCurrency(orderData.orderPrice + orderData.priorityPrice)}
            </div>
          </div>
        </div>
        {!orderData.priority && (
          <Form className="space-y-6" method="POST">
            <input type="hidden" name="order" value={JSON.stringify(orderData)} />
            <input type="hidden" name="orderId" value={orderId} />
            <input type="hidden" name="priority" value={isPriority.toString()} />
            <Button
              className="mt-4 rounded-full uppercase font-bold float-right"
              onClick={() => setIsPriority(true)}
            >
              <span>Make priority</span>
            </Button>
          </Form>
        )}
      </div>
    </>
  );
};

Order.Item = ({ orderItem }: { orderItem: OrderCartItem }) => {
  return (
    <div className="flex items-center w-full last:border-b border-t p-4">
      <div className="flex flex-col text-left">
        <p className="">
          {orderItem.quantity}x {orderItem.name}
        </p>
        <div className="text-sm">
          {orderItem.removeIngredients.map((ingredient, index) => (
            <span key={index}>{ingredient.name}</span>
          ))}
        </div>
      </div>

      <div className="font-semibold ml-auto">{formatCurrency(orderItem.totalPrice)}</div>
    </div>
  );
};

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const res = await API.get(`/order/${params.orderId}`).then((res) => res.data);
  return res;
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  const res = await API.post(`/order/${data.orderId}`, data.order).then((res) => res.data);
  return res;
};

export default Order;
