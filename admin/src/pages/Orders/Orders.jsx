import React from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import {assets} from '../../assets/assets'

const Orders = ({url}) => {
  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  };

  const removeOrder = async (orderId) => {
    try {
      await axios.delete(`${url}/api/order/${orderId}`);
      fetchAllOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  } 

  useEffect(() => {
    fetchUserData();
  }, []);


  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt=''/>
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if (index===order.items.length-1) {
                    return item.name + " x " + item.quantity;
                  }
                  else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <div className='order-item-address'>
                <p>Destination: {order.address.destination}</p>
              </div>
              <p>Additional Information: {order.address.additionalInformation}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <div className='order-item-remove'>
              <button className='order-item-button' onClick={() => removeOrder(order._id)}>Delete Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
