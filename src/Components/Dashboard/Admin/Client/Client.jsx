import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import ViewClientDetails from "./ViewClientDetails";
import { NavLink } from "react-router-dom";
import { useGetClientQuery } from "../../../../Redux/feature/Admin/admin";
import AddClientForm from "../../../Shared/AddClientForm";
import { Plus } from "lucide-react";
const statusColors = {
  Active: "bg-[#A855F7] text-[#FFFFFF]",
  Paused: "bg-[#F59E0B] text-[#161E2F]",
  "Recently Deleted": "bg-[#EF4444] text-[#161E2F]",
};

const priorityColors = {
  "High Risk": "bg-[#DBEAFE] text-[#1E40AF]",
  "Medium Risk": "bg-[#FFEDD5] text-[#9A3412]",
  "Low Risk": "bg-[#FEE2E2] text-[#991B1B]",
};

// Helper function to determine status
const getClientStatus = (client) => {
  if (client.opt_out) return "Recently Deleted";
  if (client.is_paused) return "Paused";
  if (client.is_active) return "Active";
  return "Unknown";
};

const Client = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  // ✅ Fetch clients from API
  const { data: clients = [], isLoading, isError } = useGetClientQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading clients!</p>;

  // Filter clients based on search & status
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const clientStatus = getClientStatus(client);
    const matchesFilter = filter === "All" || clientStatus === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 mx-auto mt-6 rounded-md bg-[#0f172a] text-white">
      <div className="flex items-center justify-end gap-5 rounded-md poppins">
        <NavLink
          onClick={() => setShowAddClientModal(true)}
          className="flex items-center justify-between w-[280px] mb-6 -mt-6"
        >
          <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
            <div
              className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center bg-gradient-to-r from-[#5d35bb] to-[#8A2BE2] text-white rounded-xl
                  `}
            >
              <Plus className="w-[22px] h-[22px] font-bold" />
              <h1 className="text-xl font-medium poppins">New Client</h1>
            </div>
          </div>
        </NavLink>
      </div>
      {/* Search & Filters */}
      <div className="flex items-center justify-between gap-5 mb-4 bg-[#161E2F] px-4 py-4 rounded-md poppins">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search clients..."
            className="flex-1 px-4 py-2 text-[#ADAEBC] bg-transparent border border-[#2A2E37] rounded-xl w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("All")}
            className="px-3 py-2 text-sm text-[#FFFFFF] bg-[#6366F1] rounded-md hover:bg-[#2f31af]"
          >
            All Clients
          </button>
          <button
            onClick={() => setFilter("Active")}
            className="px-3 py-2 text-sm text-[#FFFFFF] bg-[#6366F1] rounded-md hover:bg-[#2f31af]"
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Paused")}
            className="px-3 py-2 text-sm text-[#374151] bg-[#E5E7EB] rounded-md hover:bg-[#acaeb1]"
          >
            Paused
          </button>
          <button
            onClick={() => setFilter("Recently Deleted")}
            className="px-3 py-2 text-sm text-[#161E2F] bg-[#F59E0B] rounded-md hover:bg-[#f1b142]"
          >
            Recently Deleted
          </button>
        </div>
      </div>

      {/* Client Cards */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="flex flex-col-reverse items-start gap-5 lg:flex-row lg:items-center justify-between bg-[#1e293b] px-4 py-3 rounded-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#8C15FF] text-white font-bold">
                {client.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-semibold">{client.full_name}</h3>
                <p className="text-sm text-[#FFFFFF]">{client.phone_number}</p>
                <p className="text-sm text-[#FFFFFF]">
                  Managing User:{" "}
                  {client.managing_users.map((u) => u.name).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-sm px-4 py-2 rounded-full ${
                  statusColors[getClientStatus(client)]
                }`}
              >
                {getClientStatus(client)}
              </span>

              {/* Priority based on concern_level */}
              <span
                className={`text-sm px-4 py-2 rounded-full ${
                  priorityColors[
                    client.concern_level === "High"
                      ? "High Risk"
                      : client.concern_level === "Medium"
                      ? "Medium Risk"
                      : "Low Risk"
                  ]
                }`}
              >
                {client.concern_level
                  ? client.concern_level + " Risk"
                  : "Unknown"}
              </span>

              <NavLink to={`/dashboard/IntakeSpecialistClients/${client.id}`}>
                <button className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-700">
                  <FaEye />
                </button>
              </NavLink>

              <FaTrashAlt className="text-gray-300 cursor-pointer hover:text-red-500" />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedClient && (
        <ViewClientDetails
          client={selectedClient}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClient(null);
          }}
        />
      )}
      {showAddClientModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black z-60 bg-opacity-60"
          onClick={() => setShowAddClientModal(false)}
        >
          <div
            className="relative w-full max-w-lg p-0 rounded-lg shadow-lg bg-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <AddClientForm setShowAddClientModal={setShowAddClientModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Client;
