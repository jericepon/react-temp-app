import { ModalContext, ModalObjectType } from '@/hooks/useModal'
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

Modal.Provider = ({ children }: { children: React.ReactNode }) => {
  const [modalList, setModalList] = React.useState<ModalObjectType[]>([])

  const openModal = (obj: ModalObjectType) => {
    setModalList((prev) => [...prev, { ...obj, open: true, UID: Date.now().toString() }])
  }

  const handleOnClose = (UID: string) => {
    setModalList((prev) => prev.filter((modal) => modal.UID !== UID))
  }

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" style={{ display: modalList.length ? 'flex' : 'none' }}>
        {
          modalList.map((modal) => (
            <Modal key={modal.UID} onClose={() => handleOnClose(modal.UID ?? '')} {...modal} />
          ))
        }
      </div>
    </ModalContext.Provider>
  )
}

export default Modal