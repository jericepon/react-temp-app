import Modal from '@/components/Modal'
import Toast from '@/components/Toast'
import { useModal } from '@/hooks/useModal'
import { useToast } from '@/hooks/useToast'
import { UIContext } from '@/hooks/useUI'
import React from 'react'

type PropType = {
  children: React.ReactNode
}

const UIProvider = ({ children }: PropType) => {
  const modal = useModal()
  const toast = useToast()

  return (
    <UIContext.Provider value={{ modal, toast }}>
      {children}

      {/* Modals */}
      <div className="fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-50" style={{ display: modal.list.length ? 'flex' : 'none' }}>
        {
          modal.list.map((m) => (
            <Modal key={m.UID} onClose={() => modal.close(m.UID ?? '')} {...m} />
          ))
        }
      </div>

      {/* Toast */}
      <div className="fixed top-0 z-[100] max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] space-y-2" style={{ display: toast.list.length ? 'flex' : 'none' }}>
        {
          toast.list.map((t) => <Toast key={t.UID} UID={t.UID ?? ''} {...t} />)
        }
      </div>
    </UIContext.Provider >
  )
}

export default UIProvider