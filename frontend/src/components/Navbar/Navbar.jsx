import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
    const [menu, setMenu] = useState("home"); // Changed default to "home"

    return (
        <div className='navbar'>
            <img src={assets.logo} alt='logo' className='logo' />
            <ul className='navbar-menu'>
                {["home", "menu", "mobile-app", "contact-us"].map(item => (
                    <li key={item} onClick={() => setMenu(item)} className={menu === item ? "active" : ""}>
                        {item.replace("-", " ")} {/* Format for display */}
                    </li>
                ))}
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt='Search' aria-hidden="true" />
                <div className='navbar-search-icon'>
                    <img src={assets.basket_icon} alt="Basket" />
                    <div className='dot'></div>
                </div>
                <button aria-label="Sign In">Sign In</button>
            </div>
        </div>
    );
}

export default Navbar;