import React from "react";
import { User, Edit } from "lucide-react";

function ClientSidebar({ clientData, onBack, onEdit }) {
  return (
    <div className="w-84 bg-gray-800 p-4 mr-4 rounded-xl overflow-y-auto h-[90vh] shadow-md shadow-gray-700">
      {/* Back Button and Edit Client Button */}
      <div className="flex items-center justify-between space-x-2 ">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={onBack}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back
        </button>
      </div>
      {/* Client Profile */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-2">
          <User className="w-8 h-8 text-gray-300" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-center">
            {clientData?.full_name}
          </h2>
          <p className="text-gray-400 text-center">
            {clientData?.phone_number}
          </p>
        </div>
      </div>
      <div
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center shadow mb-6 w-full mx-auto"
        onClick={onEdit}
      >
        <Edit className="w-4 h-4 mr-2" />
        <span>Edit Client</span>
      </div>
      {/* Case Details */}
      <div className="space-y-4 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Incident Date:</span>
          <span>{clientData?.date_of_incident}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Client Status:</span>
          <span className="bg-blue-600 px-2 py-1 rounded text-sm">
            {clientData?.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Gender:</span>
          <span>{clientData?.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Managing User(s):</span>
          <span>
            {clientData?.managing_users.map((user) => user.name).join(", ")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Lawyer:</span>
          <span>{clientData?.lawyer?.name || "N/A"}</span>
        </div>
        {/* <div className="flex justify-between">
          <span className="text-gray-400">Injury's Sustained:</span>
          <span> {clientData?.injuries_sustained}</span>
        </div> */}
      </div>
      {/* Communication Status */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Communication Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Scheduled Next Send:</span>
            <span className="bg-blue-600 px-2 py-1 rounded text-sm">
              {clientData?.scheduled_time
                ? new Date(clientData.scheduled_time).toLocaleString(
                    undefined,
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )
                : ""}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Client Sentiment:</span>
            <span
              className={`${
                clientData?.sentiment === "Negative"
                  ? "text-red-500 "
                  : clientData?.sentiment === "Neutral"
                  ? "text-yellow-400 "
                  : "text-green-400 "
              }`}
            >
              {clientData?.sentiment}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Risk Level:</span>
            <span
              className={`${
                clientData?.concern_level === "High"
                  ? "text-red-500 "
                  : clientData?.concern_level === "Medium"
                  ? "text-yellow-400 "
                  : "text-green-400 "
              }`}
            >
              {clientData?.concern_level}
            </span>
          </div>
        </div>
      </div>
      {/* Case Notes */}
      <div>
        <h3 className="text-lg font-semibold my-2 ">Injury's Sustained</h3>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-300 text-sm">
            {clientData?.injuries_sustained}
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 mt-4">General Case Info</h3>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-300 text-sm">
            {clientData?.general_case_info}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientSidebar;
