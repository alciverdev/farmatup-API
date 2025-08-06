import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../database/pgConfig";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const {
      fullname,
      email,
      password,
      role,
      num_cel,
      id_type,
      num_id,
      image,
      branch_id,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate branch
    let branchConnect = undefined;
    if (branch_id) {
      const branchExists = await prisma.branch.findUnique({
        where: { id: branch_id },
      });
      if (!branchExists) {
        return res.status(404).json({ error: "Branch not found" });
      }
      branchConnect = { connect: { id: branch_id } };
    }

    const allowedRoles = ["ADMIN", "EMPLOYED"];
    if (!allowedRoles.includes(role?.toUpperCase())) {
      return res
        .status(400)
        .json({ error: "Invalid role. Must be ADMIN or EMPLOYED" });
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
        num_cel,
        id_type,
        num_id,
        image,
        ...(branchConnect && { branch: branchConnect }),
      },
    });

    // Return the user data
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error: any) {
    console.error("Error al registrar usuario:", error);
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Este usuario ya existe" });
    }
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        num_cel: true,
        id_type: true,
        num_id: true,
        image: true,
        branch: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        num_cel: true,
        id_type: true,
        num_id: true,
        image: true,
        branch: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      fullname,
      email,
      password,
      role,
      num_cel,
      id_type,
      num_id,
      image,
      branch_id,
    } = req.body;

    const data: any = {};

    if (fullname) data.fullname = fullname;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);
    if (num_cel) data.num_cel = num_cel;
    if (id_type) data.id_type = id_type;
    if (num_id) data.num_id = num_id;
    if (image) data.image = image;

    if (role) {
      const allowedRoles = ["ADMIN", "EMPLOYED"];
      const roleUpper = role.toUpperCase();
      if (!allowedRoles.includes(roleUpper)) {
        return res
          .status(400)
          .json({ error: "Invalid role. Must be ADMIN or EMPLOYED" });
      }
      data.role = roleUpper;
    }

    if (branch_id) {
      const branchExists = await prisma.branch.findUnique({
        where: { id: branch_id },
      });
      if (!branchExists) {
        return res.status(404).json({ error: "Branch not found" });
      }
      data.branch = { connect: { id: branch_id } };
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    res
      .status(200)
      .json({ message: "Usuario actualizado correctamente", updatedUser });
  } catch (error: any) {
    console.error("Error al actualizar usuario:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    res
      .status(200)
      .json({ message: "Usuario eliminado correctamente", deletedUser });
  } catch (error: any) {
    console.error("Error al eliminar usuario:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
