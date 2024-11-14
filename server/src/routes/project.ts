import { Router } from "express";
import {
  createProject,
  getProjects,
  getAllProjects,
  updateProjects,
} from "../controllers/project";
import { checkAdminAuth } from "../controllers/admin";

const router = Router();

router.post("/create", createProject);
router.get("/", getProjects);
router.get("/all", checkAdminAuth, getAllProjects);
router.put("/update/:id", checkAdminAuth, updateProjects);

export default router;
