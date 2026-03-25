import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:8081/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  registerStudent: (data) => api.post('/auth/register/student', data),
  registerCompany: (data) => api.post('/auth/register/company', data),
};

// Student APIs
export const studentAPI = {
  getProfile: () => api.get('/student/profile'),
  updateProfile: (data) => api.put('/student/profile', data),
  getEligibleDrives: () => api.get('/student/drives'),
  applyToDrive: (driveId) => api.post(`/student/apply/${driveId}`),
  getApplications: () => api.get('/student/applications'),
};

// Company APIs
export const companyAPI = {
  getProfile: () => api.get('/company/profile'),
  createDrive: (data) => api.post('/company/drives', data),
  getMyDrives: () => api.get('/company/drives'),
  getApplicationsForDrive: (driveId) => api.get(`/company/drives/${driveId}/applications`),
  updateApplicationStatus: (applicationId, status) => 
    api.put(`/company/applications/${applicationId}`, { status }),
};

// Admin APIs
export const adminAPI = {
  getAllStudents: () => api.get('/admin/students'),
  addStudent: (data) => api.post('/admin/students', data),
  updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),
  
  getAllCompanies: () => api.get('/admin/companies'),
  updateCompanyStatus: (id, status) => 
    api.put(`/admin/companies/${id}/status`, { status }),
  deleteCompany: (id) => api.delete(`/admin/companies/${id}`),
  
  getAllDrives: () => api.get('/admin/drives'),
  createDrive: (data) => api.post('/admin/drives', data),
  updateDrive: (id, data) => api.put(`/admin/drives/${id}`, data),
  deleteDrive: (id) => api.delete(`/admin/drives/${id}`),
  
  getAllApplications: () => api.get('/admin/applications'),
};

export default api;
