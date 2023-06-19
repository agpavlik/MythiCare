import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  console.log("registration data:", registrationData);
  return await axios.post(
    'http://localhost:8080/api/register',
    registrationData
  )
  
}



export async function onLogin(loginData) {
  return await axios.post('http://localhost:8080/api/login', loginData)
}

export async function onLogout() {
  return await axios.get('http://localhost:8080/api/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8080/api/protected')
}