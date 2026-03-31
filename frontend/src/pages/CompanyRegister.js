import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const CompanyRegister = () => {
  const navigate = useNavigate();
  const benefits = [
    'Create your company profile.',
    'Post placement drives.',
    'Review student applications.',
  ];
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    description: '',
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await authAPI.registerCompany(formData);
      const { token, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      
      navigate('/company');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };
  
  return (
    <div className="auth-shell">
      <div className="auth-ambient">
        <section className="auth-story">
          <p className="auth-eyebrow">Employer onboarding</p>
          <h1 className="auth-title">Hire through one portal.</h1>
          <p className="auth-copy">
            Register your company and manage drives in one place.
          </p>

          <div className="auth-stat-strip">
            <div className="auth-stat">
              <strong>Structured</strong>
              <span>Drive posting</span>
            </div>
            <div className="auth-stat">
              <strong>Reviewed</strong>
              <span>Admin approval</span>
            </div>
            <div className="auth-stat">
              <strong>Efficient</strong>
              <span>Application review</span>
            </div>
          </div>

          <ul className="auth-points">
            {benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="auth-card">
          <div className="auth-card-header">
            <p className="page-eyebrow">Company account</p>
            <h2 className="auth-card-title">Register your organization</h2>
            <p className="auth-card-copy">
              Create your company account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="stack">
            <div className="form-grid">
              <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" required />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter company name" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter contact email" required />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell students about your company, culture, and opportunities." required />
            </div>

            {error && <div className="message error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block">
              Create Company Account
            </button>
          </form>

          <div className="auth-links">
            <span>Already registered?</span>
            <Link to="/login">Go to login</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyRegister;
