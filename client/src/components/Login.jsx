import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import "../App.css";

function Login() {
    // Initialize form handling with react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
        
            if (response.ok) {
                console.log("Result:", result);
                const storedUser = {
                    currentUser: result.user,
                    token: result.token,
                };
                // Store user data in localStorage
                localStorage.setItem("currentUser", JSON.stringify(storedUser));
                // Redirect to tasks page
                navigate("/tasks");
            } else {
                // Show error message if login fails
                alert(result.message);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <>
            <p className="title">Login Form</p>

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username", { required: true })} placeholder="Username" />
                {errors.username && <span style={{ color: "red" }}>Username is required</span>}

                <input type="password" {...register("password", { required: true })} placeholder="Password" />
                {errors.password && <span style={{ color: "red" }}>Password is required</span>}

                <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    );
}

export default Login;
