import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const CreateOrder = () => {
  return (
    <>
      <form className="mt-6 mx-auto max-w-3xl space-y-6">
        <h1 className="text-xl font-bold">Ready to order? Let's go!</h1>
        <div className="flex items-center">
          <div className="min-w-44">
            First Name
          </div>
          <Input id="name" name="name" className="max-w-xl rounded-full" required />
        </div>
        <div className="flex items-center">
          <div className="min-w-44">
            Phone number
          </div>
          <Input id="name" name="name" className="max-w-xl rounded-full" required />
        </div>
        <div className="flex items-center relative">
          <div className="min-w-44">
            Address
          </div>
          <Input id="name" name="name" className="max-w-2xl rounded-full" required />
          <Button size={"sm"} className="rounded-full uppercase absolute max-w-[125px] max-h-[32px] m-auto mr-1 top-0 bottom-0 right-0">
            Get location
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Checkbox id="priority" className="rounded-none" />
          <label
            htmlFor="priority"
            className="text-sm cursor-pointer"
          >
            Make your order a priority?
          </label>
        </div>
        <Button className="mt-4 rounded-full uppercase font-bold">
          Order now from ₱500
        </Button>
      </form>
    </>
  )
}

export default CreateOrder