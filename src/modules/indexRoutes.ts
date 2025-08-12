import { Router } from "express";
import authRoutes from "./auth.routes";
 // ajusta la ruta según tu estructura

const router = Router();

router.use("/api/auth", authRoutes);

export default router;
