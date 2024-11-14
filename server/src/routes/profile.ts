import { createProfile, getProfile } from "../controllers/profile";
import { Router } from "express";

const router = Router();

router.post("/", createProfile);
router.get("/", getProfile);

export default router;
