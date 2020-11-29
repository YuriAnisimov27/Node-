import React from 'react';
import './registration.scss';
import Input from '../../utils/input/Input';

const Registration = () => {
  return (
    <div className='registration'>
      <div className='registration__header'>Registration</div>
      <Input type='text' placeholder='Enter Email'/>
      <Input type='password' placeholder='Enter Password'/>
      <button className='registration__btn'>Enter</button>
    </div>
  );
};

export default Registration;
