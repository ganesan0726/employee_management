import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../Context/storeContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // const userRole = localStorage.getItem("userRole");
  const { userRole } = useContext(StoreContext);

  if (!userRole) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
