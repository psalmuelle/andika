import { Request, Response } from "express";
import { context } from "../../prisma/client";

const { prisma } = context;

const createDeliverable = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId, type, title, description, content, status, eta } =
    req.body;

  if (!projectId || !type || !title || !description || !content || !status) {
    res.status(400).json({ message: "Atleast one required field is missing" });
    return;
  }
  try {
    const deliverable = await prisma.deliverable.create({
      data: {
        projectId,
        type,
        title,
        description,
        content,
        status,
        eta,
      },
    });
    if (!deliverable) throw new Error("Deliverable creation failed");
    res.status(201).json({
      deliverable,
      message: "Deliverable created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateDeliverable = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { projectId, type, title, description, content, status, eta } =
    req.body;

  try {
    const deliverable = await prisma.deliverable.update({
      where: { id: Number(id) },
      data: {
        projectId,
        type,
        title,
        description,
        content,
        status,
        eta,
      },
    });
    if (!deliverable) throw new Error("Deliverable update failed");
    res.status(200).json({ message: "Deliverable updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDeliverable = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deliverable = await prisma.deliverable.delete({
      where: { id: Number(id) },
    });
    if (!deliverable) throw new Error("Deliverable deletion failed");
    res.status(200).json({ message: "Deliverable deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { createDeliverable, updateDeliverable, deleteDeliverable };
