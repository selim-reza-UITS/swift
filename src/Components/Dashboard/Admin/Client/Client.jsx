import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import ViewClientDetails from "./ViewClientDetails";
// Fake data
const clientsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    manager: "John Smith",
    status: "Active",
    priority: "High Priority",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Davis",
    phone: "(555) 987-6543",
    manager: "Emily Chen",
    status: "Paused",
    priority: "Medium Priority",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Lisa Wilson",
    phone: "(555) 456-7890",
    manager: "David Brown",
    status: "Recovery",
    priority: "Low Priority",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const statusColors = {
  Active: "bg-[#A855F7] text-[#FFFFFF]",
  Paused: "bg-[#F59E0B] text-[#161E2F]",
  Recovery: "bg-[#EF4444] text-[#161E2F]",
};

const priorityColors = {
  "High Priority": "bg-[#DBEAFE] text-[#1E40AF]",
  "Medium Priority": "bg-[#FFEDD5] text-[#9A3412]",
  "Low Priority": "bg-[#FEE2E2] text-[#991B1B]",
};

const Client = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredClients = clientsData.filter((client) => {
    const matchesSearch = client.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || client.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4  mx-auto mt-6 rounded-md  bg-[#0f172a] text-white">
      {/* Search & Filters */}
      <div className="flex  items-center justify-between gap-5 mb-4 bg-[#161E2F] px-4 py-4 rounded-md poppins">
        <div className="w-1/2">
<input
          type="text"
          placeholder="Search clients..."
          className="flex-1 px-4 py-2 text-[#ADAEBC] bg-transparent border border-[#2A2E37] rounded-xl w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
        
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => setFilter("Active")}
            className="px-3 py-2 text-sm text-[#FFFFFF] bg-[#6366F1] rounded-md hover:bg-[#2f31af]"
          >
            View Active
          </button>
          <button
            onClick={() => setFilter("Paused")}
            className="px-3 py-2 text-sm text-[#374151] bg-[#E5E7EB] rounded-md hover:bg-[#acaeb1]"
          >
            View Paused
          </button>
          <button
            onClick={() => setFilter("Recovery")}
            className="px-3 py-2 text-sm text-[#161E2F] bg-[#F59E0B] rounded-md hover:bg-[#f1b142]"
          >
            Recovery
          </button>
        </div>
      </div>

      {/* Client Cards */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="flex flex-col-reverse items-start gap-5 lg:flex-row  lg:items-center justify-between bg-[#1e293b] px-4 py-3 rounded-md"
          >
            <div className="flex items-center gap-3">
              <img
                src={client.avatar}
                alt={client.name}
                className="object-cover w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-base font-semibold">{client.name}</h3>
                <p className="text-sm text-[#FFFFFF]">{client.phone}</p>
                <p className="text-sm text-[#FFFFFF]">
                  Managing User: {client.manager}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-sm px-4 py-2 rounded-full ${
                  statusColors[client.status]
                }`}
              >
                {client.status}
              </span>
              <span
                className={`text-sm px-4 py-2 rounded-full ${
                  priorityColors[client.priority]
                }`}
              >
                {client.priority}
              </span>
              <FaEye
                onClick={() => {
                  setSelectedClient(client);
                  setIsModalOpen(true);
                }}
                className="ml-3 text-gray-300 cursor-pointer hover:text-[#8B5CF6]"
              />
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
    </div>
  );
};

export default Client;
