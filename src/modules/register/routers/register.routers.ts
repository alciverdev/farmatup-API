import { Router } from "express";
import { RegisterController } from "../controllers/register.controllers";

const router = Router();

router.get("/", (req, res) => {
  res.send("Register page");
});

router.post("/", RegisterController);

export default router;
