import Navbar from './navbar'

const Layout = ({ children, bookingRequests }) => {
  return (
    <div>
      <Navbar bookingRequests={bookingRequests}/>
      <div className='container'>{children}</div>
    </div>
  )
}

export default Layout