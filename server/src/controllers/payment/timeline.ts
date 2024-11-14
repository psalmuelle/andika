import { Request, Response } from "express";
import { context } from "../../../prisma/client";

const { prisma } = context;

const createTimeline = async (req: Request, res: Response): Promise<void> => {
  const { projectId, percentage, amount, dueDate } = req.body;

  if (!projectId || !percentage || !amount || !dueDate) {
    res.status(400).json({ message: "Atleast one required field is missing" });
    return;
  }
  try {
    const timeline = await prisma.paymentTimeline.create({
      data: {
        projectId,
        percentage: parseFloat(percentage),
        amount: parseFloat(amount),
        dueDate,
      },
    });

    if (!timeline) throw new Error("Timeline creation failed");
    res.status(201).json({
      timeline,
      message: "Timeline created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateTimeline = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { projectId, percentage, amount, dueDate } = req.body;

  try {
    const timeline = await prisma.paymentTimeline.update({
      where: { id: parseInt(id) },
      data: {
        projectId,
        percentage: parseFloat(percentage),
        amount: parseFloat(amount),
        dueDate,
      },
    });
    if (!timeline) throw new Error("Timeline update failed");
    res.status(200).json({
      timeline,
      message: "Timeline updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTimeline = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    try {
        const timeline = await prisma.paymentTimeline.delete({
        where: { id: parseInt(id) },
        });
        if (!timeline) throw new Error("Timeline deletion failed");
        res.status(200).json({ message: "Timeline deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export { createTimeline, updateTimeline, deleteTimeline };