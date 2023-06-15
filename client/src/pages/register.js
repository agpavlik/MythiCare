import { useState } from 'react'
import { onRegistration } from '../api/auth'
import Layout from '../components/layout'

const Register = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    phone: "",
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ first_name: '', last_name: '', phone: '', email: '', password: '' })
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Register</h1>

        <div className='mb-3'>
          <label htmlFor='first_name' className='form-label'>
            First Name
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='first_name'
            name='first_name'
            value={values.first_name}
            placeholder='Enter your First Name'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='last_name' className='form-label'>
            Last Name
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='last_name'
            name='last_name'
            value={values.last_name}
            placeholder='Enter your Last Name'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='phone' className='form-label'>
            Phone
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='phone'
            className='form-control'
            id='phone'
            name='phone'
            value={values.phone}
            placeholder=''
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='youremail@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='password'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Layout>
  )
}

export default Register