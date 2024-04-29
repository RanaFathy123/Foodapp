import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({loginData,children}) {
    if (localStorage.getItem("token") || loginData) return <Navigate to="/dashboard" />;
    else return children;
 
}
