import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'
import "../styles/user.css";
import {Link} from "react-router-dom";


const User = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <div className="user-main">
          <div className="user-info">
            <h4>User info</h4>
            <div className="user-detailes">
              <h5>First Name</h5>
            </div>
            <div className="user-detailes">
              <h5>Last Name</h5>
            </div>
            <div className="user-detailes">
              <h5>Phone</h5>
            </div>
            <div className="user-detailes">
              <h5>Email</h5>
            </div>
          </div>
          <div className = "user-pets">
            <h4>Your pets profiles</h4>
          </div>
          <div className="user-box">
            <h4 id="create-profile-text">Create profile depending on your porposes</h4>
            <Link to={"/PetForm"} className="user-link">
              <div className="create-profile">
                <h5> Create Pet Profile </h5>
              </div>
            </Link>
            <Link to={"/SitterForm"} className="user-link">
              <div className="create-profile">
                <h5> Create Pet Sitter Profile </h5>
              </div>
            </Link>
          </div>
            {/* <button onClick={() => logout()} className='btn btn-primary'>
              Logout
            </button> */}
        </div>
      </Layout>
    </div>
  )
}

export default User;