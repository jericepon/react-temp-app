import React from 'react'

type ModalPropType = {
  children?: React.ReactNode,
  onClose?: (uid: string) => void,
  UID?: string,
  open?: boolean
}

const Modal = ({ ...rest }: ModalPropType) => {
  const { children, onClose, UID, open } = rest

  return (
    <div className="bg-white p-6 rounded shadow-lg fixed flex-col" style={{ display: open ? 'flex' : 'none' }}>
      <h2 className="text-xl font-bold mb-4">{UID}</h2>
      <p className="mb-4">This is modal UID: {UID}</p>
      <div className="grow">
        {children}
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => onClose && onClose(UID ?? '')}>Close modal UID: {UID}</button>
    </div>
  )
}

export default Modal