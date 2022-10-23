import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import './Main.css'
const Main = () => {
    return (
        <div className='Header-parent'>
            <Header style={{ width: '100vw' }}></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;