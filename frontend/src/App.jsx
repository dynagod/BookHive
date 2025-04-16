
import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import Loading from './components/Loading'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; 
  }


  return (
    <>
            <Navbar />
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
          <Outlet />
        </main>
        <Footer />
      
    </>
  )
}

export default App