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
// GET TASKS BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findById(id);
  res.json(task);
});
//PUT TASKS
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = await taskModel.findByIdAndUpdate(id, {
    title,
    description,
    completed,
  });
  const newTask = await taskModel.findById(id);
  res.json(newTask);
});
//DELETE TASKS
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findByIdAndDelete(id);
  res.json(task);
});
export default router;
