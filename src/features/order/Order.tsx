import API from "@/api";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helpers";
import { OrderCartItem, Order as OrderData } from "@/types/order";
import { LoaderFunction, LoaderFunctionArgs, useLoaderData, useParams } from "react-router";

const Order = () => {
  const { orderId } = useParams();
  const order = useLoaderData();
  const { data } = order;
  const orderData: OrderData = data;

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
            <div className="rounded-full uppercase bg-success px-4 py-1 text-xs align-middle">
              {orderData.status}
            </div>
          </div>
        </div>
        {/* ETA */}
        <div className="flex p-4 bg-muted text-muted-foreground">
          <div className="font-lg font-bold">Order 53 minutes left</div>
          <div className="ml-auto">
            <div className="text-sm">
              (Estimated delivery: May 31, 12:36 PM) {orderData.estimatedDelivery}
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
        <Button className="mt-4 rounded-full uppercase font-bold float-right">
          <span>Make priority</span>
          {/* <span>Placing order...</span> */}
        </Button>
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

export default Order;
