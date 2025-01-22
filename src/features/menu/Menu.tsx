import { Button } from '@/components/ui/button'
import React from 'react'
import MenuItem from './MenuItem'

const Menu = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      {
        Array.from({ length: 5 }).map((_, index) => (<MenuItem key={index} />))
      }
    </div>
  )
}

export default Menu