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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Success
 *
 *   post:
 *     summary: Create a task
 *     responses:
 *       201:
 *         description: Created
 *
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *
 *   put:
 *     summary: Update task
 *     responses:
 *       200:
 *         description: Updated
 *
 *   delete:
 *     summary: Delete task
 *     responses:
 *       204:
 *         description: Deleted
 */