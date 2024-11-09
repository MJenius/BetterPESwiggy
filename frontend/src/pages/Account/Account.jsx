import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const [user, setUser ] = useState({
    Name: '',
    SRN:'',
    email: '',
    phone: '',
    sem:'',
    section:'',
    branch: ''
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Name', user.Name);
    formData.append('SRN', user.SRN);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('sem', user.sem);
    formData.append('section', user.section);
    formData.append('branch', user.branch);

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
      <form className="account-info" onSubmit={handleSubmit}>
        <h3>Account Information</h3>
        <div className="account-item">
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            value={user.Name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>SRN:</label>
          <input
            type="text"
            name="SRN"
            value={user.SRN || ''}
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
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            value={user.phone || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Sem:</label>
          <input
            type=" text"
            name="sem"
            value={user.sem || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={user.section || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="account-item">
          <label>Branch:</label>
          <input
            type="text"
            name="branch"
            value={user.branch || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default Account;