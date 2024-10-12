import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { checkLogin, selectUserLogged } from "../features/auth/authSlice";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectUserLogged);

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
