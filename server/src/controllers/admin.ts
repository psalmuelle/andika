import { Request, Response, NextFunction } from "express";
import { context } from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { prisma } = context;

const createAdminUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, passkey } = req.body;
    if (!email || !password || !passkey) {
      res
        .status(400)
        .json({ error: "Email, password and passkey are required" });
      return;
    }

    if (passkey !== process.env.ADMIN_PASSKEY) {
      res.status(400).json({ error: "Invalid passkey" });
      return;
    }

    const existingUser = await prisma.admin.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Admin already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (!newUser) throw new Error("An error occured while creating Admin User");

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while creating admin user" });
  }
};

const loginAdminUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const findAdmin = await prisma.admin.findUnique({ where: { email } });
    if (!findAdmin) throw new Error("Admin not found");

    const isPasswordValid = await bcrypt.compare(password, findAdmin.password);

    if (!isPasswordValid) throw new Error("Invalid Credentials");
    const token = jwt.sign({ admin: findAdmin }, process.env.JWT_SECRET!, {
      expiresIn: "12h",
    });
    res.status(200).json({
      token,
      message: "Admin logged in successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const checkAdminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) throw new Error("Invalid token");

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.admin.id },
    });
    if (!admin) throw new Error("Admin not found");
    req.body.admin = admin;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

const getAdmin = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      admin: req.body.admin,
      message: "Admin authenticated",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while authenticating admin" });
  }
};

export { createAdminUser, loginAdminUser, checkAdminAuth, getAdmin };
