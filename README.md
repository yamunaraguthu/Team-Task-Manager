# Team Task Manager Application

## Project Overview

Team Task Manager is a full-stack MERN application developed to manage projects and tasks with role-based access control. The application allows users to create projects, assign tasks, update task status, and track progress efficiently.

The application supports two roles:

* Admin
* Member

Admins can manage tasks and projects, while Members can track and update task progress.

---

## Features

### Authentication

* User Signup
* User Login
* JWT Authentication

### Project & Team Management

* Create Projects
* Manage Team Tasks

### Task Management

* Create Tasks
* Assign Tasks
* Update Task Status
* Track Task Progress

### Dashboard

* View Tasks
* Task Status Tracking
* Overdue Task Identification

### Role-Based Access

* Admin Role
* Member Role
* Protected Routes

---

## Technologies Used

### Frontend

* React.js
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* JWT
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Railway

---

## Project Structure

Team-Task-Manager
│
├── frontend

│   ├── src

│   ├── public

│   ├── package.json
│

├── backend

│   ├── models

│   ├── routes

│   ├── middleware

│   ├── server.js

│   ├── package.json
│

├── README.md

---

## Installation & Setup

### Backend Setup

1. Open backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start backend server:

```bash
node server.js
```

---

### Frontend Setup

1. Open frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run frontend:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file inside backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Live Deployment

### Frontend

[https://team-task-manager-production-1b72.up.railway.app](https://team-task-manager-production-1b72.up.railway.app)

### Backend

[https://dynamic-amazement-production-132f.up.railway.app](https://dynamic-amazement-production-132f.up.railway.app)

---

## Author

Yamuna Raguthu
