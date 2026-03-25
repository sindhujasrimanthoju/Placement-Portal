import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Navigation bar component
 */
const Navbar = ({ title }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  
  return (
    <div className="navbar">
      <h1>{title}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
