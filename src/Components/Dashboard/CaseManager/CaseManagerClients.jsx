import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetAllClientsQuery } from "../../../Redux/api/intakeapi";
import { useClientOptOutMutation } from "../../../Redux/api/caseapi";
const CaseManagerClients = () => {
  const [activeView, setActiveView] = useState(""); 
  console.log(activeView);
  const { data: clients = [], isLoading } = useGetAllClientsQuery(activeView);

  console.log(clients);
  const managingRef = useRef(null);
  const [clientOptOut] = useClientOptOutMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (managingRef.current && !managingRef.current.contains(event.target)) {
        setIsManagingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteConfirm = async (id) => {
    setShowDeleteModal(false);

    // Call your API to delete the client
    const result = await clientOptOut(id);
    console.log(result);

    if (result) {
    
      Swal.fire({
        title: "Deleted!",
        text: "Client has been Opted Out.",
        icon: "success",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#6366F1",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "There was an error deleting the client.",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#6366F1",
      });
    }
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const currentClients = clients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-[#A855F7]";
      case "paused":
        return "bg-[#F59E0B] text-[#161E2F]";
      case "recovery":
        return "bg-[#EF4444] text-[#161E2F]";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      case "medium":
        return "bg-[#FFEDD5] text-[#9A3412]";
      case "low":
        return "bg-[#FEE2E2] text-[#991B1B]";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleDeleteClient = (id) => {
    // Find the client by id
    const client = clients.find((user) => user.id === id);

    if (client) {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete ${client.full_name}. Once deleted, this client will no longer receive messages. They will remain recoverable for 35 days before being permanently removed.`,
        icon: "warning",
        background: "#1f2937", // dark bg
        color: "#fff", // text color
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#4b5563",
        confirmButtonText: `Delete ${client.full_name}`,
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteConfirm(id);
        }
      });
    }
  };

  return (
    <div className="h-[80vh] bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 py-2 pl-10 pr-4 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleViewChange("")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === ""
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleViewChange("active")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "active"
                ? "bg-[#6366F1] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => handleViewChange("paused")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "paused"
                ? "bg-[#E5E7EB] text-[#374151]"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Paused
          </button>
          <button
            onClick={() => handleViewChange("recently-deleted")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "recently-deleted"
                ? "bg-[#F59E0B] text-[#161E2F]"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Recently Deleted
          </button>
        </div>
      </div>

      {/* Client List */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-4">
          {currentClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4 transition-colors bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src="https://res.cloudinary.com/dwycwft99/image/upload/v1752214794/5856_lb1zob.jpg"
                    alt={client.full_name}
                    className="w-12 h-12 bg-gray-600 rounded-full"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(
                      client.status
                    )}`}
                  ></div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {client.full_name}
                  </h3>
                  <p className="text-sm text-gray-400">{client.phone_number}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    client.status
                  )} text-white`}
                >
                  {client?.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                    client.priority
                  )}`}
                >
                  {client?.concern_level}
                </span>

                <Link to={`/dashboard/caseManagerClients/${client.id}`}>
                  <button className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-700">
                    <Eye />
                  </button>
                </Link>

                <button
                  className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-400 hover:bg-gray-700"
                  onClick={() => {
                    handleDeleteClient(client.id);
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md p-6 mx-4 bg-gray-800 border border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-red-400">
                    Delete Case
                  </h3>
                  <button
                    onClick={handleDeleteModalClose}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="mb-2 text-gray-300">
                    Are you sure you want to delete this case?
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>Case:</strong> Sarah Johnson - Personal Injury Case
                    #PI-2024-001
                  </p>
                  <p className="mt-2 text-sm text-red-400">
                    This action cannot be undone.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleDeleteModalClose}
                    className="flex-1 px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentClients.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-400">
                No clients found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {clients.length > itemsPerPage && (
        <div className="flex items-center justify-between flex-shrink-0 px-6 pt-4 border-t border-gray-800">
          <div className="text-sm text-gray-400">
            Showing{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, clients.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, clients.length)} of{" "}
            {clients.length} clients
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-300 transition-colors bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-300 transition-colors bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagerClients;
