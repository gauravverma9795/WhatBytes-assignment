// src/controllers/projectController.js
const prisma = require('../prismaClient');

exports.createProject = async (req, res) => {
  const { name, description, status } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        userId: req.user.id,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { name, description, status } = req.body;
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is the owner
    if (project.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name: name || project.name,
        description: description || project.description,
        status: status || project.status,
      },
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is the owner
    if (project.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};