import { Router } from "express";

import { LoginController } from "./login/controllers/login.controller";
import { RegisterController, getAllUsers, getUserById, updateUser, deleteUser } from "./register/controllers/register.controller";


const router = Router();

// Rutas de autenticación
router.post("/register", RegisterController);
router.post("/login", LoginController);

// Rutas de usuarios
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
