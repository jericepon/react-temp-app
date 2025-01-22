import NavBar from '@/components/NavBar';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <main className='flex grow pt-[72px]'>
        <div className="container p-4">
          <Outlet />
        </div>
      </main>
      {/* <footer className='bg-primary text-primary-foreground p-4 text-center mt-auto'>
        <p>&copy; {(new Date()).getFullYear()}</p>
      </footer> */}
    </div>
  )
}

export default DefaultLayout