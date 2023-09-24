import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { checkLogin, selectUserLogged } from "../features/auth/authSlice";

function ProtectedRoute() {
  const isLogged = useSelector(selectUserLogged);
  const dispatch = useDispatch();

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  } else {
    dispatch(checkLogin());
  }
  return <Outlet />;
}

export default ProtectedRoute;
