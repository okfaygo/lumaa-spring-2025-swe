import client from "../config/db.js";

// Task model with CRUD operations
const Task = {
    // Create a new task
    createTask: async (title, description, userId) => {
        const res = await client.query(
            "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
            [title, description, userId]
        );
        return res.rows[0];
    },

    // Get all tasks for a specific user
    getTasks: async (userId) => {
        const res = await client.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
        return res.rows;
    },

    // Update an existing task
    updateTask: async (id, title, description, is_complete) => {
        const res = await client.query(
            "UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 RETURNING *",
            [title, description, is_complete, id]
        );
        return res.rows[0];
    },

    // Delete a task
    deleteTask: async (id) => {
        const res = await client.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
        return res.rows[0];
    },
};

export default Task;
