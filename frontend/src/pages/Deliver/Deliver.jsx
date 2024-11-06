import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Deliver.css';

const Deliver = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/order/list`, {
          headers: { token },
        });
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [url, token]);

  const handleDeliver = async (orderId) => {
    try {
      await axios.post(`${url}/api/order/deliver`, {
        orderId,
      });
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {orderId,status: event.target.value,});
    if (response.data.success) {await fetchAllOrders();}};

  return (
    <div className="deliver-page">
      <h2>Deliver Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
              <p>
                <b>Customer:</b> {order.address.firstName} {order.address.lastName}
              </p>
                <p>
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <select className='order-status' onChange={(event)=>statusHandler(event,order._id)}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <button onClick={() => handleDeliver(order._id)}>
                  Deliver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const handleStatusChange = async (event, orderId) => {
  try {
    await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, status: event.target.value } : order
    );
    setOrders(updatedOrders);
  } catch (error) {
    console.error(error);
  }
};

export default Deliver;