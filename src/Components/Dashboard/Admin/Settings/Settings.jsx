// pages/Settings.jsx
import React from "react";
import ProfileInfo from "./ProfileInfo";
import SecuritySettings from "./SecuritySettings";
import NotificationPreferences from "./NotificationPreferences";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] p-6 ">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfileInfo />
        </div>
        <SecuritySettings />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NotificationPreferences />
        </div>
      </div>
    </div>
  );
};

export default Settings;
