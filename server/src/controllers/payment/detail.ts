import { Request, Response } from "express";
import { context } from "../../../prisma/client";

const { prisma } = context;

const createPaymentDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, projectId, invoiceId, method, tnxId, status, amount, date } =
    req.body;
  if (
    !userId ||
    !projectId ||
    !invoiceId ||
    !method ||
    !tnxId ||
    !status ||
    !amount ||
    !date
  ) {
    res.status(400).json({ message: "Atleast one required field is missing" });
    return;
  }
  try {
    const paymentDetail = await prisma.paymentDetail.create({
      data: {
        userId,
        projectId,
        invoiceId,
        method,
        tnxId,
        status,
        amount: parseFloat(amount),
        date,
      },
    });

    if (!paymentDetail) throw new Error("Payment detail creation failed");
    res.status(201).json({
      paymentDetail,
      message: "Payment detail created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updatePaymentDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { userId, projectId, invoiceId, method, tnxId, status, amount, date } =
    req.body;

  try {
    const paymentDetail = await prisma.paymentDetail.update({
      where: { id: parseInt(id) },
      data: {
        userId,
        projectId,
        invoiceId,
        method,
        tnxId,
        status,
        amount: parseFloat(amount),
        date,
      },
    });
    if (!paymentDetail) throw new Error("Payment detail update failed");
    res.status(200).json({
      paymentDetail,
      message: "Payment detail updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deletePaymentDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const paymentDetail = await prisma.paymentDetail.delete({
      where: { id: parseInt(id) },
    });
    if (!paymentDetail) throw new Error("Payment detail deletion failed");
    res.status(200).json({ message: "Payment detail deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { createPaymentDetail, updatePaymentDetail, deletePaymentDetail };
