import React from 'react'
import { Outlet ,useLocation} from 'react-router';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Sidebar from './Components/Sidebar';
import Weather from './Components/Weather';



const App = () => {
  const location=useLocation();
  const noSidebarRoutes=["/login"]
  return (
    <>
  <ToastContainer />
  <div className={`${!noSidebarRoutes.includes(location.pathname) ? "flex":""} bg-gray-100`}>
  {!noSidebarRoutes.includes(location.pathname) && <Sidebar/>}
    {/* Main Content */}
    <main className="">
        <Outlet />
      </main>
  </div>
</>

  )
}
export default App;