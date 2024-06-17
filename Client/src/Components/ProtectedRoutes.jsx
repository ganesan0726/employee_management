import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../Context/storeContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRoles } = useContext(StoreContext);

  if (!allowedRoles.includes(userRoles)) {
    // Redirect to home if the user doesn't have the right role
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
