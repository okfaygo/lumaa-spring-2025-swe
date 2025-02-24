import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv"; 

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an instance of express

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

// Import routes
import authRoutes from "./routes/authRoutes.js"; // Import authentication routes
import taskRoutes from "./routes/taskRoutes.js"; // Import task management routes

// Set up routes
app.use("/auth", authRoutes); // Use authentication routes for /auth endpoint
app.use("/tasks", taskRoutes); // Use task management routes for /tasks endpoint

const port = process.env.PORT || 5000; // Set the port from environment variable or default to 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Start the server and log the port
});
