import React, { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import ProjectManager from "../components/ProjectManager";
import SkillManager from "../components/SkillManager";
import PasswordUpdate from "../components/PasswordUpdate";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar (collapsible on mobile) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "projects" && <ProjectManager />}
          {activeTab === "skills" && <SkillManager />}
          {activeTab === "password" && <PasswordUpdate />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
