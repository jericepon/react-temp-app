import Pizza from '../assets/pizza.svg'
import { Input } from './ui/input'
import { ModeToggle } from './ui/mode-toggle'
const NavBar = () => {
  return (
    <header color='primary' className="border bg-primary border-none rounded-none">
      <nav className="flex justify-between items-center p-4">
        <div className="flex bg-primary text-primary-foreground items-center text-2xl">
          <img src={Pizza} className='w-[40px]' />
          <div className='ml-2 tracking-wider font-semibold hidden md:block'>React Pizza Co.</div>
        </div>
        <Input placeholder='Search order #' className='bg-yellow-300 text-primary-foreground border-none ring-0 focus-visible:ring-transparent max-w-[400px]' />
        <ModeToggle />
      </nav>
    </header>
  )
}

export default NavBar