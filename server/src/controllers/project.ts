import { Request, Response } from "express";
import { context } from "../../prisma/client";

const { prisma } = context;

const createProject = async (req: Request, res: Response): Promise<void> => {
  const { type, industry, todo } = req.body;
  const user: any = req.user;
  try {
    if (!user) throw new Error("Unauthorized");

    const project = await prisma.project.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        type: type,
        industry: industry,
        todos: {
          create: todo.map((t: any) => {
            return {
              type: t.type,
              quantity: t.quantity,
            };
          }),
        },
      },
    });

    if (!project) throw new Error("Error creating project");

    res.status(201).json({
      project,
      message: "Project created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req: Request, res: Response): Promise<void> => {
  const user: any = req.user;
  try {
    if (!user) throw new Error("Unauthorized");

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
      },
      include: {
        todos: true,
        deliverables: true,
        paymentTimeline: true,
        payments: true,
      },
    });

    if (!projects) throw new Error("No projects found");

    res.status(200).json({ projects });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        todos: true,
        deliverables: true,
        paymentTimeline: true,
        payments: true,
      },
    });

    if (!projects) throw new Error("No projects found");

    res.status(200).json({ projects });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateProjects = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { type, industry, budget } = req.body;

  try {
    const project = await prisma.project.update({
      where: {
        id: parseInt(id),
      },
      data: {
        type: type,
        industry: industry,
        budget: parseFloat(budget),
      },
    });
    if (!project) throw new Error("Error updating project");

    res.status(200).json({
      project,
      message: "Project updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export {
  createProject,
  getProjects,
  getAllProjects,
  updateProjects,
};
