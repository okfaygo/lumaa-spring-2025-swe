import React from 'react';
import {useForm} from "react-hook-form";
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      // Send a POST request to your backend API (registration endpoint)
      const response = await axios.post('http://localhost:5000/auth/register', data);

      // Check if the response is successful
      if (response.data.user) {
        console.log('User registered successfully:', response.data);
        
        // Save user info (or token) to localStorage (e.g., after successful registration)
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect to login page (or another page)
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message || "Something went wrong");
  
        // Display error message to user
        alert(error.response.data.message || "Registration failed");
      } else {
        console.error("Request failed:", error.message);
      }
    }
  };


  return (
    <>
        <button onClick={() => navigate("/login")}>Login</button>
          <br />
          <p className="title">Registration Form</p>

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

export default App;
