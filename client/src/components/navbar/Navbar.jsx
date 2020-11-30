import React from 'react';
import './navbar.scss';
import Logo from './../../assets/img/Logo.svg';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../reducers/userReducer';

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className='navbar'>
      <div className='container'>
        <img className='navbar__logo' src={Logo} alt="Logo"/>
        <div className='navbar__header'>MERN CLOUD</div>
        {!isAuth && <div className='navbar__login'><NavLink to='/login'>Enter</NavLink></div>}
        {!isAuth && <div className='navbar__registration'><NavLink to='/registration'>Registration</NavLink></div>}
        {isAuth && <div className='navbar__login' onClick={() => dispatch(logout())}>Logout</div>}
      </div>
    </div>
  );
};

export default Navbar;
