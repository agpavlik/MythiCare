import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import "./App.css";
import { useSelector } from 'react-redux'
import User from './pages/user'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import About from './pages/about'
import Sitters from './pages/sitters'
import PetForm from './components/PetForm'
import PetProfile from './components/PetProfile'
import SitterForm from './components/SitterForm'


//import {petSitters} from '.'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)
  return <>{!isAuth ? <Outlet /> : <Navigate to='/user' />}</>
}



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sitters' element={<Sitters />} />
        <Route path='/about' element={<About />} />
        <Route path='/petform' element={<PetForm />} />
        <Route path='/petprofile' element={<PetProfile />} />


        <Route element={<PrivateRoutes />}>
          <Route path='/user' element={<User />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

