import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route,RouterProvider,createRoutesFromElements } from 'react-router'
import {createBrowserRouter} from 'react-router-dom'


import Login from './Pages/Login.jsx'
import AllTasks from './Pages/AllTasks.jsx'
import Completed from './Pages/Completed.jsx'
import Important from './Pages/Important.jsx'
import Todo from './Pages/Todo.jsx'

// import AddTask from './Components/AddTask.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/all-tasks' element={<AllTasks/>}/>
      <Route path='/completed' element={<Completed/>}/>
      <Route path='/important' element={<Important/>}/>
      <Route path='/to-do' element={<Todo/>}/>




    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
