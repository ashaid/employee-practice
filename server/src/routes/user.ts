import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source/data-source";
import { User } from "../entity/User";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Get all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// Get user by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: parseInt(req.params.id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Error retrieving user" });
  }
});

// Create user
router.post("/", async (req, res) => {
  try {
    const { name, department } = req.body;

    if (!name || !department) {
      return res
        .status(400)
        .json({ message: "Name and department are required" });
    }

    const newUser = userRepository.create({ name, department });
    const result = await userRepository.save(newUser);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const { name, department } = req.body;
    const id = parseInt(req.params.id);

    if (!name || !department) {
      return res
        .status(400)
        .json({ message: "Name and department are required" });
    }

    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    userRepository.merge(user, { name, department });

    const result = await userRepository.save(user);
    res.json(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepository.remove(user);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;
