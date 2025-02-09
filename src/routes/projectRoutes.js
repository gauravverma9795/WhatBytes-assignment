// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;