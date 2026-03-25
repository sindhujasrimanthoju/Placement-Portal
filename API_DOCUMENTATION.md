# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "role": "ADMIN|STUDENT|COMPANY",
  "userId": 1
}
```

### 2. Student Registration
**POST** `/auth/register/student`

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "name": "string",
  "email": "string",
  "branch": "CSE|IT|ECE|MECH|CIVIL",
  "cgpa": "8.5",
  "year": "3"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "role": "STUDENT",
  "userId": 1
}
```

### 3. Company Registration
**POST** `/auth/register/company`

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "name": "string",
  "email": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "role": "COMPANY",
  "userId": 1
}
```

---

## Student Endpoints

### 1. Get Profile
**GET** `/student/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "branch": "CSE",
  "cgpa": 8.5,
  "year": 3,
  "skills": "Java, Python, React",
  "resumeUrl": null
}
```

### 2. Update Profile
**PUT** `/student/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Doe",
  "branch": "CSE",
  "cgpa": 8.5,
  "year": 3,
  "skills": "Java, Python, React"
}
```

### 3. Get Eligible Drives
**GET** `/student/drives`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "role": "Software Engineer",
    "salary": 1200000,
    "minCgpa": 7.5,
    "branchesAllowed": "CSE,IT",
    "yearAllowed": 4,
    "companyName": "Tech Corp",
    "applied": false
  }
]
```

### 4. Apply to Drive
**POST** `/student/apply/{driveId}`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "driveId": 1,
  "status": "APPLIED",
  "appliedAt": "2024-01-15T10:30:00"
}
```

### 5. Get Applications
**GET** `/student/applications`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "status": "APPLIED",
    "appliedAt": "2024-01-15T10:30:00",
    "role": "Software Engineer",
    "salary": 1200000,
    "companyName": "Tech Corp"
  }
]
```

---

## Company Endpoints

### 1. Get Profile
**GET** `/company/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "userId": 2,
  "name": "Tech Corp",
  "email": "hr@techcorp.com",
  "description": "Leading tech company",
  "status": "APPROVED"
}
```

### 2. Create Drive
**POST** `/company/drives`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "role": "Software Engineer",
  "salary": 1200000,
  "minCgpa": 7.5,
  "branchesAllowed": "CSE,IT,ECE",
  "yearAllowed": 4,
  "description": "Full-time position"
}
```

### 3. Get My Drives
**GET** `/company/drives`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "companyId": 1,
    "role": "Software Engineer",
    "salary": 1200000,
    "minCgpa": 7.5,
    "branchesAllowed": "CSE,IT,ECE",
    "yearAllowed": 4
  }
]
```

### 4. Get Applications for Drive
**GET** `/company/drives/{driveId}/applications`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "status": "APPLIED",
    "appliedAt": "2024-01-15T10:30:00",
    "studentName": "John Doe",
    "email": "john@example.com",
    "branch": "CSE",
    "cgpa": 8.5,
    "year": 4,
    "skills": "Java, Python"
  }
]
```

### 5. Update Application Status
**PUT** `/company/applications/{applicationId}`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "SHORTLISTED|REJECTED|SELECTED"
}
```

---

## Admin Endpoints

### 1. Get All Students
**GET** `/admin/students`

**Headers:** `Authorization: Bearer <token>`

### 2. Add Student
**POST** `/admin/students`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "name": "string",
  "email": "string",
  "branch": "CSE",
  "cgpa": "8.5",
  "year": "3"
}
```

### 3. Update Student
**PUT** `/admin/students/{id}`

**Headers:** `Authorization: Bearer <token>`

### 4. Delete Student
**DELETE** `/admin/students/{id}`

**Headers:** `Authorization: Bearer <token>`

### 5. Get All Companies
**GET** `/admin/companies`

**Headers:** `Authorization: Bearer <token>`

### 6. Update Company Status
**PUT** `/admin/companies/{id}/status`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "APPROVED|REJECTED|PENDING"
}
```

### 7. Delete Company
**DELETE** `/admin/companies/{id}`

**Headers:** `Authorization: Bearer <token>`

### 8. Get All Drives
**GET** `/admin/drives`

**Headers:** `Authorization: Bearer <token>`

### 9. Create Drive
**POST** `/admin/drives`

**Headers:** `Authorization: Bearer <token>`

### 10. Update Drive
**PUT** `/admin/drives/{id}`

**Headers:** `Authorization: Bearer <token>`

### 11. Delete Drive
**DELETE** `/admin/drives/{id}`

**Headers:** `Authorization: Bearer <token>`

### 12. Get All Applications
**GET** `/admin/applications`

**Headers:** `Authorization: Bearer <token>`

---

## Status Codes

- `200 OK` - Success
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Error Response Format

```json
{
  "error": "Error message description"
}
```
