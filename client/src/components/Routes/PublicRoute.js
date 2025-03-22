import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
    const { token, user } = useSelector((state) => state.auth); // ✅ Get token & user state

    if (token && user) {
        return <Navigate to="/" replace />; // ✅ Prevents unnecessary history entries
    }

    return children;
};

export default PublicRoute;
