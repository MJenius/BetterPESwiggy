// frontend/src/pages/PlaceOrder/PlaceOrder.jsx

import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    destination:"",
    additionalInformation:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (req, res) => {
    try {
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
      });
      await newOrder.save();
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
      res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error placing order" });
    }
  };

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0) {
      navigate('/cart')
    }
  })

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Order Details</p>
        <input required name='destination' onChange={onChangeHandler} value={data.destination} type='text' placeholder='Destination'/>
        <input required name='additionalInformation' onChange={onChangeHandler} value={data.additionalInformation} type='text' placeholder='Additional Information'/>
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div className='cart-total-details'>
              <p>Delivery Fee:</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total:</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            <button type='submit'>PLACE ORDER</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder