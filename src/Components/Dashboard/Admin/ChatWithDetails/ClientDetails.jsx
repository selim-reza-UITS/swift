import React from "react";
import { User, Edit } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetClientByIdQuery } from "../../../../Redux/feature/Admin/admin";

const ClientDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: client, isLoading } = useGetClientByIdQuery(params.id);
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[700px] text-white gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
 
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center h-[700px] text-red-400">
        No client data found
      </div>
    );
  }

  return (
    <aside className="w-full max-w-xs overflow-y-auto h-[700px] lg:max-w-sm bg-[#0f172a] text-white p-5 rounded-md border border-slate-800 shadow-[0_0_0_1px_rgba(2,6,23,0.4),0_10px_30px_rgba(2,6,23,0.45)] flex flex-col gap-4">
      <div className="p-6 mr-4 overflow-y-auto bg-gray-800 w-80 rounded-xl">
        {/* Back Button */}
        <div className="flex items-center justify-between space-x-2 ">
          <button
            className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
            onClick={() => navigate(-1)}
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
          <div className="flex items-center justify-center w-16 h-16 mr-4 bg-gray-600 rounded-full">
            <User className="w-8 h-8 text-gray-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{client?.full_name}</h2>
            <p className="text-center text-gray-400">{client?.phone_number}</p>
          </div>
        </div>

        {/* Edit Client */}
        <div
          className="flex items-center justify-center w-full px-4 py-2 mx-auto mb-6 text-white bg-blue-600 rounded-lg shadow cursor-pointer hover:bg-blue-700"
          onClick={() => console.log("Edit Client Clicked")} // Replace with modal open if needed
        >
          <Edit className="w-4 h-4 mr-2" />
          <span>Edit Client</span>
        </div>

        {/* Case Details */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Incident Date:</span>
            <span>{client?.date_of_incident}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Client Status:</span>
            <span className="px-2 py-1 text-sm bg-blue-600 rounded">
              {client?.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Gender:</span>
            <span>{client?.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Managing User(s):</span>
            <span>
              {client?.managing_users?.length > 0
                ? client.managing_users.map((u) => u.name).join(", ")
                : "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lawyer:</span>
            <span>{client?.lawyer?.name || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Injury's Sustained:</span>
            <span>{client?.injuries_sustained || "—"}</span>
          </div>
        </div>

        {/* Communication Status */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Communication Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Scheduled Next Send:</span>
              <span className="px-2 py-1 text-sm bg-blue-600 rounded">
                {client?.scheduled_time
                  ? new Date(client.scheduled_time).toISOString().split("T")[0]
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Client Sentiment:</span>
              <span className="text-green-400">{client?.sentiment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk Level:</span>
              <span className="text-red-400">{client?.concern_level}</span>
            </div>
          </div>
        </div>

        {/* Case Notes */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">General Case Info</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">
              {client?.general_case_info || "No case info"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ClientDetails;
