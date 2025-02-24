import express from "express";
import pool from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

// Route to get all tasks
router.get("/tasks", authMiddleware, getTasks);

// Route to create a new task
router.post("/tasks", authMiddleware, createTask);

// Route to update an existing task
router.put("/tasks/:id", authMiddleware, updateTask);

// Route to delete a task
router.delete("/tasks/:id", authMiddleware, deleteTask);

// Route to update task completion status
router.patch("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { is_complete } = req.body;

    try {
        const result = await pool.query(
            "UPDATE tasks SET is_complete = $1 WHERE id = $2 RETURNING *",
            [is_complete, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(result.rows[0]); // Send the updated task
    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
