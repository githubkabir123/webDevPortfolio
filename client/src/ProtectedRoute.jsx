// src/routes/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // লগইন না থাকলে login এ পাঠাবে
    return <Navigate to="/login" replace />;
  }

  return children;
}
