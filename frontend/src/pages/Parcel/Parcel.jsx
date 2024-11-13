import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Parcel.css'

const Parcel = () => {
  const { token, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [parcelData, setParcelData] = useState({
    item: '',
    pickupLocation: '',
    destination: '',
    additionalDetails: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setParcelData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const recipientName = document.getElementById('recipient-name').value;
      const pickupLocation = document.getElementById('pickup-location').value;
      const dropoffLocation = document.getElementById('dropoff-location').value;
      const itemDescription = document.getElementById('item-description').value;
      const additionalInstructions = document.getElementById('additional-instructions').value;
      const price = document.getElementById('price').value;
  
      const orderData = {
        name: 'Parcel',
        price: parseInt(price),
        pickupLocation,
        dropoffLocation,
        additionalDetails: itemDescription + ', ' + additionalInstructions,
      };
  
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token: token },
      });
  
      if (response.data.success) {
        navigate('/myorders');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  const handleParcelDelivery = async (event) => {
    event.preventDefault();
    try {
      const pickupLocation = document.getElementById('pickup-location').value;
      const dropoffLocation = document.getElementById('dropoff-location').value;
      const itemDescription = document.getElementById('item-description').value;
      const additionalInstructions = document.getElementById('additional-instructions').value;
      const price = document.getElementById('price').value;
  
      const parcelData = {
        name: 'Parcel',
        price: parseInt(price),
        pickupLocation,
        dropoffLocation,
        additionalDetails: itemDescription + ', ' + additionalInstructions,
      };
  
      const response = await axios.post(`${url}/api/parcel/deliver`, parcelData, {
        headers: { token: token },
      });
  
      if (response.data.success) {
        navigate('/myorders');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error placing parcel delivery', error);
    }
  };

  return (
<div class="parcel-page">
    <h2>Parcel Details</h2>
    <p>Please fill out the form below to provide details about your parcel.</p>
    <div class="form-group">
        <label for="recipient-name">Recipient Name</label>
        <input type="text" id="recipient-name" placeholder="Enter recipient's name" />
    </div>

    <div class="form-group">
        <label for="pickup-location">Pickup Location</label>
        <textarea id="pickup-location" placeholder="Enter pickup location"></textarea>
    </div>

    <div class="form-group">
        <label for="dropoff-location">Dropoff Location</label>
        <textarea id="dropoff-location" placeholder="Enter dropoff location"></textarea>
    </div>

    <div class="form-group">
        <label for="item-description">Item Description</label>
        <textarea id="item-description" class="item-input" placeholder="Describe the items in the parcel"></textarea>
    </div>
    <div class="form-group">
        <label for="additional-instructions">Additional Instructions</label>
        <textarea id="additional-instructions" class="instructions-input" placeholder="Enter any additional instructions"></textarea>
    </div>
    <div class="form-group">
    <label for="price">Price:(Higher prices make it more likely to be accepted as a delivery)</label>
    <input type="number" id="price" name="price" min="5" placeholder="Enter price" class="form-control"/>
    </div>

    <button class="submit" onClick={handleParcelDelivery}>Place Order</button>
</div>
  );
};

export default Parcel;