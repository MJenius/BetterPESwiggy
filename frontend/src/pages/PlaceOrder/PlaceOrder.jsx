import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);
  const [data, setData] = useState({ destination: "", additionalInformation: "" });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    try {
      const items = food_list.filter((item) => cartItems[item._id] > 0).map((item) => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id]
      }));
      const amount = getTotalCartAmount() + 2; // Including delivery fee
      const address = { destination: data.destination, additionalInformation: data.additionalInformation };

      const response = await axios.post(`${url}/api/order/place`, { items, amount, address }, {
        headers: { token: token } // Pass token as 'token' in headers
      });

      if (response.data.success) {
        // Clear the cart after successfully placing the order
        setCartItems({});
        navigate('/myorders');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Order Details</p>
        <input required name='destination' onChange={onChangeHandler} value={data.destination} type='text' placeholder='Destination' />
        <input required name='additionalInformation' onChange={onChangeHandler} value={data.additionalInformation} type='text' placeholder='Additional Information' />
      </div>
      <div className='place-order-right'>
      <div className='cart-total'>
  <h2>Cart Totals</h2>
  {Object.keys(cartItems).map((itemId) => {
    const itemInfo = food_list.find((product) => product._id === itemId);
if (itemInfo) {
  return (
    <div key={itemId} className='cart-total-details'>
      <p>{itemInfo.name} x {cartItems[itemId]}</p>
      <p>Rs.{itemInfo.price * cartItems[itemId]}</p>
    </div>
  );
} else {
  return null; // or some other default value
}
  })}
  <div className='cart-total-details'>
    <p>Subtotal:</p>
    <p>Rs.{getTotalCartAmount()}</p>
  </div>
  <hr />
  <div className='cart-total-details'>
    <p>Delivery Fee:</p>
    <p>Rs.{getTotalCartAmount() === 0 ? 0 : 2}</p>
  </div>
  <div className='cart-total-details'>
    <b>Total:</b>
    <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
  </div>
  <button type='submit'>PLACE ORDER</button>
</div>
      </div>
    </form>
  );
};

export default PlaceOrder;