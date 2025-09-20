import React from "react";
import { User, Layers, Settings,LockKeyhole, X } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { key: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { key: "projects", label: "Projects", icon: <Layers className="w-4 h-4" /> },
    { key: "skills", label: "Skills", icon: <Settings className="w-4 h-4" /> },
    { key: "password", label: "Password Update", icon: <LockKeyhole className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 transform transition-transform z-50
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header for mobile */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${
                  activeTab === item.key
                    ? "bg-primary text-red"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
