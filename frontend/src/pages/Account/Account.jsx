import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const [user, setUser ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    profilePicture: null,
  });
  const [profilePicture, setProfilePicture] = useState(null); // State for file input

  const fetchUser  = async () => {
    try {
      const response = await axios.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser (response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser ();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser ((prevUser ) => ({
      ...prevUser ,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file); // Update the profilePicture state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('street', user.street);
    formData.append('city', user.city);
    formData.append('state', user.state);
    formData.append('zipcode', user.zipcode);
    formData.append('country', user.country);
    formData.append('phone', user.phone);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture); // Append the file to FormData
    }

    try {
      await axios.put('/api/users/me', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set content type for file upload
        },
      });
      navigate('/account');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="account-page">
      <div className="account-profile">
        <img
          src={user.profilePicture || 'default-placeholder.png'} // Use a default placeholder image if no profile picture is available
          alt={`${user.firstName || ''} ${user.lastName || ''}`} // Use empty string if names are undefined
          className="profile-picture"
        />
        <h2>{`${user.firstName || ''} ${user.lastName || ''}`}</h2> {/* Only show names if defined */}
        <p className="email">{user.email || ''}</p> {/* Only show email if defined */}
      </div>
      <form className="account-info" onSubmit={handleSubmit}>
        <h3>Account Information</h3>
        <div className="account-item">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Street:</label>
          <input
            type="text"
            name="street"
            value={user.street || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={user.city || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>State:</label>
          <input
            type=" text"
            name="state"
            value={user.state || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Zipcode:</label>
          <input
            type="text"
            name="zipcode"
            value={user.zipcode || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={user.country || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default Account;