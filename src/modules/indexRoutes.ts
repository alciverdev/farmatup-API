import { Router } from "express";
import registerRouter from "./register/routers/register.routers";
const router = Router();

router.use("/users", registerRouter);

export default router;
