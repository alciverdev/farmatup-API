import { Router } from "express";
import {
  RegisterController,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/register.controllers";

const router = Router();

router.post("/", RegisterController);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
