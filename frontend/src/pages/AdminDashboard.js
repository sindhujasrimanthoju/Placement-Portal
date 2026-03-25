import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
  return (
    <div>
      <Navbar title="Admin Dashboard" />
      <div className="container">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/students" element={<ManageStudents />} />
          <Route path="/companies" element={<ManageCompanies />} />
          <Route path="/drives" element={<ManageDrives />} />
        </Routes>
      </div>
    </div>
  );
};

const AdminHome = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="dashboard-grid">
        <Link to="/admin/students" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>Manage Students</h3>
            <p>👨‍🎓</p>
          </div>
        </Link>
        <Link to="/admin/companies" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>Manage Companies</h3>
            <p>🏢</p>
          </div>
        </Link>
        <Link to="/admin/drives" style={{ textDecoration: 'none' }}>
          <div className="stat-card">
            <h3>Manage Drives</h3>
            <p>📊</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    loadStudents();
  }, []);
  
  const loadStudents = async () => {
    try {
      const response = await adminAPI.getAllStudents();
      setStudents(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await adminAPI.deleteStudent(id);
        loadStudents();
      } catch (err) {
        alert('Failed to delete student');
      }
    }
  };
  
  return (
    <div className="card">
      <h2>Manage Students</h2>
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
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.branch}</td>
              <td>{student.cgpa}</td>
              <td>{student.year}</td>
              <td>
                <button onClick={() => handleDelete(student.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    loadCompanies();
  }, []);
  
  const loadCompanies = async () => {
    try {
      const response = await adminAPI.getAllCompanies();
      setCompanies(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const updateStatus = async (id, status) => {
    try {
      await adminAPI.updateCompanyStatus(id, status);
      loadCompanies();
    } catch (err) {
      alert('Failed to update status');
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await adminAPI.deleteCompany(id);
        loadCompanies();
      } catch (err) {
        alert('Failed to delete company');
      }
    }
  };
  
  return (
    <div className="card">
      <h2>Manage Companies</h2>
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
          {companies.map(company => (
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
                {company.status === 'PENDING' && (
                  <>
                    <button onClick={() => updateStatus(company.id, 'APPROVED')} 
                            className="btn btn-success" style={{ marginRight: '5px' }}>
                      Approve
                    </button>
                    <button onClick={() => updateStatus(company.id, 'REJECTED')} 
                            className="btn btn-danger" style={{ marginRight: '5px' }}>
                      Reject
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(company.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageDrives = () => {
  const [drives, setDrives] = useState([]);
  
  useEffect(() => {
    loadDrives();
  }, []);
  
  const loadDrives = async () => {
    try {
      const response = await adminAPI.getAllDrives();
      setDrives(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this drive?')) {
      try {
        await adminAPI.deleteDrive(id);
        loadDrives();
      } catch (err) {
        alert('Failed to delete drive');
      }
    }
  };
  
  return (
    <div className="card">
      <h2>Manage Placement Drives</h2>
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
          {drives.map(drive => (
            <tr key={drive.id}>
              <td>{drive.role}</td>
              <td>₹{drive.salary}</td>
              <td>{drive.minCgpa}</td>
              <td>{drive.branchesAllowed}</td>
              <td>{drive.yearAllowed}</td>
              <td>
                <button onClick={() => handleDelete(drive.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
