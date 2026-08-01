const db = require("../db");

// Get all tasks
function getAllTasks() {
  const tasks = db.prepare("SELECT * FROM tasks").all();

  return tasks.map(task => ({
    id: task.id,
    title: task.title,
    done: Boolean(task.done),
  }));
}

// Get one task
function getTaskById(id) {
  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(id);

  if (!task) return null;

  task.done = Boolean(task.done);
  return task;
}

// Create task
function createTask(title) {
  const result = db
    .prepare("INSERT INTO tasks (title, done) VALUES (?, ?)")
    .run(title, 0);

  return getTaskById(result.lastInsertRowid);
}

// Update task
function updateTask(id, title, done) {
  db.prepare(
    "UPDATE tasks SET title = ?, done = ? WHERE id = ?"
  ).run(title, done ? 1 : 0, id);

  return getTaskById(id);
}

// Delete task
function deleteTask(id) {
  const result = db
    .prepare("DELETE FROM tasks WHERE id = ?")
    .run(id);

  return result.changes > 0;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};