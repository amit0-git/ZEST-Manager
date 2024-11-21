import './App.css'
import { Outlet } from 'react-router-dom'
import NavigationBar from "./components/navbar.jsx"

function App() {




  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}

export default App
