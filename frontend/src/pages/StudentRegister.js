import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const StudentRegister = () => {
  const navigate = useNavigate();
  const benefits = [
    'Create your student profile.',
    'View eligible drives.',
    'Track applications clearly.',
  ];
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    branch: '',
    cgpa: '',
    year: '',
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await authAPI.registerStudent(formData);
      const { token, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      
      navigate('/student');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };
  
  return (
    <div className="auth-shell">
      <div className="auth-ambient">
        <section className="auth-story">
          <p className="auth-eyebrow">Student onboarding</p>
          <h1 className="auth-title">Get placement ready.</h1>
          <p className="auth-copy">
            Add your academic details and start applying.
          </p>

          <div className="auth-stat-strip">
            <div className="auth-stat">
              <strong>Fast</strong>
              <span>Quick setup</span>
            </div>
            <div className="auth-stat">
              <strong>Targeted</strong>
              <span>Matched drives</span>
            </div>
            <div className="auth-stat">
              <strong>Visible</strong>
              <span>Status tracking</span>
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
            <p className="page-eyebrow">Student account</p>
            <h2 className="auth-card-title">Register as a student</h2>
            <p className="auth-card-copy">
              Create your account to continue.
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
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
              </div>

              <div className="form-group">
                <label>Branch</label>
                <select name="branch" value={formData.branch} onChange={handleChange} required>
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics</option>
                  <option value="MECH">Mechanical</option>
                  <option value="CIVIL">Civil</option>
                </select>
              </div>

              <div className="form-group">
                <label>CGPA</label>
                <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="e.g. 8.4" required />
              </div>

              <div className="form-group">
                <label>Year</label>
                <select name="year" value={formData.year} onChange={handleChange} required>
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            {error && <div className="message error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block">
              Create Student Account
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

export default StudentRegister;
