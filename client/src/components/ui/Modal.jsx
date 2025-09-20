import React from "react";

export default function Modal({ isOpen, onClose, description, darkMode }) {
  if (!isOpen) return null; // Don’t render if closed

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // close when clicking background
    >
      <div
        className={`
          p-6 rounded-xl max-w-md w-full shadow-lg transition
          ${darkMode 
            ? "bg-slate-800/50 border border-purple-500/20 text-white" 
            : "bg-white/50 border border-indigo-200/50 text-gray-900"}
        `}
        onClick={(e) => e.stopPropagation()} // prevent close on content click
      >
        <h2 className="text-lg font-semibold mb-3">Project Description</h2>
        <p className="text-sm leading-relaxed">{description}</p>
        <button
          onClick={onClose}
          className={`
            mt-4 px-4 py-2 rounded-md font-medium transition
            ${darkMode 
              ? "bg-purple-600 hover:bg-purple-700 text-white" 
              : "bg-indigo-500 hover:bg-indigo-600 text-white"}
          `}
        >
          Close
        </button>
      </div>
    </div>
  );
}
