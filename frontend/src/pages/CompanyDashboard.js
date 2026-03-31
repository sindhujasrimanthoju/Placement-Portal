import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { companyAPI } from '../services/api';

const formatSalary = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const CompanyDashboard = () => (
  <div className="app-shell">
    <Navbar title="Company Dashboard" />
    <main className="container">
      <Routes>
        <Route path="/" element={<CompanyHome />} />
        <Route path="/profile" element={<CompanyProfile />} />
        <Route path="/drives" element={<MyDrives />} />
        <Route path="/create-drive" element={<CreateDrive />} />
      </Routes>
    </main>
  </div>
);

const CompanyHome = () => (
  <>
    <section className="page-header">
      <div>
        <p className="page-eyebrow">Company workspace</p>
        <h1 className="page-title">Run campus hiring with more clarity.</h1>
        <p className="page-subtitle">
          Manage your profile, drives, and applicants.
        </p>
      </div>
    </section>

    <section className="hero-banner">
      <div className="hero-copy">
        <p className="page-eyebrow">Hiring flow</p>
        <h2 className="hero-title">Manage hiring from one company workspace.</h2>
        <p>
          Post drives and review applicants in one place.
        </p>
        <div className="hero-actions">
          <Link to="/company/create-drive" className="btn btn-primary">
            Post a Drive
          </Link>
          <Link to="/company/drives" className="btn btn-secondary">
            Review Applications
          </Link>
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-stat">
          <span className="hero-stat-value">Approved</span>
          <span className="hero-stat-label">Post after approval.</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">Structured</span>
          <span className="hero-stat-label">Add clear criteria.</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">Review</span>
          <span className="hero-stat-label">Update application status.</span>
        </div>
      </div>
    </section>

    <section className="dashboard-grid">
      <Link to="/company/profile" className="action-card">
        <span className="action-card-index">01</span>
        <h3>Company profile</h3>
        <p>Review company details.</p>
      </Link>
      <Link to="/company/create-drive" className="action-card">
        <span className="action-card-index">02</span>
        <h3>Create a drive</h3>
        <p>Post a new opportunity.</p>
      </Link>
      <Link to="/company/drives" className="action-card">
        <span className="action-card-index">03</span>
        <h3>Applicant review</h3>
        <p>Review and update applicants.</p>
      </Link>
    </section>
  </>
);

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await companyAPI.getProfile();
      setProfile(response.data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load company profile right now.' });
    }
  };

  if (!profile) {
    return <div className="loading-card">Loading your company profile...</div>;
  }

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Company profile</p>
          <h1 className="page-title">Your organization at a glance</h1>
          <p className="page-subtitle">
            Review your company status and details.
          </p>
        </div>
      </section>

      <section className="section-card">
        <div className="section-head">
          <div>
            <p className="section-label">Organization details</p>
            <h2 className="section-title">Current company information</h2>
          </div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        <div className="info-grid">
          <div className="info-item">
            <strong>Company Name</strong>
            <span>{profile.name}</span>
          </div>
          <div className="info-item">
            <strong>Contact Email</strong>
            <span>{profile.email}</span>
          </div>
          <div className="info-item">
            <strong>Approval Status</strong>
            <span>
              <span className={`status-badge status-${profile.status.toLowerCase()}`}>
                {profile.status}
              </span>
            </span>
          </div>
          <div className="info-item">
            <strong>Description</strong>
            <span>{profile.description}</span>
          </div>
        </div>

        {profile.status === 'PENDING' && (
          <div className="message error" style={{ marginTop: '18px' }}>
            Your company account is pending admin approval. You can complete your profile now and post drives after approval.
            
          </div>
        )}
      </section>
    </>
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
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await companyAPI.createDrive(formData);
      setMessage({ type: 'success', text: 'Drive created successfully.' });
      setFormData({
        role: '',
        salary: '',
        minCgpa: '',
        branchesAllowed: '',
        yearAllowed: '',
        description: '',
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to create drive.' });
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Create drive</p>
          <h1 className="page-title">Post a new hiring opportunity</h1>
          <p className="page-subtitle">
            Add role and eligibility details.
          </p>
        </div>
      </section>

      <section className="section-card">
        <div className="section-head">
          <div>
            <p className="section-label">Drive details</p>
            <h2 className="section-title">Publish a structured campus drive</h2>
          </div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit} className="stack">
          <div className="form-grid">
            <div className="form-group">
              <label>Job Role</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Software Engineer" required />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. 1200000" required />
            </div>
            <div className="form-group">
              <label>Minimum CGPA</label>
              <input type="number" step="0.01" name="minCgpa" value={formData.minCgpa} onChange={handleChange} placeholder="e.g. 7.0" required />
            </div>
            <div className="form-group">
              <label>Year Allowed</label>
              <select name="yearAllowed" value={formData.yearAllowed} onChange={handleChange} required>
                <option value="">Select Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Branches Allowed</label>
            <input type="text" name="branchesAllowed" value={formData.branchesAllowed} onChange={handleChange} placeholder="CSE, IT, ECE" required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the role, process, and expectations." required />
          </div>

          <div className="button-row">
            <button type="submit" className="btn btn-primary">Publish Drive</button>
          </div>
        </form>
      </section>
    </>
  );
};

const MyDrives = () => {
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadDrives();
  }, []);

  const loadDrives = async () => {
    try {
      const response = await companyAPI.getMyDrives();
      setDrives(response.data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load drives right now.' });
    }
  };

  const loadApplications = async (driveId) => {
    try {
      const response = await companyAPI.getApplicationsForDrive(driveId);
      setApplications(response.data);
      setSelectedDrive(driveId);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load applications for this drive.' });
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await companyAPI.updateApplicationStatus(applicationId, status);
      setMessage({ type: 'success', text: `Application marked as ${status.toLowerCase()}.` });
      loadApplications(selectedDrive);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update application status.' });
    }
  };

  const selectedDriveDetails = drives.find((drive) => drive.id === selectedDrive);

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Drive management</p>
          <h1 className="page-title">Track posted drives and applicants</h1>
          <p className="page-subtitle">
            Review drives and applications.
          </p>
        </div>
      </section>

      <section className="table-card">
        <div className="table-toolbar">
          <div>
            <p className="section-label">Posted drives</p>
            <h2 className="section-title">Your opportunities</h2>
            <p className="section-copy">{drives.length} drive{drives.length === 1 ? '' : 's'} currently published.</p>
          </div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        {drives.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Salary</th>
                  <th>Min CGPA</th>
                  <th>Branches</th>
                  <th>Year</th>
                  <th>Applicants</th>
                </tr>
              </thead>
              <tbody>
                {drives.map((drive) => (
                  <tr key={drive.id}>
                    <td>{drive.role}</td>
                    <td>{formatSalary(drive.salary)}</td>
                    <td>{drive.minCgpa}</td>
                    <td>{drive.branchesAllowed}</td>
                    <td>{drive.yearAllowed}</td>
                    <td>
                      <button type="button" onClick={() => loadApplications(drive.id)} className="btn btn-ghost btn-compact">
                        View Applications
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div>
              <strong>No drives posted yet.</strong>
              Posted drives will appear here.
            </div>
          </div>
        )}
      </section>

      {selectedDrive && (
        <section className="table-card">
          <div className="table-toolbar">
            <div>
              <p className="section-label">Applicant review</p>
              <h2 className="section-title">
                {selectedDriveDetails ? `${selectedDriveDetails.role} applications` : 'Applications'}
              </h2>
              <p className="section-copy">
                {applications.length} candidate{applications.length === 1 ? '' : 's'} available for review.
              </p>
            </div>
          </div>

          {applications.length ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Branch</th>
                    <th>CGPA</th>
                    <th>Skills</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.studentName}</td>
                      <td>{app.email}</td>
                      <td>{app.branch}</td>
                      <td>{app.cgpa}</td>
                      <td>{app.skills || 'Not specified'}</td>
                      <td>
                        <span className={`status-badge status-${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        <div className="inline-actions">
                          <button type="button" onClick={() => updateStatus(app.id, 'SHORTLISTED')} className="btn btn-success btn-compact">
                            Shortlist
                          </button>
                          <button type="button" onClick={() => updateStatus(app.id, 'REJECTED')} className="btn btn-danger btn-compact">
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div>
              <strong>No applications received for this drive yet.</strong>
                Applications will appear here.
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default CompanyDashboard;
