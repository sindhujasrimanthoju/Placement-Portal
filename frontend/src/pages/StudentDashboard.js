import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { studentAPI } from '../services/api';

const formatSalary = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const splitSkills = (skills) =>
  skills
    ? skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

const StudentDashboard = () => (
  <div className="app-shell">
    <Navbar title="Student Dashboard" />
    <main className="container">
      <Routes>
        <Route path="/" element={<StudentHome />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/drives" element={<AvailableDrives />} />
        <Route path="/applications" element={<MyApplications />} />
      </Routes>
    </main>
  </div>
);

const StudentHome = () => (
  <>
    <section className="page-header">
      <div>
        <p className="page-eyebrow">Student workspace</p>
        <h1 className="page-title">Stay application ready every day.</h1>
        <p className="page-subtitle">
          Manage your profile, drives, and applications.
        </p>
      </div>
    </section>

    <section className="hero-banner">
      <div className="hero-copy">
        <p className="page-eyebrow">What you can do here</p>
        <h2 className="hero-title">Everything you need in one student workspace.</h2>
        <p>
          Keep your details updated and track your progress.
        </p>
        <div className="hero-actions">
          <Link to="/student/profile" className="btn btn-primary">
            Review Profile
          </Link>
          <Link to="/student/drives" className="btn btn-secondary">
            Browse Drives
          </Link>
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-stat">
          <span className="hero-stat-value">Profile</span>
          <span className="hero-stat-label">Keep details current.</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">Eligible</span>
          <span className="hero-stat-label">View matching drives.</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">Tracked</span>
          <span className="hero-stat-label">Check application status.</span>
        </div>
      </div>
    </section>

    <section className="dashboard-grid">
      <Link to="/student/profile" className="action-card">
        <span className="action-card-index">01</span>
        <h3>Profile details</h3>
        <p>Update your academic profile.</p>
      </Link>
      <Link to="/student/drives" className="action-card">
        <span className="action-card-index">02</span>
        <h3>Available drives</h3>
        <p>See eligible opportunities.</p>
      </Link>
      <Link to="/student/applications" className="action-card">
        <span className="action-card-index">03</span>
        <h3>Application tracker</h3>
        <p>Track all submissions.</p>
      </Link>
    </section>
  </>
);

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await studentAPI.getProfile();
      setProfile(response.data);
      setFormData(response.data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load profile right now.' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.updateProfile(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
      setEditing(false);
      loadProfile();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    }
  };

  if (!profile) {
    return <div className="loading-card">Loading your student profile...</div>;
  }

  const skills = splitSkills(profile.skills);

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Profile</p>
          <h1 className="page-title">Your academic profile</h1>
          <p className="page-subtitle">
            Review and update your details.
          </p>
        </div>
        <div className="page-actions">
          {!editing && (
            <button type="button" onClick={() => setEditing(true)} className="btn btn-primary">
              Edit Profile
            </button>
          )}
        </div>
      </section>

      <section className="section-card">
        <div className="section-head">
          <div>
            <p className="section-label">Student information</p>
            <h2 className="section-title">Details that shape your eligibility</h2>
            <p className="section-copy">
              Keep your profile current.
            </p>
          </div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        {!editing ? (
          <>
            <div className="info-grid">
              <div className="info-item">
                <strong>Full Name</strong>
                <span>{profile.name}</span>
              </div>
              <div className="info-item">
                <strong>Email</strong>
                <span>{profile.email}</span>
              </div>
              <div className="info-item">
                <strong>Branch</strong>
                <span>{profile.branch}</span>
              </div>
              <div className="info-item">
                <strong>CGPA</strong>
                <span>{profile.cgpa}</span>
              </div>
              <div className="info-item">
                <strong>Current Year</strong>
                <span>{profile.year}</span>
              </div>
              <div className="info-item">
                <strong>Resume Link</strong>
                <span>{profile.resumeUrl || 'Not added yet'}</span>
              </div>
            </div>

            <div className="section-card" style={{ marginTop: '18px', padding: '22px' }}>
              <p className="section-label">Skills</p>
              <h3 className="section-title" style={{ fontSize: '1.25rem' }}>Core strengths</h3>
              {skills.length ? (
                <div className="chip-list">
                  {skills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              ) : (
                <p className="section-copy">No skills added yet. Update your profile to showcase your strengths.</p>
                
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="stack">
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <input type="text" name="branch" value={formData.branch || ''} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input type="number" step="0.01" name="cgpa" value={formData.cgpa || ''} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="number" name="year" value={formData.year || ''} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Resume URL</label>
                <input type="text" name="resumeUrl" value={formData.resumeUrl || ''} onChange={handleChange} placeholder="Add resume link if available" />
              </div>
            </div>

            <div className="form-group">
              <label>Skills</label>
              <textarea name="skills" value={formData.skills || ''} onChange={handleChange} placeholder="List your skills separated by commas" />
            </div>

            <div className="button-row">
              <button type="submit" className="btn btn-success">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

const AvailableDrives = () => {
  const [drives, setDrives] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadDrives();
  }, []);

  const loadDrives = async () => {
    try {
      const response = await studentAPI.getEligibleDrives();
      setDrives(response.data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load drives right now.' });
    }
  };

  const handleApply = async (driveId) => {
    try {
      await studentAPI.applyToDrive(driveId);
      setMessage({ type: 'success', text: 'Application submitted successfully.' });
      loadDrives();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to apply for this drive.' });
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Opportunities</p>
          <h1 className="page-title">Eligible placement drives</h1>
          <p className="page-subtitle">
            Browse drives that match your profile.
          </p>
        </div>
      </section>

      <section className="table-card">
        <div className="table-toolbar">
          <div>
            <p className="section-label">Drive pipeline</p>
            <h2 className="section-title">Open opportunities</h2>
            <p className="section-copy">{drives.length} drive{drives.length === 1 ? '' : 's'} currently match your profile.</p>
          </div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        {drives.length ? (
          <div className="table-wrap">
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
                {drives.map((drive) => (
                  <tr key={drive.id}>
                    <td>{drive.companyName || 'Approved company'}</td>
                    <td>{drive.role}</td>
                    <td>{formatSalary(drive.salary)}</td>
                    <td>{drive.minCgpa}</td>
                    <td>{drive.branchesAllowed}</td>
                    <td>
                      {drive.applied ? (
                        <span className="status-badge status-applied">Applied</span>
                      ) : (
                        <button type="button" onClick={() => handleApply(drive.id)} className="btn btn-success btn-compact">
                          Apply Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div>
              <strong>No eligible drives yet.</strong>
              Matching drives will appear here.
            </div>
          </div>
        )}
      </section>
    </>
  );
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await studentAPI.getApplications();
      setApplications(response.data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load applications right now.' });
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Application tracker</p>
          <h1 className="page-title">Monitor your placement progress</h1>
          <p className="page-subtitle">
            Review all submitted applications.
          </p>
        </div>
      </section>

      <section className="table-card">
        <div className="table-toolbar">
          <div>
            <p className="section-label">Submitted roles</p>
            <h2 className="section-title">Your applications</h2>
            <p className="section-copy">{applications.length} application{applications.length === 1 ? '' : 's'} currently on record.</p>
          </div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        {applications.length ? (
          <div className="table-wrap">
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
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.companyName}</td>
                    <td>{app.role}</td>
                    <td>{formatSalary(app.salary)}</td>
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
        ) : (
          <div className="empty-state">
            <div>
              <strong>You have not applied to any drives yet.</strong>
              Your applications will appear here.
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default StudentDashboard;
