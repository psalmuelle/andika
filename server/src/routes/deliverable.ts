import { Router } from "express";
import { createDeliverable, updateDeliverable, deleteDeliverable } from "../controllers/deliverable";
import { checkAdminAuth } from "../controllers/admin";

const router = Router();

router.post('/create', checkAdminAuth, createDeliverable)
router.put('/update/:id', checkAdminAuth, updateDeliverable)
router.delete('/delete/:id', checkAdminAuth, deleteDeliverable)

export default router;