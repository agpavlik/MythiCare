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
            <h2>Create profile depending on your porposes</h2>
            <div className="user-box">
              <div className="create-profile">
                <h3> Pet Owner Profile </h3>
              </div>
              <Link to={"/SitterForm"}>
              <div className="create-profile">
                <h3> Pet Sitter Profile </h3>
              </div>
              </Link>
            </div>
            <button onClick={() => logout()} className='btn btn-primary'>
              Logout
            </button>
        </div>
      </Layout>
    </div>
  )
}

export default User;