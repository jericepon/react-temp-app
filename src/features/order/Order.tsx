import { useParams } from "react-router";

const Order = () => {
  const { orderId } = useParams();
  return (
    <>
      <div className="page-inner space-y-6">
        {/* Order header */}
        <div className="flex items-center">
          <h1 className="page-title">Order #{orderId}</h1>
          <div className="flex ml-auto space-x-4">
            <div className="rounded-full uppercase bg-destructive text-white px-4 py-1 text-xs align-middle">
              priority
            </div>
            <div className="rounded-full uppercase bg-success px-4 py-1 text-xs align-middle">
              preparing order
            </div>
          </div>
        </div>
        {/* ETA */}
        <div className="flex p-4 bg-muted text-muted-foreground">
          <div className="font-lg font-bold">Order 53 minutes left</div>
          <div className="ml-auto">
            <div className="text-sm">(Estimated delivery: May 31, 12:36 PM)</div>
          </div>
        </div>
        {/* Order items */}
        <div className="block">
          {Array.from({ length: 5 }).map((_, index) => (
            <Order.Item key={index} />
          ))}
        </div>
        {/* Total */}
        <div className="flex flex-col p-4 bg-muted text-muted-foreground">
          <div className="flex justify-between">
            <div className="font-lg">Price pizza:</div>
            <div>₱49.95</div>
          </div>
          <div className="flex justify-between">
            <div className="font-lg">Price priority:</div>
            <div>₱49.95</div>
          </div>
          <div className="flex justify-between">
            <div className="font-lg font-bold">To pay on delivery:</div>
            <div className="font-bold">₱49.95</div>
          </div>
        </div>
      </div>
    </>
  );
};

Order.Item = () => {
  return (
    <div className="flex items-center w-full last:border-b border-t p-4">
      <div className="flex flex-col text-left">
        <p className="">[n]x Margherita</p>
        <div className="text-sm">Tomato sauce, mozzarella, fresh basil</div>
      </div>

      <div className="font-semibold ml-auto">₱9.99</div>
    </div>
  );
};

export default Order;
