// components/SecuritySettings.jsx
import React from "react";

const SecuritySettings = () => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-lg w-full md:max-w-md">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <span className="text-xl text-purple-400">🛡️</span> Security
      </h2>
      <div className="flex flex-col gap-4">
        <input
          className="p-2 text-white rounded bg-slate-700"
          placeholder="Enter current password"
          type="password"
        />
        <input
          className="p-2 text-white rounded bg-slate-700"
          placeholder="Enter new password"
          type="password"
        />
        <input
          className="p-2 text-white rounded bg-slate-700"
          placeholder="Confirm new password"
          type="password"
        />
        <button className="px-4 py-2 mt-2 text-white rounded bg-gradient-to-r from-blue-600 to-teal-400 hover:opacity-90">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
