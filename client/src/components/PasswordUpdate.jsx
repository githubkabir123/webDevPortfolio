import React, { useState } from "react";
import { updatePassword } from "../api/api";
import { motion } from "framer-motion";

export default function PasswordUpdate() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      return setError("New password and confirm password do not match.");
    }

    try {
      setLoading(true);
      const res = await updatePassword(currentPassword, newPassword);
      setSuccess(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Update Password
      </h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <div>
          <label className="block text-sm dark:text-gray-300">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm dark:text-gray-300">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm dark:text-gray-300">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </motion.div>
  );
}
