import { useUI } from "@/hooks/useUI"


const HomePage = () => {
  const { modal, toast } = useUI()

  return (
    <>
      <button onClick={() => modal.open({ children: <p>test</p> })}>Open modal</button>
      <br />
      <button onClick={() => toast.show({ type: 'success', title: 'Success', message: 'The quick brown fox' })}>Open toast</button>
      <div>HomePage</div>
    </>
  )
}

export default HomePage