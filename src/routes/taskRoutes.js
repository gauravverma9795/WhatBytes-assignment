// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  filterTasks,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/projects/:projectId/tasks', authMiddleware, createTask);
router.get('/projects/:projectId/tasks', authMiddleware, getTasksByProject);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);
router.get('/', authMiddleware, filterTasks);

module.exports = router;