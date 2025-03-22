import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../../redux/features/auth/authActions';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser()); // ✅ Correct way to fetch the user
    }
  }, [dispatch, token, user]); // ✅ Added dependency array to prevent multiple calls

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
