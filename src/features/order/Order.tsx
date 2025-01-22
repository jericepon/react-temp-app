import { useParams } from "react-router";

const Order = () => {
  const { orderId } = useParams();
  return (
    <div>Order #{orderId}</div>
  )
}

Order.Item = () => {
  return (
    <div>Order Item</div>
  )
}

export default Order