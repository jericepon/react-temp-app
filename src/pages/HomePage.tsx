import { useModal } from '@/hooks/useModal'
import React from 'react'

const HomePage = () => {
  const { openModal } = useModal()
  return (
    <>
      <div>HomePage</div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => openModal({ children: <p>Test content</p> })}>Open the parent modal</button>
    </>
  )
}

export default HomePage