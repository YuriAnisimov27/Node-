import React, {useState} from 'react';
import './authorization.scss';
import Input from '../../utils/input/Input';
import {registration} from '../../actions/user';

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='authorization'>
      <div className='authorization__header'>Registration</div>
      <Input value={email} setValue={setEmail} type='text' placeholder='Enter Email'/>
      <Input value={password} setValue={setPassword} type='password' placeholder='Enter Password'/>
      <button onClick={() => registration(email, password)} className='authorization__btn'>Register</button>
    </div>
  );
};

export default Registration;
