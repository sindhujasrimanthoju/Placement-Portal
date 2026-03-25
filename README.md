# College Placement Management Portal

A full-stack web application for managing college placement activities with three user roles: Admin, Student, and Company.

## Technology Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Spring Boot 3.2, Spring Security, JWT
- **Database**: MySQL 8
- **ORM**: JPA/Hibernate

## Features

### Admin Module
- Login and dashboard
- Manage students (add, update, delete)
- Manage companies (approve, reject, delete)
- Manage placement drives
- View all applications

### Student Module
- Registration and login
- Profile management
- View eligible placement drives
- Apply to drives
- Track application status

### Company Module
- Registration and login
- Post job drives
- View student applications
- Shortlist or reject students

## Project Structure

```
college-placement-portal/
├── backend/                    # Spring Boot application
│   ├── src/main/java/com/placement/
│   │   ├── config/            # Security & JWT configuration
│   │   ├── controller/        # REST controllers
│   │   ├── model/             # JPA entities
│   │   ├── repository/        # JPA repositories
│   │   ├── service/           # Business logic
│   │   └── PlacementApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                   # React application
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── database/
    └── schema.sql
```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8 or higher
- Maven 3.6 or higher

### Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE placement_portal;
```

2. Run the schema:
```bash
mysql -u root -p placement_portal < database/schema.sql
```

3. Update database credentials in `backend/src/main/resources/application.properties`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register/student` - Student registration
- `POST /api/auth/register/company` - Company registration

### Student APIs
- `GET /api/student/profile` - Get student profile
- `PUT /api/student/profile` - Update profile
- `GET /api/student/drives` - Get eligible drives
- `POST /api/student/apply/{driveId}` - Apply to drive
- `GET /api/student/applications` - Get applications

### Company APIs
- `GET /api/company/profile` - Get company profile
- `POST /api/company/drives` - Create drive
- `GET /api/company/drives` - Get company drives
- `GET /api/company/drives/{driveId}/applications` - Get applications
- `PUT /api/company/applications/{id}` - Update application status

### Admin APIs
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Add student
- `PUT /api/admin/students/{id}` - Update student
- `DELETE /api/admin/students/{id}` - Delete student
- `GET /api/admin/companies` - Get all companies
- `PUT /api/admin/companies/{id}/status` - Update company status
- `DELETE /api/admin/companies/{id}` - Delete company
- `GET /api/admin/drives` - Get all drives
- `POST /api/admin/drives` - Create drive
- `PUT /api/admin/drives/{id}` - Update drive
- `DELETE /api/admin/drives/{id}` - Delete drive
- `GET /api/admin/applications` - Get all applications

## Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

Note: You need to manually hash the password using BCrypt and update it in the database.

## Security

- JWT-based authentication
- Password encryption using BCrypt
- Role-based access control
- CORS configuration for frontend-backend communication

## Database Schema

### Tables
- `users` - User authentication
- `students` - Student profiles
- `companies` - Company profiles
- `drives` - Placement drives
- `applications` - Student applications

## Development Notes

- Backend runs on port 8080
- Frontend runs on port 3000
- JWT token expires in 24 hours
- File upload directory: `./uploads/resumes`

## Future Enhancements

- Resume upload functionality
- Email notifications
- Advanced search and filters
- Analytics dashboard
- Interview scheduling
- Bulk operations

## License

MIT License
