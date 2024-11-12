import { useState } from 'react'

import './App.css'
import UserLogin from "./components/auth/userLogin.jsx"
import UserSignup from "./components/auth/userSignup.jsx"
import StudentRegister from "./components/user/studentRegister.jsx"

import SoloEvents from './components/user/individualEvent.jsx'
import UserProfile from './components/user/profile.jsx'

import TeamEvent from "./components/user/teamEvent.jsx"
import ParticipationSummary from './components/user/participationDash.jsx'
import Invitation from "./components/user/invitation.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: <UserLogin />,
  },
  {
    path: '/signup',
    element: <UserSignup />,
  },
  {
    path:'/studentRegister',
    element:<StudentRegister/>
  }
  ,
  {
    path:'/teamEvent',
    element:<TeamEvent/>
  }
  ,
  {
    path:'/individualEvent',
    element:<SoloEvents/>
  },
  ,{
    path:"/profile",
    element:<UserProfile/>
  },{
    path:"/participation",
    element:<ParticipationSummary/>
  }
  ,{
    path:"/invitation",
    element:<Invitation/>
  }
  ])

    
  return (
    <>
      
      <RouterProvider router={router}/>
    </>
  )
}

export default App
