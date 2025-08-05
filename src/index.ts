import express from "express";
import { prisma } from "./database/pgConfig";
import app from "./app";

const PORT = process.env.PORT || 3000;

(async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
})();
