import { Router } from "express";
import passport from "passport";
import "../utils/strategies/passport";
import {
  getUser,
  createUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  logoutUser,
  googleAuth,
} from "../controllers/auth";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/email", passport.authenticate("local"), loginUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URI}/auth/login?error=500`,
  }),
  googleAuth
);
router.post("/email/register", createUser);
router.post("/email/resend-otp", resendVerificationEmail);
router.post("/email/verify", verifyEmail);
router.get("/status", getUser);
router.post("/logout", logoutUser);

export default router;
