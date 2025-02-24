import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Tasks = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "Description 1", is_complete: false },
    ]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    // Check if user is authenticated on component mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!storedUser || !storedUser.token) {
            setAuthenticated(false);
            setLoading(false);
            return;
        }

        console.log("User is authenticated:", storedUser.token);
        setAuthenticated(true);
        fetchTasks(storedUser.token);
    }, []);

    // Fetch tasks from the server
    const fetchTasks = async (token) => {
        try {
            const response = await fetch("http://localhost:5000/tasks/tasks", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            console.log("Response:", data);
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error("Received invalid data format.");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission for adding or editing a task
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) return;

        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!storedUser || !storedUser.token) return;

        try {
            if (isEditing) {
                const response = await axios.put(
                    `http://localhost:5000/tasks/tasks/${editId}`,
                    { title: taskTitle, description: taskDescription },
                    { headers: { Authorization: `Bearer ${storedUser.token}` } }
                );
                setTasks(tasks.map((task) => (task.id === editId ? response.data : task)));
                setIsEditing(false);
                setEditId(null);
            } else {
                const response = await axios.post(
                    "http://localhost:5000/tasks/tasks",
                    { title: taskTitle, description: taskDescription },
                    { headers: { Authorization: `Bearer ${storedUser.token}` } }
                );
                setTasks([...tasks, response.data]);
            }
        } catch (error) {
            console.error("Error saving task:", error.response?.data || error.message);
        }

        setTaskTitle("");
        setTaskDescription("");
    };

    // Edit a task
    const editTask = (id) => {
        const editingTask = tasks.find((t) => t.id === id);
        setTaskTitle(editingTask.title);
        setTaskDescription(editingTask.description);
        setIsEditing(true);
        setEditId(id);
    };

    // Delete a task
    const deleteTask = async (id) => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!storedUser || !storedUser.token) return;

        try {
            await axios.delete(`http://localhost:5000/tasks/tasks/${id}`, {
                headers: { Authorization: `Bearer ${storedUser.token}` },
            });
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error.response?.data || error.message);
        }
    };

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setAuthenticated(false);
        navigate("/register");
    };

    // Toggle task completion status
    const toggleTaskCompletion = async (id, currentStatus) => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!storedUser || !storedUser.token) return;
    
        try {
            const response = await axios.patch(
                `http://localhost:5000/tasks/tasks/${id}`,
                { is_complete: !currentStatus }, // Toggle status
                { headers: { Authorization: `Bearer ${storedUser.token}` } }
            );
    
            // Update the tasks state with the new status
            setTasks(tasks.map(task => 
                task.id === id ? { ...task, is_complete: response.data.is_complete } : task
            ));
        } catch (error) {
            console.error("Error updating task status:", error.response?.data || error.message);
        }
    };
    
    // Show loading message while fetching data
    if (loading) return <h1>Loading...</h1>;
    
    // Redirect to register page if not authenticated
    if (!authenticated) {
        console.log("Logging out...");
        return <Navigate replace to="/register" />;
    }

    return (
        <div>
            <h1>Tasks</h1>
            <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white" }}>
                Logout
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Task Title"
                />
                <input
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Task Description"
                />
                <button type="submit">{isEditing ? "Update Task" : "Add Task"}</button>
            </form>
            <div>
                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map(({ id, title, description, is_complete }) => (
                        <div key={id}>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p>Status: {is_complete === true ? "Completed" : "Not Completed"}</p>
                            <button onClick={() => editTask(id)}>Edit</button>
                            <button onClick={() => toggleTaskCompletion(id, is_complete)}>
                                Mark as {is_complete ? "Incomplete" : "Complete"}
                            </button>
                            <button onClick={() => deleteTask(id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
        </div>
    );
};

export default Tasks;
