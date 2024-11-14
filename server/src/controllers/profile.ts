import { Request, Response } from "express";
import { context } from "../../prisma/client";
import crypto from "crypto";
import mailjet from "../utils/mailjet";
import onboardingEmail from "../utils/emailTemplates/onboarding";
import dotenv from 'dotenv'

dotenv.config()

const { prisma } = context;

const createProfile = async (req: Request, res: Response): Promise<void> => {
  const { name, company, position, refferedBy } = req.body;
  const user: any = req.user;
  if (!name || !company || !position) {
    res.status(400).json({ message: "Atleast one required field is missing" });
    return;
  }
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    if (refferedBy) {
      const reffererUser = await prisma.profile.findFirst({
        where: { refferalCode: refferedBy },
      });
      if (!reffererUser) {
        res.status(404).json({ message: "Refferer not found" });
        return;
      }
      await prisma.refferal.create({
        data: {
          user: { connect: { id: reffererUser.userId } },
          refferedUser: Number(user.id),
        },
      });
    }

    const profileExists = await prisma.profile.findFirst({
      where: { userId: user.id },
    });
    if (profileExists) {
      res.status(400).json({ message: "Profile already exists" });
      return;
    }
    const profile = await prisma.profile.create({
      data: {
        name,
        company,
        position,
        user: { connect: { id: user.id } },
        refferalCode: crypto.randomBytes(3).toString("hex").toUpperCase(),
        refferedBy: refferedBy ? refferedBy : null,
      },
    });
    if (!profile) throw new Error("Profile creation failed");

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
                Email: user.email,
              },
            ],
            Subject: "Welcome To Andika",
            HTMLPart: onboardingEmail(),
          },
        ],
      });

    emailRequest
      .then(async () => {
        res.status(201).json({ message: "Profile created successfully", redirectUrl: '/dashboard' });
      })
      .catch(async () => {
        throw new Error("Error sending confirmation email");
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
  const user: any = req.user;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const profile = await prisma.profile.findFirst({
      where: { userId: user.id },
    });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    res.status(200).json({ profile });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { createProfile, getProfile };
