import React from 'react'
import { Outlet ,useLocation} from 'react-router';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Sidebar from './Components/Sidebar';
import Weather from './Components/Weather';



const App = () => {
  const location=useLocation();
  // const noSRoutes=["/login", "/signup"]
  return (
    <>
  <ToastContainer />
  <div className="flex bg-gray-100">
    <Sidebar />
    {/* Main Content */}
    <main className="">
        <Outlet />
      </main>
  </div>
</>

  )
}
export default App;