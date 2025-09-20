import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/api";

const SkillManager = () => {
  const { data, fetchDashboardData } = useAuth();
  const [updateMode, setUpdateMode] = useState(false);
  const [form, setForm] = useState({ category: "", items: "" });

  // Add Skill
  const addSkill = async () => {
    if (form.category.trim() === "" || form.items.trim() === "") {
      return alert("Please fill in both fields before adding a skill.");
    }

    await axiosClient.post("/api/skills", {
      ...form,
      items: form.items.split(",").map((i) => i.trim()),
    });
    fetchDashboardData();
    setForm({ category: "", items: "" });
  };

  // Delete Skill
  const deleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    await axiosClient.delete(`/api/skills/${id}`);
    fetchDashboardData();
  };

  // Update Skill
  const updateSkill = async (id, updatedSkill) => {
    if (form.category.trim() === "" || form.items.trim() === "") {
      return alert("Please fill in both fields before updating a skill.");
    }

    try {
      await axiosClient.put(`/api/skills/${id}`, updatedSkill, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchDashboardData();
      setForm({ category: "", items: "" });
      setUpdateMode(false);
    } catch (error) {
      console.error("Error updating skill:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Manage Skills
      </h2>

      {/* Form Section */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <input
          placeholder="Category (e.g., Frontend, Backend)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-3 rounded-lg focus:ring focus:ring-primary w-full dark:bg-gray-700 dark:text-gray-100"
        />

        <input
          placeholder="Items (comma separated, e.g., React, Node.js)"
          value={form.items}
          onChange={(e) => setForm({ ...form, items: e.target.value })}
          className="border p-3 rounded-lg focus:ring focus:ring-primary w-full dark:bg-gray-700 dark:text-gray-100"
        />

        <div className="col-span-2 flex justify-end gap-3">
          {updateMode && (
            <button
              onClick={() => {
                setUpdateMode(false);
                setForm({ category: "", items: "" });
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          )}

          <button
            onClick={() => {
              !updateMode ? addSkill() : updateSkill(form._id, form);
            }}
            className="bg-primary hover:bg-primary/80 text-green px-6 py-2 rounded-lg transition"
          >
            {!updateMode ? "Add Skill" : "Update Skill"}
          </button>
        </div>
      </div>

      {/* Skills Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Items
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.skills.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No skills added yet.
                </td>
              </tr>
            ) : (
              data.skills.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                    {s.category}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {s.items.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setForm({ ...s, items: s.items.join(", ") });
                        setUpdateMode(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSkill(s._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillManager;
