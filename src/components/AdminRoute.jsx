import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/Authentication";

function AdminRoute({ children }) {
  const { currentUser, admin } = useAuthContext();

  if (!currentUser || !admin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
