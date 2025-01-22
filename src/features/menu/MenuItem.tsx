import { Button } from '@/components/ui/button'

const MenuItem = () => {
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
        <Button className='uppercase'>Add to cart</Button>
      </div>
    </div>
  )
}

export default MenuItem