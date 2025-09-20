import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const { logout, data } = useAuth();
  const displayName = data?.user?.name || "Admin";

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (document.documentElement.classList.contains("dark") ? "dark" : "light")
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* User Info */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700">
          <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          <span className="text-sm text-gray-900 dark:text-gray-100">
            {displayName}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
}
