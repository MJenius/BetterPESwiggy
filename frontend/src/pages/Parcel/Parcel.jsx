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
      const response = await axios.post(`${url}/api/parcel/create`, parcelData, {
        headers: { token: token },
      });
      if (response.data.success) {
        // Add parcel to cart
        navigate('/cart');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error creating parcel', error);
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

    <button class="button">Submit</button>
</div>
  );
};

export default Parcel;