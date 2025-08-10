import { Router } from "express";
import UserRouter from "./register/routers/register.route";
const router = Router();

router.use("/users", UserRouter);

export default router;
