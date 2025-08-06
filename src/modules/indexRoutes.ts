import { Router } from "express";
import UserRouter from "./register/routers/register.routers";
const router = Router();

router.use("/users", UserRouter);

export default router;
