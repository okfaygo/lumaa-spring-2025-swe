import pool from "../config/db.js";

// Get All Tasks for Authenticated User
export const getTasks = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Query to get all tasks for the authenticated user
        const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create Task
export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        // Query to insert a new task for the authenticated user
        const result = await pool.query(
            "INSERT INTO tasks (user_id, title, description, is_complete) VALUES ($1, $2, $3, $4) RETURNING *",
            [userId, title, description || "", false]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Task
export const updateTask = async (req, res) => {
    const { title, description, is_complete } = req.body;
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        // Query to update an existing task for the authenticated user
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [title, description, is_complete, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        // Query to delete a task for the authenticated user
        const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
