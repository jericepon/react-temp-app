import Pizza from '../assets/pizza.svg'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { ModeToggle } from './ui/mode-toggle'
const NavBar = () => {
  return (
    <Card color='primary' className="bg-primary border-none rounded-none">
      <nav className="flex justify-between items-center p-4">
        <div className="flex bg-primary items-center text-2xl">
          <img src={Pizza} className='w-[40px]' />
          <div className='ml-2 tracking-wider text-yellow-950 font-semibold'>React Pizza Co.</div>
        </div>
        <Input className='bg-yellow-300 border-none ring-0 focus-visible:ring-transparent max-w-[400px] text-yellow-950' />
        <ModeToggle />
      </nav>
    </Card>
  )
}

export default NavBar