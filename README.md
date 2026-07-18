# 🚀 FlyRank Task API

A simple CRUD (Create, Read, Update, Delete) REST API built using **Node.js** and **Express.js** as part of the FlyRank Backend Engineering Internship.

---

## 📌 Features

- Get all tasks
- Get task by ID
- Create a new task
- Update an existing task
- Delete a task
- Input validation
- Health check endpoint
- Swagger documentation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Swagger UI
- JavaScript

---

## 📁 Project Structure

```
task-api/
│
├── controllers/
│   └── taskController.js
├── routes/
│   └── taskRoutes.js
├── data/
│   └── tasks.js
├── server.js
├── swagger.js
├── package.json
└── README.md
```

---

## 🚀 Installation

```bash
git clone <repository-url>
cd task-api
npm install
node server.js
```

Server runs on:

```
http://localhost:3000
```

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | API Information |
| GET | /health | Health Check |
| GET | /tasks | Get All Tasks |
| GET | /tasks/:id | Get Task By ID |
| POST | /tasks | Create Task |
| PUT | /tasks/:id | Update Task |
| DELETE | /tasks/:id | Delete Task |

---

## 👨‍💻 Author

**Pranay Unde**

Backend Engineering Intern – FlyRank