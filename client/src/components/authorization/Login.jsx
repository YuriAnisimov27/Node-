import React, {useState} from 'react';
import './authorization.scss';
import Input from '../../utils/input/Input';
import {useDispatch} from 'react-redux';
import {login} from '../../actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <div className='authorization'>
      <div className='authorization__header'>Login</div>
      <Input value={email} setValue={setEmail} type='text' placeholder='Enter Email'/>
      <Input value={password} setValue={setPassword} type='password' placeholder='Enter Password'/>
      <button
        onClick={() => dispatch(login(email, password))}
        className='authorization__btn'>
        Enter
      </button>
    </div>
  );
};


export default Login;
