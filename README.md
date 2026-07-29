# Task API with SQLite

## Project Overview

This project is a RESTful CRUD Task API built using **Node.js**, **Express.js**, and **SQLite**.

In Assignment 1, tasks were stored in a JavaScript array, so all data was lost whenever the server restarted.

In this assignment, the in-memory storage has been replaced with a **SQLite database**, allowing tasks to be stored permanently.

The API endpoints remain exactly the same while only the storage layer has changed.

---

## Features

- Get all tasks
- Get a task by ID
- Create a new task
- Update an existing task
- Delete a task
- Automatic SQLite database creation
- Automatic table creation
- Sample tasks inserted only on the first run
- Data persists after server restart
- Swagger API Documentation

---

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- Swagger UI

---

## Why SQLite?

SQLite was chosen because it is:

- Lightweight
- Fast
- Easy to use
- Requires no separate database server
- Stores the entire database in a single file
- Perfect for small backend applications and learning SQL

---

## Database File

The database is automatically created when the application starts.

Database file:

```
tasks.db
```

Location:

```
task_api/tasks.db
```

---

## Project Structure

```
task_api
│
├── controllers/
│   └── taskController.js
│
├── routes/
│   └── taskRoutes.js
│
├── data/
│
├── db.js
├── server.js
├── swagger.js
├── package.json
├── tasks.db
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Go inside the project:

```bash
cd task_api
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Server URL:

```
http://localhost:3000
```

Swagger Documentation:

```
http://localhost:3000/docs
```

---

## API Endpoints

| Method | Endpoint | Description |
|----------|------------|----------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create new task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

## Example SQL Query

The following SQL query was executed using DB Browser for SQLite:

```sql
SELECT * FROM tasks;
```

Example Result:

```
id | title | done
------------------------
1  | Learn Express | 0
2  | Build CRUD API | 0
3  | Test API | 1
```

---

## Database Screenshot

Insert your screenshot here.

Example:

```
README.md
images/
   database.png
```

Then add:

```markdown
![Database Screenshot](images/database.png)
```

---

## Persistence

The SQLite database stores data permanently.

Restarting the server does **not** delete existing tasks.

The database and table are automatically created if they do not already exist.

Three sample tasks are inserted only during the first run.

---

## Author

Pranay Unde

FlyRank Backend Internship