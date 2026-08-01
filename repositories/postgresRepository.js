const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Get all tasks
async function getAllTasks() {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  return result.rows;
}

// Get one task
async function getTaskById(id) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [id]
  );

  return result.rows[0] || null;
}

// Create task
async function createTask(title) {
  const result = await pool.query(
    "INSERT INTO tasks(title, done) VALUES($1, false) RETURNING *",
    [title]
  );

  return result.rows[0];
}

// Update task
async function updateTask(id, title, done) {
  const result = await pool.query(
    "UPDATE tasks SET title=$1, done=$2 WHERE id=$3 RETURNING *",
    [title, done, id]
  );

  return result.rows[0];
}

// Delete task
async function deleteTask(id) {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id=$1",
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};