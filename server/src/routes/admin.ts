import { Router } from "express";
import {
  checkAdminAuth,
  createAdminUser,
  loginAdminUser,
  getAdmin,
} from "../controllers/admin";

const router = Router();

router.post("/register", createAdminUser);
router.post("/login", loginAdminUser);
router.get("/", checkAdminAuth, getAdmin);

export default router;
