import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { studentAPI } from '../services/api';

const StudentDashboard = () => {
  return (
    <div>
      <Navbar title="Student Dashboard" />
      <div className="container">
        <Routes>
          <Route path="/" element={<StudentHome />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/drives" element={<AvailableDrives />} />
          <Route path="/applications" element={<MyApplications />} />
        </Routes>
      </div>
    </div>
  );
};

const StudentHome = () => {
  return (
    <div>
      <h2>Welcome to Student Dashboard</h2>
      <div className="dashboard-grid">
        <Link to="/student/profile" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>My Profile</h3>
            <p>📝</p>
          </div>
        </Link>
        <Link to="/student/drives" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>Available Drives</h3>
            <p>🎯</p>
          </div>
        </Link>
        <Link to="/student/applications" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>My Applications</h3>
            <p>📋</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    loadProfile();
  }, []);
  
  const loadProfile = async () => {
    try {
      const response = await studentAPI.getProfile();
      setProfile(response.data);
      setFormData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.updateProfile(formData);
      setMessage('Profile updated successfully');
      setEditing(false);
      loadProfile();
    } catch (err) {
      setMessage('Failed to update profile');
    }
  };
  
  if (!profile) return <div>Loading...</div>;
  
  return (
    <div className="card">
      <h2>My Profile</h2>
      {!editing ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Branch:</strong> {profile.branch}</p>
          <p><strong>CGPA:</strong> {profile.cgpa}</p>
          <p><strong>Year:</strong> {profile.year}</p>
          <p><strong>Skills:</strong> {profile.skills || 'Not specified'}</p>
          <button onClick={() => setEditing(true)} className="btn btn-primary">Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Branch</label>
            <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>CGPA</label>
            <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <textarea name="skills" value={formData.skills || ''} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success">Save</button>
          <button type="button" onClick={() => setEditing(false)} className="btn btn-danger" style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
      )}
      {message && <div className="success">{message}</div>}
    </div>
  );
};

const AvailableDrives = () => {
  const [drives, setDrives] = useState([]);
  
  useEffect(() => {
    loadDrives();
  }, []);
  
  const loadDrives = async () => {
    try {
      const response = await studentAPI.getEligibleDrives();
      setDrives(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleApply = async (driveId) => {
    try {
      await studentAPI.applyToDrive(driveId);
      alert('Applied successfully');
      loadDrives();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to apply');
    }
  };
  
  return (
    <div className="card">
      <h2>Available Placement Drives</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Min CGPA</th>
            <th>Branches</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drives.map(drive => (
            <tr key={drive.id}>
              <td>{drive.companyName}</td>
              <td>{drive.role}</td>
              <td>₹{drive.salary}</td>
              <td>{drive.minCgpa}</td>
              <td>{drive.branchesAllowed}</td>
              <td>
                {drive.applied ? (
                  <span className="status-badge status-applied">Applied</span>
                ) : (
                  <button onClick={() => handleApply(drive.id)} className="btn btn-success">Apply</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    loadApplications();
  }, []);
  
  const loadApplications = async () => {
    try {
      const response = await studentAPI.getApplications();
      setApplications(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="card">
      <h2>My Applications</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Applied Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.companyName}</td>
              <td>{app.role}</td>
              <td>₹{app.salary}</td>
              <td>
                <span className={`status-badge status-${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </td>
              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
