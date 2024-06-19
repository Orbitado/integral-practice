import { Router } from "express";
import { taskModel } from "../models/task.model.js";

const router = Router();

// GET TASKS
router.get("/", async (req, res) => {
  const tasks = await taskModel.find();
  res.json(tasks);
});
// POST TASKS
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new taskModel({ title, description });
    await newTask.save();
    res.status(201).json({
      tasks: {
        title,
        description,
        completed: false,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: `Error ${err.message}`,
    });
  }
});

export default router;
