import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const HomePage = () => {
  return (
    <div className='flex flex-1 grow justify-center items-center'>
      <div className="flex flex-col items-center md:pb-72 lg:pb-80">
        <h1 className='text-3xl font-display tracking-widest'>The best pizza.</h1>
        <div className='text-4xl mt-4 text-primary font-semibold text-primary'>Straight out the oven, straight to you.</div>
        <div className='text-lg mt-6'>
          Welcome!, Please start by telling us your name:
        </div>
        <Input className='ring-2 ring-primary max-w-[400px] w-full mt-5' />
        <Button className='mt-8'>Order Now</Button>
      </div>
    </div>
  )
}

export default HomePage