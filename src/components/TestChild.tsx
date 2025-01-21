import { useModal } from '@/hooks/useModal'
import React from 'react'

const TestChild = () => {
  const { openModal } = useModal()

  const modalObject = {
    children: <TestChild />,
  }
  return (
    <div>
      TestChild
      <button className="bg-black text-white p-4 rounded rounded-lg" onClick={() => openModal(modalObject)}>Open the child modal</button>
    </div>
  )
}

export default TestChild