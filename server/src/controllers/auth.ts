import { Request, Response } from "express";
import { context } from "../../prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import mailjet from "../utils/mailjet";
import verifyEmailTemplate from "../utils/emailTemplates/verifyEmail";
import dotenv from "dotenv";

dotenv.config();

const { prisma } = context;

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomInt(100000, 1000000).toString();

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationCode,
      },
    });

    if (!newUser) throw new Error("An error occured while creating user");

    // Send verification email
    const emailRequest = mailjet
      .post("send", {
        version: "v3.1",
      })
      .request({
        Messages: [
          {
            From: {
              Email: "psalmuelle1@gmail.com",
              Name: "Andika Team",
            },
            To: [
              {
                Email: email,
              },
            ],
            Subject: "Confirm Your Email for Andika",
            HTMLPart: verifyEmailTemplate(verificationCode),
          },
        ],
      });

    emailRequest
      .then(async () => {
        res.status(201).json({
          message: "User created successfully: Verification Email Sent!",
        });
      })
      .catch(async () => {
        await prisma.user.delete({ where: { email } });
        throw new Error("An error occured while sending verification email");
      });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    res.status(400).json({ error: "Email and verification code are required" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) res.status(404).json({ error: "User does not exist" });

    if (user && user.verified === true) {
      res.status(400).json({ error: "User already verified" });
      return;
    }

    if (user?.verificationCode !== verificationCode) {
      res.status(400).json({ error: "Invalid verification code" });
      return;
    }

    await prisma.user.update({
      where: { email },
      data: { verified: true, verificationCode: null },
    });

    res.status(200).json({ message: "User verified successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: any = req.user;
    if (!user) throw new Error("An error occured while logging in");

    const userHasProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (userHasProfile) {
      res.redirect(`${process.env.FRONTEND_URI}/dashboard`);
      return;
    }
    res.redirect(`${process.env.FRONTEND_URI}/profile`);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: any = req.user;
    if (!user) throw new Error("An error occured while logging in");

    const userHasProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (!userHasProfile) {
      res.status(200).json({
        message: "User logged in successfully",
        redirectUrl: "/profile",
      });

      return;
    }
    res.status(200).json({
      message: "User onboarding completed successfully",
      redirectUrl: "/dashboard",
    });
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;
    user
      ? res.status(200).json({ user })
      : res.status(401).json({ message: "No active user" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const resendVerificationEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(404).json({ error: "User does not exist" });
    return;
  }
  if (user.verified || !user.verificationCode) {
    res.status(400).json({ error: "User already verified" });
    return;
  }

  // Send verification email
  const emailRequest = mailjet
    .post("send", {
      version: "v3.1",
    })
    .request({
      Messages: [
        {
          From: {
            Email: "psalmuelle1@gmail.com",
            Name: "Andika Team",
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: "Confirm Your Email for Andika",
          HTMLPart: verifyEmailTemplate(user.verificationCode),
        },
      ],
    });

  emailRequest
    .then(async () => {
      res.status(201).json({
        message: "Verification code sent!",
      });
    })
    .catch(async () => {
      throw new Error("An error occured while sending verification email");
    });
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) res.status(401).json({ error: "Unauthorized" });
    req.logout((error) => {
      if (error) res.status(500).json({ error: error.message });
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getUser,
  loginUser,
  resendVerificationEmail,
  createUser,
  logoutUser,
  verifyEmail,
  googleAuth,
};
