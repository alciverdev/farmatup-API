import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../database/pgConfig";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, role, num_cel, id_type, num_id } =
      req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        role,
        num_cel,
        id_type,
        num_id,
      },
    });

    // Return the user data
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
