import React from 'react'
import './Header.css'

const handleScrollToSection = (section) => {
  navigate('/');
  setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
  }, 100);
}

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>PESwiggy:<br/>
        The On Campus Delivery Service</h2>
        <p>Convenient reliable delivery
          food,stationery,printouts
          and on-campus for all your needs,
         delivered right to you</p>
        <a href="#explore-menu" className='view-menu' onClick={() => handleScrollToSection('explore-menu')}>View Menu</a>
      </div>
    </div>
  )
}

export default Header
