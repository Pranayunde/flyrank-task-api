const tasks = require("../data/tasks");

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
  res.json(tasks);
};

// GET /tasks/:id
const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${taskId} not found`,
    });
  }

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

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.trim(),
    done: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

// PUT /tasks/:id
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${taskId} not found`,
    });
  }

  const { title, done } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        error: "Title must be a non-empty string",
      });
    }

    task.title = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== "boolean") {
      return res.status(400).json({
        error: "Done must be true or false",
      });
    }

    task.done = done;
  }

  res.json(task);
};

// DELETE /tasks/:id
const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);

  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({
      error: `Task ${taskId} not found`,
    });
  }

  tasks.splice(index, 1);

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