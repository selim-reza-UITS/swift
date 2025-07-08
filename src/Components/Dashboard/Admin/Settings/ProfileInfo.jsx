// components/ProfileInfo.jsx
import React from "react";

const ProfileInfo = () => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-lg w-full">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <span className="text-xl text-purple-400">👤</span> Profile Information
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-gray-300">Full Name</label>
          <input className="w-full p-2 mt-1 text-white rounded bg-slate-700" defaultValue="Christian Anderson" />
        </div>
        <div>
          <label className="text-sm text-gray-300">Email Address</label>
          <input className="w-full p-2 mt-1 text-white rounded bg-slate-700" defaultValue="christian@lawfirm.com" />
        </div>
        <div>
          <label className="text-sm text-gray-300">Role</label>
          <input className="w-full p-2 mt-1 text-white rounded bg-slate-800" defaultValue="Senior Partner" readOnly />
          <p className="mt-1 text-xs text-gray-500">Permanent</p>
        </div>
        <div>
          <label className="text-sm text-gray-300">Law Firm</label>
          <input className="w-full p-2 mt-1 text-white rounded bg-slate-800" defaultValue="Anderson & Associates" readOnly />
          <p className="mt-1 text-xs text-gray-500">Permanent</p>
        </div>
      </div>
      <button className="px-4 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-600 to-teal-400 hover:opacity-90">
        Save Profile Changes
      </button>
    </div>
  );
};

export default ProfileInfo;
