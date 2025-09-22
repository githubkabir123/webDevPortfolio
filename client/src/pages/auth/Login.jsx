import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.data?.message) setError(response.data?.message);
      if (response.data?.user) {
        await login(response.data.user, response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-gray-900 to-black dark:from-gray-900 dark:via-black dark:to-purple-900 transition-colors duration-300">
      {/* Animated background circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 text-gray-100 dark:bg-gray-200 dark:text-gray-900 shadow-md hover:scale-105 transition-transform"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-300 dark:border-gray-700"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4">
          MERN Stack Developer Login
        </p>
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md font-medium shadow-lg hover:opacity-90 transition-opacity"
          >
            Login
          </motion.button>
        </form>

        {/* Showcase skills */}
        <div className="mt-8 text-center">
          <h3 className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Built with
          </h3>
          <div className="flex justify-center gap-4">
            <motion.img
              whileHover={{ scale: 1.2 }}
              src="/mongodb.svg"
              alt="MongoDB"
              className="w-8 h-8"
            />
            <motion.img
              whileHover={{ scale: 1.2 }}
              src="/express.svg"
              alt="Express"
              className="w-8 h-8"
            />
            <motion.img
              whileHover={{ scale: 1.2 }}
              src="/react.png"
              alt="React"
              className="w-8 h-8"
            />
            <motion.img
              whileHover={{ scale: 1.2 }}
              src="/node.png"
              alt="Node.js"
              className="w-8 h-8"
            />
            <motion.img
              whileHover={{ scale: 1.2 }}
              src="/tailwind.webp"
              alt="Tailwind CSS"
              className="w-8 h-8"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
