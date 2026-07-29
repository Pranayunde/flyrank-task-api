const db = require("../db");

// GET /
const getHome = (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0.0",
    description: "Simple CRUD API built with Express.js",
  });
};

// GET /health
const getHealth = (req, res) => {
  res.json({
    status: "ok",
  });
};

// GET /tasks
const getAllTasks = (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();

  const formattedTasks = tasks.map(task => ({
    id: task.id,
    title: task.title,
    done: Boolean(task.done),
  }));

  res.json(formattedTasks);
};

// GET /tasks/:id
const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${taskId} not found`,
    });
  }

  task.done = Boolean(task.done);

  res.json(task);
};

// POST /tasks
const createTask = (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required and must be a non-empty string",
    });
  }

  const result = db
    .prepare("INSERT INTO tasks (title, done) VALUES (?, ?)")
    .run(title.trim(), 0);

  const newTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  newTask.done = Boolean(newTask.done);

  res.status(201).json(newTask);
};

// PUT /tasks/:id
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${taskId} not found`,
    });
  }

  const { title, done } = req.body;

  let updatedTitle = task.title;
  let updatedDone = task.done;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        error: "Title must be a non-empty string",
      });
    }
    updatedTitle = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== "boolean") {
      return res.status(400).json({
        error: "Done must be true or false",
      });
    }
    updatedDone = done ? 1 : 0;
  }

  db.prepare(
    "UPDATE tasks SET title = ?, done = ? WHERE id = ?"
  ).run(updatedTitle, updatedDone, taskId);

  const updatedTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(taskId);

  updatedTask.done = Boolean(updatedTask.done);

  res.json(updatedTask);
};

// DELETE /tasks/:id
const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);

  const result = db
    .prepare("DELETE FROM tasks WHERE id = ?")
    .run(taskId);

  if (result.changes === 0) {
    return res.status(404).json({
      error: `Task ${taskId} not found`,
    });
  }

  res.status(204).send();
};

module.exports = {
  getHome,
  getHealth,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};