import { Button } from "@/components/ui/button"
import { Link } from "react-router"

const Cart = () => {
  return (
    <>
      <Link to="/" className="text-blue-500 underline mb-4">Back to Home</Link>
      <div className="flex flex-col items-center text-center space-y-4">
        {
          Array.from({ length: 5 }).map((_, index) => (<Cart.Item key={index} />))
        }
      </div>
    </>
  )
}

Cart.Item = () => {
  return (
    <div className="group flex w-full">
      <div className="max-w-[150px] grow">
        <img src="https://ui-avatars.com/api/?name=React+Pizza" alt="Pizza" className='w-full' />
      </div>
      <div className="flex flex-col text-left ml-4">
        <h3 className="text-xl font-bold">Margherita</h3>
        <p className="">Tomato sauce, mozzarella, fresh basil</p>
        <div className="mt-auto italic font-semibold">$9.99</div>
      </div>
      <div className="flex ml-auto items-center justify-end min-w-[200px] space-x-4">
        <Button variant={"destructive"} className='uppercase hidden group-hover:block'>test</Button>
        <Button className='uppercase font-bold'>Add to cart</Button>
      </div>
    </div>
  )
}


export default Cart