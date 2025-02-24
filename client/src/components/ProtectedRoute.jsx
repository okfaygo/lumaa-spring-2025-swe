import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// ProtectedRoute component to guard routes that require authentication
const ProtectedRoute = () => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, render child routes; otherwise, redirect to login page
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;