import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserLogged } from "../features/auth/authSlice";

function ProtectedRoute() {
  const isLogged = useSelector(selectUserLogged);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
