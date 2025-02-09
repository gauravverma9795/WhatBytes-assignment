// src/controllers/taskController.js
const prisma = require('../prismaClient');

exports.createTask = async (req, res) => {
  const { title, description, status, assignedUserId } = req.body;
  const { projectId } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is the owner of the project
    if (project.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add tasks to this project' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        projectId,
        assignedUserId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.query;

  try {
    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    let tasks;

    if (status) {
      tasks = await prisma.task.findMany({
        where: {
          projectId,
          status,
        },
        include: {
          assignedUser: {
            select: { id: true, name: true },
          },
        },
      });
    } else {
      tasks = await prisma.task.findMany({
        where: { projectId },
        include: {
          assignedUser: {
            select: { id: true, name: true },
          },
        },
      });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status, assignedUserId } = req.body;
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        assignedUser: true,
        project: true,
      },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only assigned user or project owner can update the task
    if (
      task.assignedUserId !== req.user.id &&
      task.project.userId !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title || task.title,
        description: description || task.description,
        status: status || task.status,
        assignedUserId: assignedUserId || task.assignedUserId,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
      },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only assigned user or project owner can delete the task
    if (
      task.assignedUserId !== req.user.id &&
      task.project.userId !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterTasks = async (req, res) => {
  const { status, assignedUserId } = req.query;

  try {
    let tasks = await prisma.task.findMany({
      where: {
        ...(status && { status }),
        ...(assignedUserId && { assignedUserId }),
      },
      include: {
        assignedUser: {
          select: { id: true, name: true },
        },
        project: true,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};