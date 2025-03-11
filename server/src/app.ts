import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source/data-source";
import userRoutes from "./routes/user";

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Initialize database connection then start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
