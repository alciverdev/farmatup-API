import { Router } from "express";
import {
  RegisterController,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/register.controller";

const router = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - role
 *               - num_cel
 *               - id_type
 *               - num_id
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePass123
 *               role:
 *                 type: string
 *                 enum: [ADMIN, EMPLOYED]
 *                 example: ADMIN
 *               num_cel:
 *                 type: string
 *                 example: "3001234567"
 *               id_type:
 *                 type: string
 *                 example: CC
 *               num_id:
 *                 type: string
 *                 example: "1020304050"
 *               image:
 *                 type: string
 *                 nullable: true
 *                 example: https://example.com/avatar.jpg
 *               branch_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 userId:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Datos inválidos o rol incorrecto
 *       404:
 *         description: Branch no encontrada
 *       409:
 *         description: Usuario ya existe
 */
router.post("/", RegisterController);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   fullname:
 *                     type: string
 *                     example: Juan Pérez
 *                   email:
 *                     type: string
 *                     example: juan@example.com
 *                   role:
 *                     type: string
 *                     example: ADMIN
 *                   num_cel:
 *                     type: string
 *                     example: "3001234567"
 *                   id_type:
 *                     type: string
 *                     example: CC
 *                   num_id:
 *                     type: string
 *                     example: "1020304050"
 *                   image:
 *                     type: string
 *                     example: https://example.com/avatar.jpg
 *                   branch:
 *                     type: object
 *                     nullable: true
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Sucursal Centro
 */
router.get("/", getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", getUserById);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Actualizar un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, EMPLOYED]
 *               num_cel:
 *                 type: string
 *               id_type:
 *                 type: string
 *               num_id:
 *                 type: string
 *               image:
 *                 type: string
 *               branch_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado correctamente
 *                 updatedUser:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario o branch no encontrado
 */
router.patch("/:id", updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *                 deletedUser:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id", deleteUser);

export default router;
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         fullname:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           example: juan@example.com
 *         role:
 *           type: string
 *           example: ADMIN o EMPLOYED
 *         num_cel:
 *           type: string
 *           example: "3001234567"
 *         id_type:
 *           type: string
 *           example: CC
 *         num_id:
 *           type: string
 *           example: "1020304050"
 *         image:
 *           type: string
 *           example: https://example.com/avatar.jpg
 *         branch:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: Sucursal Centro
 */
