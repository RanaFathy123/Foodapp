import React, { Children } from "react";
import { Navigate } from "react-router-dom";

export default function AuthProtectedRoute({ loginData, children }) {
  if (localStorage.getItem("token") || loginData) return <Navigate to="/dashboard" />;
  else return children;
}