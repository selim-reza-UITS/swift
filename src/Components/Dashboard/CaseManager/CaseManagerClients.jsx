import React, { useEffect, useState } from "react";
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

const CaseManagerClients = () => {
  const [displayClients, setDisplayClients] = useState([]);

  const { data: clients = [], isLoading } = useGetAllClientsQuery();
  const [formData, setFormData] = useState({
    fullName: "",
    lawyerName: "",
    dateOfIncident: "",
    gender: "",
    managingUsers: [],
    phoneNumber: "",
    injurySustained: "",
    generalCaseInfo: "",
    consentToCommunicate: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (managingRef.current && !managingRef.current.contains(event.target)) {
        setIsManagingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDeleteClick = () => {
    setIsDeleting(true);
    setDeleteProgress(0);

    const timer = setInterval(() => {
      setDeleteProgress((prev) => {
        const newProgress = prev + 100 / 30; // 30 intervals over 3 seconds
        if (newProgress >= 100) {
          clearInterval(timer);
          setShowDeleteModal(true);
          setIsDeleting(false);
          setDeleteProgress(0);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    setDeleteTimer(timer);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    // Add your delete logic here
    console.log("Case deleted");
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    return () => {
      if (deleteTimer) {
        clearInterval(deleteTimer);
      }
    };
  }, [deleteTimer]);
  const filteredClients = displayClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    if (activeView === "active")
      return matchesSearch && client.status === "active";
    if (activeView === "paused")
      return matchesSearch && client.status === "paused";
    if (activeView === "recovery")
      return matchesSearch && client.status === "recovery";
    if (activeView === "all") return matchesSearch;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const currentClients = filteredClients.slice(
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

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "paused":
        return "Paused";
      case "recovery":
        return "Recently Deleted";
      default:
        return "Unknown";
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

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "High Risk";
      case "medium":
        return "Medium Risk";
      case "low":
        return "Low Risk";
      default:
        return "Unknown";
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
  useEffect(() => {
    const mapStatus = (s) => {
      if (!s) return "active";
      const lower = String(s).toLowerCase();
      if (lower.includes("pause")) return "paused";
      if (lower.includes("delete")) return "recovery";
      return "active"; // e.g., "Awaiting Consent"
    };

    const mapped = Array.isArray(clients)
      ? clients.map((c) => ({
          id: c.id,
          name: c.full_name || c.name || "-",
          phone: c.phone_number || "-",
          status: mapStatus(c.status),
          priority: "medium",
          avatar: "/api/placeholder/40/40",
        }))
      : [];
    setDisplayClients(mapped);
  }, [clients]);

  const handleDeleteClient = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#1f2937", // dark bg
      color: "#fff", // text color
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4b5563",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Client has been deleted.",
          icon: "success",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#6366F1",
        });
      }
    });
  };

  const handleUpdate = (updatedData) => {
    // Handle the update logic here, e.g., updating the client in the state or making an API call
    console.log("Updated Client Data:", updatedData);

    // For example, if you're updating the client in the list
    setDisplayClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedData.id ? { ...client, ...updatedData } : client
      )
    );

    // Optionally, close the modal
    setIsEditModalOpen(false);
    setEditSelectedClient(null);

    // You can add more logic here to show a success message, etc.
    Swal.fire({
      title: "Updated Successfully!",
      text: "Client information has been updated.",
      icon: "success",
      background: "#1f2937",
      color: "#ffffff",
      confirmButtonColor: "#6366F1",
    });
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
            onClick={() => handleViewChange("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "all"
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
            onClick={() => handleViewChange("recovery")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "recovery"
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
                    alt={client.name}
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
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-400">{client.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    client.status
                  )} text-white`}
                >
                  {getStatusLabel(client.status)}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                    client.priority
                  )}`}
                >
                  {getPriorityLabel(client.priority)}
                </span>

                <Link to={`/dashboard/caseManagerClients/${client.id}`}>
                  <button className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-700">
                    <Eye />
                  </button>
                </Link>

                <button
                  className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-400 hover:bg-gray-700"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  <Trash2 />
                </button>
                {/* Delete Button with Progress */}
                {/* <button
                  onClick={isDeleting ? handleDeleteCancel : handleDeleteClick}
                  disabled={isDeleting}
                  className="relative flex items-center w-full p-3 space-x-3 overflow-hidden text-left transition-colors bg-red-900 rounded-lg hover:bg-red-800"
                >
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-100 ease-linear bg-red-600"
                    style={{ width: `${deleteProgress}%` }}
                  />

                  <div className="relative z-10 flex items-center space-x-3">
                    <Trash2 className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">
                      {isDeleting ? "Deleting..." : "Delete"}
                    </span>
                  </div>
                </button> */}
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
      {filteredClients.length > itemsPerPage && (
        <div className="flex items-center justify-between flex-shrink-0 px-6 pt-4 border-t border-gray-800">
          <div className="text-sm text-gray-400">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredClients.length
            )}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredClients.length)} of{" "}
            {filteredClients.length} clients
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
