import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import './Printout.css'; // Ensure you import the updated CSS

const Printout = () => {
  const [image, setImage] = useState(null);
  const [additionalInformation, setAdditionalInformation] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0].type); // Log the file type
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInformation(e.target.value);
  };

  const handlePlaceOrder = () => {
    // TO DO: implement logic to handle place order functionality
    navigate('/order');
  };

  return (
    <div className='printout-page'>
      <h2>Upload File</h2>
      <div className='add-img-upload'>
        <label>
          <img 
            src={image && image.type.startsWith('image/') ? URL.createObjectURL(image) : assets.upload_area} 
            alt='Upload Area' 
          />
          <input onChange={handleImageChange} type='file' id='image' accept="*/*" hidden required />
        </label>
      </div>
      <label htmlFor='additionalInformation'>Additional Information:</label>
      <textarea
        required
        name='additionalInformation'
        onChange={handleAdditionalInfoChange}
        value={additionalInformation}
        id='additionalInformation'
        placeholder='Additional Information'
      />
      <button onClick={handlePlaceOrder} className='button'>Place Order</button>
    </div>
  );
};

export default Printout;