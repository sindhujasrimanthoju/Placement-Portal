# How to Run - College Placement Portal

## Prerequisites

**IMPORTANT:** Java 25 has compatibility issues with Maven. You need Java 17 or 21.

Download Java 21 (LTS): https://www.oracle.com/java/technologies/downloads/#java21

After installing, set JAVA_HOME:
```cmd
setx JAVA_HOME "C:\Program Files\Java\jdk-21"
```

## Step 1: Setup Database

Open MySQL Workbench:
1. Connect to localhost
2. File → Open SQL Script
3. Select `setup-db-direct.sql`
4. Click Execute (⚡)

## Step 2: Configure Backend

Edit `backend/src/main/resources/application.properties`

Update line 3 with your MySQL password:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

## Step 3: Start Backend

```cmd
cd backend
mvnw.cmd spring-boot:run
```

Wait for: "Started PlacementApplication"

## Step 4: Start Frontend (if not running)

```cmd
cd frontend
npm start
```

## Access Application

- Frontend: http://localhost:3000
- Backend: http://localhost:8081

## Default Login

- Username: `admin`
- Password: `admin123`

## Notes

- Backend runs on port 8081 (changed from 8080 due to Oracle conflict)
- Frontend already configured to use port 8081
- Java 25 is NOT compatible - use Java 17 or 21
