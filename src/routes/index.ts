import { Router } from "express";
import publicRoutes from "./public";
import agentRoutes from "./agent";
import inquiryRoutes from "./inquiry";
const router = Router();

router.use("/public", publicRoutes);
router.use("/agent", agentRoutes);
router.use("/inquiry", inquiryRoutes);

export default router;
