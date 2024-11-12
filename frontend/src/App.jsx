import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import Deliver from './pages/Deliver/Deliver'
import Account from './pages/Account/Account';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Parcel from './pages/Parcel/Parcel'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/deliver' element={<Deliver/>}/>
          <Route path='/account' element={<Account />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path='/parcel' element={<Parcel/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App