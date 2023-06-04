import { useNavigate } from 'react-router-dom'
import './Register.css'
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [newUserInfo, setNewUserInfo] = useState({});
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setNewUserInfo({...newUserInfo, [e.target.name]: e.target.value});
  }
  
  const register = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setUserNameError('');

    if (newUserInfo.password !== newUserInfo.passwordConfirm) {
      setPasswordError('Password does not match.')
    }

    try {
      const res = await axios.post('/api/auth/register', newUserInfo);
    } catch(error) {
      console.log(error.response.data);
      if (error.response.data.code === 11000) {
        setUserNameError('That user name or email is already taken.')
      }
    }
  }

  const nav = useNavigate();
  const goToLogin = () => {
    nav('/login/');
  }

  return (
    <div className='register'>
        <span className="register-title">Register</span>
        <form className='register-form' onSubmit={register}>
            <label htmlFor="email" type='text' placeholder='email'>Email: </label>
            <input className='register-input' type="text" placeholder='enter your email' id='email' name='email' onChange={handleChange}/>
            <label htmlFor="username" type='text' placeholder='username'>Username: </label>
            <input className='register-input' type="text" placeholder='enter your username' id='username' name='username' onChange={handleChange}/>
            <span className='error-span'>{userNameError}</span>
            <label htmlFor="password" placeholder='password'>Password: </label>
            <input className='register-input' type="password" placeholder='enter your password' id='password' name='password' onChange={handleChange}/>
            <span className='error-span'>{passwordError}</span>
            <label htmlFor="confirm-password" placeholder='confirm password'>Confirm Password: </label>
            <input className='register-input' type="password" placeholder='confirm your password' id='confirm-password' name='passwordConfirm' onChange={handleChange}/>
            <button className="register-button" type='submit'>Register</button>
            <button className="register-login-button" type='button' onClick={goToLogin}>Login</button>
        </form>
    </div>
  )
}
