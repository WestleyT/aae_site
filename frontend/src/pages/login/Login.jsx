import { useRef, useContext } from 'react'
import { Context } from '../../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: 'LOGIN_START'});

    try {
      const res = await axios.post('/auth/login', {
        email: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
    } catch(error) {
      dispatch({type: 'LOGIN_FAILURE'})
    }
  };

  const goToRegisterPage = () => {
    nav('/register');
  }

  return (
    <div className='login'>
        <span className="login-title">Log In</span>
        <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor="email" type='text' placeholder='email'>Email: </label>
            <input className='login-input' type="text" placeholder='enter your email' id='email' ref={userRef}/>
            <label htmlFor="password" placeholder='password'>Password: </label>
            <input className='login-input' type="password" placeholder='enter your password' id='password' ref={passwordRef}/>
            <button className="login-button" type='submit' disabled={isFetching}>Login</button>
            <button className="login-register-button" type="button" onClick={goToRegisterPage}>Register</button>
        </form>
    </div>
  )
}
