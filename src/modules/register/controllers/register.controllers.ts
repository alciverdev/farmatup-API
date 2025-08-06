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
