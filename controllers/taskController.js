const repository = require("../repositories/postgresRepository");

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
const getAllTasks = async (req, res) => {
  const tasks = await repository.getAllTasks();
  res.json(tasks);
};

// GET /tasks/:id
const getTaskById = async (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = await repository.getTaskById(taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${taskId} not found`,
    });
  }

  res.json(task);
};

// POST /tasks
const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required and must be a non-empty string",
    });
  }

  const newTask = await repository.createTask(title.trim());

  res.status(201).json(newTask);
};

// PUT /tasks/:id
const updateTask = async (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = await repository.getTaskById(taskId);

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
    updatedDone = done;
  }

  const updatedTask = await repository.updateTask(
    taskId,
    updatedTitle,
    updatedDone
  );

  res.json(updatedTask);
};

// DELETE /tasks/:id
const deleteTask = async (req, res) => {
  const taskId = parseInt(req.params.id);

  const deleted = await repository.deleteTask(taskId);

  if (!deleted) {
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