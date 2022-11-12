import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg'
import './Header.css'
const Header = () => {
    const {user , logOut} = useContext(AuthContext)
    console.log(logOut);
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
                    <span  className='user'>{user?.email}</span>
                   { user ? <button className='btn-logout' onClick={logOut}>Log Out</button>  :  <><Link to='/login'>Login</Link> 
                    <Link to='/signup'>Signup</Link></>}
                </div>
            </nav>
        </div>
    );
};

export default Header;