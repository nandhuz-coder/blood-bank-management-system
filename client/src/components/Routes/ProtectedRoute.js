import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/loading"; // ✅ Loading component

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser()); // ✅ Fetch user if token exists
    }
  }, [dispatch, token, user]);

  // ✅ Show loading spinner while fetching user data
  if (loading) {
    return <Loading />;
  }

  // ✅ If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
