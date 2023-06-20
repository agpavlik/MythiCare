import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import axios from 'axios';

import "./App.css";
import { useSelector } from 'react-redux'
import React, {useState, useEffect} from 'react';
import User from './pages/user'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import About from './pages/about'
import AllSitters from './pages/allsitters'
import PetForm from './components/PetForm'
import PetProfile from './components/PetProfile'
import SitterForm from './components/SitterForm'
import SittersPage from './components/SittersPage';


//import {petSitters} from '.'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)
  return <>{!isAuth ? <Outlet /> : <Navigate to='/user' />}</>
}

function App() {

  const [sitters, setSitters] = useState();
  const [owners, setOwners] = useState();


  useEffect(() => {

    const fetchSitters = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sitters');
        const data = response.data.sitters
        setSitters(data);
      } catch (error) {
        console.error('Error fetching sitters:', error);
      }
    };

    // const fetchOwners = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8080/owners');
    //     const data = response;
    //     setOwners(data)
    //   } catch (error) {
    //     console.error('Error fetching owners:', error);
    //   }
    // }
    // fetchOwners();
    fetchSitters();
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sitters' element={<AllSitters sitters={sitters}/>} />
        <Route path='/sitter/:id' element={<SittersPage/>} />
        <Route path='/about' element={<About />} />
        <Route path='/petform' element={<PetForm />} />
        <Route path='/petprofile/:id' element={<PetProfile />} />
        <Route path='/sitterform' element={<SitterForm />} />


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

export default App;



