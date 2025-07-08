// components/NotificationPreferences.jsx
import React from "react";

const NotificationPreferences = () => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-lg w-full">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <span className="text-xl text-purple-400">🔔</span> Notification Preferences
      </h2>
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-300">Notification Frequency</p>
        <div className="flex flex-col gap-2 text-white">
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" defaultChecked />
            <span className="text-purple-400">Immediate</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" />
            <span className="text-purple-400">Daily Digest</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" />
            <span className="text-purple-400">Weekly Summary</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 text-white rounded bg-slate-700">
          <div>
            <p>Email for flagged messages</p>
            <p className="text-xs text-gray-400">Receive email notifications for flagged client messages</p>
          </div>
          <input type="checkbox" className="accent-purple-500" defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4 text-white rounded bg-slate-700">
          <div>
            <p>Email for high-concern client insights</p>
            <p className="text-xs text-gray-400">Receive email notifications for high-priority client insights</p>
          </div>
          <input type="checkbox" className="accent-purple-500" defaultChecked />
        </div>
      </div>

      <button className="px-4 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-600 to-teal-400 hover:opacity-90">
        Save
      </button>
    </div>
  );
};

export default NotificationPreferences;
