import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import {
  useGetClientQuery,
  useOptOutClientMutation,
  useUpdateClientStatusMutation,
  useUpdateOptMutation,
} from "../../../../Redux/feature/Admin/admin";
import AddClientForm from "../../../Shared/AddClientForm";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";

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

const getClientStatus = (client) => {
  if (client.opt_out) return "Recently Deleted";
  if (client.is_paused) return "Paused";
  if (client.is_active) return "Active";
  return "Unknown";
};

const Client = ({ managers }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [updateOpt, { isLoading: isUpdating }] = useUpdateOptMutation();
  const {
    data: clients = [],
    isLoading,
    isError,
    refetch,
  } = useGetClientQuery();
  const [optOutClient] = useOptOutClientMutation();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading clients!</p>;

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const clientStatus = getClientStatus(client);
    const matchesFilter = filter === "All" || clientStatus === filter;

    return matchesSearch && matchesFilter;
  });

  const handleDeleteUser = async (client) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to opt-out ${client.full_name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8A2BE2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Opt-out",
      background: "#1e293b",
      color: "#f8fafc",
      customClass: {
        popup: "rounded-2xl shadow-lg",
        title: "text-xl font-semibold",
        confirmButton: "px-4 py-2 rounded-lg",
        cancelButton: "px-4 py-2 rounded-lg",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // API call to update opt_out to true
          await updateOpt({ id: client.id, opt_out: true }).unwrap();

          Swal.fire({
            icon: "success",
            title: "Opt-out Successful",
            text: `${client.full_name} has been opted out successfully!`,
            confirmButtonColor: "#8A2BE2",
            background: "#1e293b",
            color: "#f8fafc",
          });

          refetch(); // refresh the data
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Something went wrong while opting out!",
            background: "#1e293b",
            color: "#f8fafc",
          });
        }
      }
    });
  };

  const closeDeleteModal = () => {
    setDeleteUserId(null);
  };

  return (
    <div className="p-4 mx-auto mt-6 rounded-md bg-[#0f172a] text-white">
      <div className="flex items-center justify-end gap-5 mb-5 -mt-4 rounded-md poppins">
        <button
          onClick={() => setShowAddClientModal(true)}
          className="flex items-center gap-2 w-[250px] h-[50px] p-5 text-white bg-gradient-to-r from-[#5d35bb] to-[#8A2BE2] rounded-xl"
        >
          <Plus className="w-6 h-6" />
          <h1 className="text-xl font-medium poppins">New Client</h1>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center justify-between gap-5 mb-4 bg-[#161E2F] px-4 py-4 rounded-md poppins">
        <input
          type="text"
          placeholder="Search clients..."
          className="flex-1 px-4 py-2 text-[#ADAEBC] bg-transparent border border-[#2A2E37] rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          {["All", "Active", "Paused", "Recently Deleted"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-sm rounded-md ${
                f === "Paused"
                  ? "text-[#374151] bg-[#E5E7EB] hover:bg-[#acaeb1]"
                  : f === "Recently Deleted"
                  ? "text-[#161E2F] bg-[#F59E0B] hover:bg-[#f1b142]"
                  : "text-white bg-[#6366F1] hover:bg-[#2f31af]"
              }`}
            >
              {f}
            </button>
          ))}
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

              <NavLink to={`/dashboard/admin/${client.id}`}>
                <button className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-700">
                  <FaEye />
                </button>
              </NavLink>

              <FaTrashAlt
                className="text-gray-300 cursor-pointer hover:text-red-500"
                onClick={() => handleDeleteUser(client)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
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
