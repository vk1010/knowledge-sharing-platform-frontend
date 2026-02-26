#!/bin/bash

cat > src/components/Navbar.jsx << 'EOF'
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/jwtUtils';
import './Navbar.css';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
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
EOF

cat > src/components/Navbar.css << 'EOF'
.navbar {
  background: #2c3e50;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #3498db;
}

.user-name {
  color: #ecf0f1;
  font-size: 14px;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #c0392b;
}
EOF

cat > src/App.jsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ArticleForm from './articles/ArticleForm';
import MyArticles from './articles/MyArticles';
import ProtectedRoute from './auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/articles/new"
            element={
              <ProtectedRoute>
                <ArticleForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles/edit/:id"
            element={
              <ProtectedRoute>
                <ArticleForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-articles"
            element={
              <ProtectedRoute>
                <MyArticles />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
EOF

cat > src/App.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f6fa;
}

.app {
  min-height: 100vh;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOF

cat > src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

echo "Core files created successfully"
