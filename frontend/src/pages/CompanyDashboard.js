import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { companyAPI } from '../services/api';

const CompanyDashboard = () => {
  return (
    <div>
      <Navbar title="Company Dashboard" />
      <div className="container">
        <Routes>
          <Route path="/" element={<CompanyHome />} />
          <Route path="/profile" element={<CompanyProfile />} />
          <Route path="/drives" element={<MyDrives />} />
          <Route path="/create-drive" element={<CreateDrive />} />
        </Routes>
      </div>
    </div>
  );
};

const CompanyHome = () => {
  return (
    <div>
      <h2>Welcome to Company Dashboard</h2>
      <div className="dashboard-grid">
        <Link to="/company/profile" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>Company Profile</h3>
            <p>🏢</p>
          </div>
        </Link>
        <Link to="/company/create-drive" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>Post New Drive</h3>
            <p>➕</p>
          </div>
        </Link>
        <Link to="/company/drives" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>My Drives</h3>
            <p>📊</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    loadProfile();
  }, []);
  
  const loadProfile = async () => {
    try {
      const response = await companyAPI.getProfile();
      setProfile(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  if (!profile) return <div>Loading...</div>;
  
  return (
    <div className="card">
      <h2>Company Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Description:</strong> {profile.description}</p>
      <p><strong>Status:</strong> 
        <span className={`status-badge status-${profile.status.toLowerCase()}`}>
          {profile.status}
        </span>
      </p>
      {profile.status === 'PENDING' && (
        <div className="error">Your company is pending approval from admin</div>
      )}
    </div>
  );
};

const CreateDrive = () => {
  const [formData, setFormData] = useState({
    role: '',
    salary: '',
    minCgpa: '',
    branchesAllowed: '',
    yearAllowed: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await companyAPI.createDrive(formData);
      setMessage('Drive created successfully');
      setFormData({
        role: '',
        salary: '',
        minCgpa: '',
        branchesAllowed: '',
        yearAllowed: '',
        description: '',
      });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to create drive');
    }
  };
  
  return (
    <div className="card">
      <h2>Post New Placement Drive</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Role</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Salary (Annual)</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Minimum CGPA</label>
          <input type="number" step="0.01" name="minCgpa" value={formData.minCgpa} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Branches Allowed (comma separated)</label>
          <input type="text" name="branchesAllowed" value={formData.branchesAllowed} onChange={handleChange} 
                 placeholder="CSE,IT,ECE" required />
        </div>
        <div className="form-group">
          <label>Year Allowed</label>
          <select name="yearAllowed" value={formData.yearAllowed} onChange={handleChange} required>
            <option value="">Select Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Post Drive</button>
      </form>
      {message && <div className="success">{message}</div>}
    </div>
  );
};

const MyDrives = () => {
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    loadDrives();
  }, []);
  
  const loadDrives = async () => {
    try {
      const response = await companyAPI.getMyDrives();
      setDrives(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const loadApplications = async (driveId) => {
    try {
      const response = await companyAPI.getApplicationsForDrive(driveId);
      setApplications(response.data);
      setSelectedDrive(driveId);
    } catch (err) {
      console.error(err);
    }
  };
  
  const updateStatus = async (applicationId, status) => {
    try {
      await companyAPI.updateApplicationStatus(applicationId, status);
      loadApplications(selectedDrive);
    } catch (err) {
      alert('Failed to update status');
    }
  };
  
  return (
    <div className="card">
      <h2>My Placement Drives</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Salary</th>
            <th>Min CGPA</th>
            <th>Branches</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drives.map(drive => (
            <tr key={drive.id}>
              <td>{drive.role}</td>
              <td>₹{drive.salary}</td>
              <td>{drive.minCgpa}</td>
              <td>{drive.branchesAllowed}</td>
              <td>{drive.yearAllowed}</td>
              <td>
                <button onClick={() => loadApplications(drive.id)} className="btn btn-primary">
                  View Applications
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {selectedDrive && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Applications</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>CGPA</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td>{app.studentName}</td>
                  <td>{app.email}</td>
                  <td>{app.branch}</td>
                  <td>{app.cgpa}</td>
                  <td>{app.skills}</td>
                  <td>
                    <span className={`status-badge status-${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => updateStatus(app.id, 'SHORTLISTED')} 
                            className="btn btn-success" style={{ marginRight: '5px' }}>
                      Shortlist
                    </button>
                    <button onClick={() => updateStatus(app.id, 'REJECTED')} 
                            className="btn btn-danger">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
