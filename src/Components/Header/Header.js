import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg'
import './Header.css'
const Header = () => {
    return (
        <div className='header'>
            <nav >
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="menu-list">
                    <Link to='/shop'> Shop</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/inventory'>Inventory</Link>
                    <Link to='/about'>About</Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;