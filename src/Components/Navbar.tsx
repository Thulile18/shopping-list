import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';
import { logout } from './Store/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, token } = useSelector((state: RootState) => state.auth);

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  if (!token) {
    return null;
  }
  
  let userInitial = '';
  if (user && user.name) {
    userInitial = user.name[0].toUpperCase();
  }

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        
        <Link to="/home" className="brand">
          🛒 <span>Shopping List</span>
        </Link>
        
        <div className="nav-links">
          
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
            Home
          </Link>
          
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
            Profile
          </Link>
          
          {user && (
            <span className="user-badge">
              <span className="avatar">{userInitial}</span>
              {user.name}
            </span>
          )}
          
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
