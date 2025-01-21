import { useEffect, useState } from "react"

export type ToastItem = {
  UID?: string,
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message: string,
}

export interface UseToast {
  list: ToastItem[];
  show: (obj: ToastItem) => void;
  close: (UID: string) => void;
}

export const useToast = () => {
  const [list, setList] = useState<ToastItem[]>([])

  const show = (obj: ToastItem) => {
    console.log(obj);

    setList((prev) => [...prev, { ...obj, UID: Date.now().toString() }])
  }

  const close = (UID: string) => {
    setList((prev) => prev.filter((toast) => toast.UID !== UID))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setList((prev) => prev.slice(1))
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [list])

  return { list, show, close }
}
