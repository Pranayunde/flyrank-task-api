const express = require("express");
const router = express.Router();

const {
  getHome,
  getHealth,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", getHome);
router.get("/health", getHealth);

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);

router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;