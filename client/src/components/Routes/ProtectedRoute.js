import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/loading";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser()); // ✅ Fetch user only if needed
    }
  }, [dispatch, token, user]);

  if (loading) return <Loading />;
  if (!token || !user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
