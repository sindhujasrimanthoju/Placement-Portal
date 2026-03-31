import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

/**
 * Login page component
 */
const Login = () => {
  const navigate = useNavigate();
  const highlights = [
    'Students, companies, and admins in one portal.',
    'Clear role-based dashboards.',
    'Simple tracking for drives and applications.',
  ];
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await authAPI.login(formData);
      const { token, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      
      // Redirect based on role
      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'STUDENT') {
        navigate('/student');
      } else if (role === 'COMPANY') {
        navigate('/company');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };
  
  return (
    <div className="auth-shell">
      <div className="auth-ambient">
        <section className="auth-story">
          <p className="auth-eyebrow">Placement operations</p>
          <h1 className="auth-title">Campus hiring, simplified.</h1>
          <p className="auth-copy">
            One workspace for placement activity.
          </p>

          <div className="auth-stat-strip">
            <div className="auth-stat">
              <strong>3</strong>
              <span>User roles</span>
            </div>
            <div className="auth-stat">
              <strong>1</strong>
              <span>Shared portal</span>
            </div>
            <div className="auth-stat">
              <strong>24/7</strong>
              <span>Access</span>
            </div>
          </div>

          <ul className="auth-points">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="auth-card">
          <div className="auth-card-header">
            <p className="page-eyebrow">Secure access</p>
            <h2 className="auth-card-title">Sign in to your workspace</h2>
            <p className="auth-card-copy">
              Continue to your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="stack">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            {error && <div className="message error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <div className="auth-links">
            <span>New here?</span>
            <Link to="/register/student">Create student account</Link>
            <Link to="/register/company">Create company account</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
