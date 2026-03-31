import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { adminAPI } from '../services/api';

const formatSalary = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const AdminDashboard = () => (
  <div className="app-shell">
    <Navbar title="Admin Dashboard" />
    <main className="container">
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/students" element={<ManageStudents />} />
        <Route path="/companies" element={<ManageCompanies />} />
        <Route path="/drives" element={<ManageDrives />} />
      </Routes>
    </main>
  </div>
);

const AdminHome = () => (
  <>
    <section className="page-header">
      <div>
        <p className="page-eyebrow">Admin console</p>
        <h1 className="page-title">Oversee the full placement ecosystem.</h1>
        <p className="page-subtitle">
          Manage students, companies, and drives.
        </p>
      </div>
    </section>

    <section className="hero-banner">
      <div className="hero-copy">
        <p className="page-eyebrow">Operational control</p>
        <h2 className="hero-title">One admin console for placement operations.</h2>
        <p>
          Review records and keep the portal organized.
        </p>
        <div className="hero-actions">
          <Link to="/admin/companies" className="btn btn-primary">
            Review Companies
          </Link>
          <Link to="/admin/students" className="btn btn-secondary">
            View Students
          </Link>
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-stat">
          <span className="hero-stat-value">Students</span>
          <span className="hero-stat-label">Manage student records.</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">Companies</span>
          <span className="hero-stat-label">Approve company access.</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">Drives</span>
          <span className="hero-stat-label">Oversee active drives.</span>
        </div>
      </div>
    </section>

    <section className="dashboard-grid">
      <Link to="/admin/students" className="action-card">
        <span className="action-card-index">01</span>
        <h3>Student records</h3>
        <p>Manage student data.</p>
      </Link>
      <Link to="/admin/companies" className="action-card">
        <span className="action-card-index">02</span>
        <h3>Company approvals</h3>
        <p>Review company requests.</p>
      </Link>
      <Link to="/admin/drives" className="action-card">
        <span className="action-card-index">03</span>
        <h3>Drive oversight</h3>
        <p>Monitor active drives.</p>
      </Link>
    </section>
  </>
);

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await adminAPI.getAllStudents();
      setStudents(response.data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load students right now.' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await adminAPI.deleteStudent(id);
        setMessage({ type: 'success', text: 'Student deleted successfully.' });
        loadStudents();
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to delete student.' });
      }
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Students</p>
          <h1 className="page-title">Student record management</h1>
          <p className="page-subtitle">
            Review current student records.
          </p>
        </div>
      </section>

      <section className="table-card">
        <div className="table-toolbar">
          <div>
            <p className="section-label">Student directory</p>
            <h2 className="section-title">Active profiles</h2>
            <p className="section-copy">{students.length} student{students.length === 1 ? '' : 's'} currently listed.</p>
          </div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        {students.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Branch</th>
                  <th>CGPA</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.branch}</td>
                    <td>{student.cgpa}</td>
                    <td>{student.year}</td>
                    <td>
                      <button type="button" onClick={() => handleDelete(student.id)} className="btn btn-danger btn-compact">
                        Delete
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
              <strong>No students found.</strong>
              Student records will appear here.
            </div>
          </div>
        )}
      </section>
    </>
  );
};

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await adminAPI.getAllCompanies();
      setCompanies(response.data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load companies right now.' });
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await adminAPI.updateCompanyStatus(id, status);
      setMessage({ type: 'success', text: `Company ${status.toLowerCase()} successfully.` });
      loadCompanies();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update company status.' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await adminAPI.deleteCompany(id);
        setMessage({ type: 'success', text: 'Company deleted successfully.' });
        loadCompanies();
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to delete company.' });
      }
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Companies</p>
          <h1 className="page-title">Employer review and approvals</h1>
          <p className="page-subtitle">
            Review and approve companies.
          </p>
        </div>
      </section>

      <section className="table-card">
        <div className="table-toolbar">
          <div>
            <p className="section-label">Partner directory</p>
            <h2 className="section-title">Registered companies</h2>
            <p className="section-copy">{companies.length} compan{companies.length === 1 ? 'y' : 'ies'} currently registered.</p>
          </div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        {companies.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.email}</td>
                    <td>{company.description}</td>
                    <td>
                      <span className={`status-badge status-${company.status.toLowerCase()}`}>
                        {company.status}
                      </span>
                    </td>
                    <td>
                      <div className="inline-actions">
                        {company.status === 'PENDING' && (
                          <>
                            <button type="button" onClick={() => updateStatus(company.id, 'APPROVED')} className="btn btn-success btn-compact">
                              Approve
                            </button>
                            <button type="button" onClick={() => updateStatus(company.id, 'REJECTED')} className="btn btn-secondary btn-compact">
                              Reject
                            </button>
                          </>
                        )}
                        <button type="button" onClick={() => handleDelete(company.id)} className="btn btn-danger btn-compact">
                          Delete
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
              <strong>No companies registered yet.</strong>
              Company records will appear here.
            </div>
          </div>
        )}
      </section>
    </>
  );
};

const ManageDrives = () => {
  const [drives, setDrives] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadDrives();
  }, []);

  const loadDrives = async () => {
    try {
      const response = await adminAPI.getAllDrives();
      setDrives(response.data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to load drives right now.' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this drive?')) {
      try {
        await adminAPI.deleteDrive(id);
        setMessage({ type: 'success', text: 'Drive deleted successfully.' });
        loadDrives();
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to delete drive.' });
      }
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <p className="page-eyebrow">Placement drives</p>
          <h1 className="page-title">Current drive oversight</h1>
          <p className="page-subtitle">
            Review active placement drives.
          </p>
        </div>
      </section>

      <section className="table-card">
        <div className="table-toolbar">
          <div>
            <p className="section-label">Drive directory</p>
            <h2 className="section-title">Published opportunities</h2>
            <p className="section-copy">{drives.length} drive{drives.length === 1 ? '' : 's'} currently visible in the portal.</p>
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
                  <th>Actions</th>
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
                      <button type="button" onClick={() => handleDelete(drive.id)} className="btn btn-danger btn-compact">
                        Delete
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
              <strong>No drives published yet.</strong>
              Drive records will appear here.
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AdminDashboard;
