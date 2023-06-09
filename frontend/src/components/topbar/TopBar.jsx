import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { canWrite } from '../../utils/userPermissions';
import './TopBar.css'

export default function TopBar() {
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({type: 'LOGOUT'});
  };

  let logInOutButton = user ? <li className='top-list-item' onClick={handleLogout}>{user && 'Logout'}</li> : <li className='top-list-item'><Link className="link" to='/login'>Login</Link></li>;

  return (
    <div className='top'>
        <div className="top-left">
          <h1>Army Ant Entertainment</h1>
          <ul className='top-list'>
            {user && <li className='top-list-item'>Welcome {user.username}</li>}
            <li className='top-list-item'>
              <Link className='link' to='/'>Home</Link>
            </li>
            {
              user && canWrite(user) && <li className='top-list-item'>
                <Link className='link' to='/write'>Write</Link>
              </li>
            }
            {
              user && canWrite(user) && <li className='top-list-item'>
                <Link className='link' to='/drafts'>Drafts</Link>
              </li>
            }
            {/* {logInOutButton} */}
            {/* {!user && <li className='top-list-item'>
              <Link className='link' to='/register'>Register</Link>
            </li>} */}
          </ul>
        </div>
        <div className="top-center">
        </div>
        <div className="top-right">
        </div>
    </div>
  )
}
