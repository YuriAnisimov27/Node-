import React from 'react';
import './navbar.scss';
import Logo from './../../assets/img/Logo.svg';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <img className='navbar__logo' src={Logo} alt="Logo"/>
        <div className='navbar__header'>MERN CLOUD</div>
        <div className='navbar__login'>
          <NavLink to='/login'>
            Enter
          </NavLink>
        </div>
        <div className='navbar__registration'>
          <NavLink to='/registration'>
            Registration
          </NavLink>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
