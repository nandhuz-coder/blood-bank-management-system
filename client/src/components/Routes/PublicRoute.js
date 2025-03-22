import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth); // ✅ Get token from Redux state

    if (token) {
        return <Navigate to="/" />;
    }

    return children; // ✅ No need for explicit else block
};

export default PublicRoute;
