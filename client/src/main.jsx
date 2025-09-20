// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/" element={<App />} />
            
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>
);
