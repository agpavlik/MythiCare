import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import "../styles/navbar.css";
import { unauthenticateUser } from '../redux/slices/authSlice'


const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }


  return (
    <nav className='navbar'>
      <div className='container'>
        <div>
          <NavLink to='/'>
            <span className='navbar-brand'>MythiCare</span>
          </NavLink>
        </div>

        {isAuth ? (
          <div>
            <NavLink to='/user' className='mx-3'>
              <span>My Main Profile</span>
            </NavLink>

            <NavLink to='/sitter-profile' className='mx-3'>
              <span>My Sitter Profile</span>
            </NavLink>

            <NavLink to='/sitters' className='mx-3'>
              <span>Find a sitter</span>
            </NavLink>

            <NavLink to='/' className='mx-3' onClick={() => logout()}>
              <span>Logout</span>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to='/sitters' className='mx-3'>
              <span>Find a sitter</span>
            </NavLink>

            <NavLink to='/login' className='mx-3'>
              <span>Login</span>
            </NavLink>

            <NavLink to='/register' className='mx-3'>
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar