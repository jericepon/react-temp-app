import NavBar from '@/components/NavBar';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  return (
    <>
      <NavBar />
      <main><Outlet /></main>
      <footer>
        <p>&copy; {(new Date()).getFullYear()}</p>
      </footer>
    </>
  )
}

export default DefaultLayout