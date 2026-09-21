import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';
import { logout } from './Store/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

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

  const userName = user && user.name ? user.name : 'User';

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <aside
        className={
          'dashboard-sidebar ' +
          (menuOpen ? 'sidebar-open' : '')
        }
      >
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon"> 🛒 </span>

          <div>
            <strong> Shopping List </strong>
            <span> Plan • Organize • Shop • Save </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/home"
            onClick={closeMenu}
            className={
              location.pathname === '/home'
                ? 'sidebar-link active'
                : 'sidebar-link'
            }
          >
            <span>⌂</span>
            Home
          </Link>

          <Link
            to="/home"
            onClick={closeMenu}
            className={
              location.pathname.startsWith('/lists')
                ? 'sidebar-link active'
                : 'sidebar-link'
            }
          >
            <span>☷</span>
            Lists
          </Link>

          <Link
            to="/profile"
            onClick={closeMenu}
            className={
              location.pathname === '/profile'
                ? 'sidebar-link active'
                : 'sidebar-link'
            }
          >
            <span>♟</span>
            Profile
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-icon">♡</div>

          <p>
            Smart lists.
            <br />
            Better shopping.
          </p>
        </div>
      </aside>

      {menuOpen ? (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
        ></div>
      ) : null}

      <header className="dashboard-topbar">
        <div className="topbar-left">
          <button
            type="button"
            className="menu-button"
            onClick={function () {
              setMenuOpen(true);
            }}
            aria-label="Open menu"
          >
            ☰
          </button>

          <Link to="/home" className="topbar-brand">
            <span>🛒</span>

            <div>
              <strong>Shopping List</strong>
              <small>Plan • Organize • Shop • Save</small>
            </div>
          </Link>
        </div>

        <div className="topbar-actions">
          <span className="notification-icon">
            ♧
            <span></span>
          </span>

          <span className="topbar-avatar">
            {userInitial}
          </span>

          <span className="topbar-name">
            {userName}
          </span>

          <span className="topbar-chevron">
            
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="topbar-logout"
          >
            ↪ Logout
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;