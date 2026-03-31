import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

/**
 * Navigation bar component
 */
const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || '';

  const navigation = {
    STUDENT: [
      { to: '/student', label: 'Overview', end: true },
      { to: '/student/profile', label: 'Profile' },
      { to: '/student/drives', label: 'Drives' },
      { to: '/student/applications', label: 'Applications' },
    ],
    COMPANY: [
      { to: '/company', label: 'Overview', end: true },
      { to: '/company/profile', label: 'Profile' },
      { to: '/company/create-drive', label: 'Post Drive' },
      { to: '/company/drives', label: 'Manage Drives' },
    ],
    ADMIN: [
      { to: '/admin', label: 'Overview', end: true },
      { to: '/admin/students', label: 'Students' },
      { to: '/admin/companies', label: 'Companies' },
      { to: '/admin/drives', label: 'Drives' },
    ],
  };

  const roleLabel = {
    STUDENT: 'Student Workspace',
    COMPANY: 'Company Workspace',
    ADMIN: 'Admin Console',
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  
  return (
    <header className="app-navbar">
      <div className="nav-brand">
        <span className="nav-kicker">{roleLabel[role] || 'Placement Portal'}</span>
        <div className="nav-title-row">
          <span className="nav-title">Placement Portal</span>
          <span className="nav-context">{title}</span>
        </div>
      </div>

      <nav className="nav-links">
        {(navigation[role] || []).map((link) => (
          <NavLink
            key={link.to}
            end={link.end}
            to={link.to}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-actions">
        <span className="nav-role">{role || 'Guest'}</span>
        <button type="button" onClick={handleLogout} className="btn btn-secondary btn-compact">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
