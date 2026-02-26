import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUser } from '../utils/jwtUtils';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Knowledge Hub
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/articles/new">New Article</Link></li>
              <li><Link to="/my-articles">My Articles</Link></li>
              <li>
                <span className="user-name">Hi, {user.username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
