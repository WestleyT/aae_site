import './Register.css'

export default function Register() {
  return (
    <div className='register'>
        <span className="register-title">Register</span>
        <form className='register-form' action="">
            <label htmlFor="email" type='text' placeholder='email'>Email: </label>
            <input className='register-input' type="text" placeholder='enter your email' id='email' />
            <label htmlFor="username" type='text' placeholder='username'>Username: </label>
            <input className='register-input' type="text" placeholder='enter your username' id='username' />
            <label htmlFor="password" placeholder='password'>Password: </label>
            <input className='register-input' type="password" placeholder='enter your password' id='password' />
            <label htmlFor="confirm-password" placeholder='confirm password'>Confirm Password: </label>
            <input className='register-input' type="password" placeholder='confirm your password' id='confirm-password' />
            <button className="register-button">Register</button>
            <button className="register-login-button">Login</button>
        </form>
    </div>
  )
}
