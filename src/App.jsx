import React from 'react'
import { Outlet ,useLocation} from 'react-router';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Sidebar from './Components/Sidebar';



const App = () => {
  const location=useLocation();
  // const noSRoutes=["/login", "/signup"]
  return (
    <>
      <ToastContainer />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 py-3 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </>
  )
}
export default App;