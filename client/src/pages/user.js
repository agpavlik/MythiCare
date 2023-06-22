import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'
import "../styles/user.css";
import {Link} from "react-router-dom";
import axios from 'axios'


const User = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user');
        const data = response.data.user[0];
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    };
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('/user/pets');
        const data = response.data.pets;
        setPets(data)
      } catch (error) {
        console.error('Error fetching pets:', error)
      }
    }
    fetchPets()
  }, [])

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
            {user && <>
            <img src={user.user_photo} alt={user.first_name} className="user-profile-photo"/>
            <div className="user-detailes">
              <h5>{user.first_name} {user.last_name}</h5>
              <h5>{user.email}</h5>
              <h5>{user.phone}</h5>
            </div>
            </>
            }
          </div>
          <div className = "user-pets">
              <h4>My pets</h4>
              {pets && pets.map(pet => {
                return <>
                  <Link to={`/PetProfile/${pet.pet_id}`} className="user-link">
                    <div className = "user-pet">
                      <img src={pet.pet_photo} alt={pet.name} className="user-pet-photo"/>
                      <h5>{pet.name}</h5>
                    </div>
                  </Link> 
                  </>
                })}
          </div>
          <div className="user-box">
            <h4 id="create-profile-text">Create profile depending on your purposes</h4>
            <Link to={"/PetForm"} className="user-link">
              <div className="create-profile">
                <h5> Add a pet </h5>
              </div>
            </Link>
            <Link to={"/SitterForm"} className="user-link">
              <div className="create-profile">
                <h5> Create Sitter Profile </h5>
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