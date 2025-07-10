import React, { useEffect, useState } from "react";
import { Search, Eye, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";

const CaseManagerClients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      status: "active",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Michael Davis",
      phone: "(555) 987-6543",
      status: "paused",
      priority: "medium",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Lisa Wilson",
      phone: "(555) 456-7890",
      status: "recovery",
      priority: "low",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "Robert Martinez",
      phone: "(555) 234-5678",
      status: "active",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 5,
      name: "Amanda Thompson",
      phone: "(555) 345-6789",
      status: "active",
      priority: "medium",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 6,
      name: "James Anderson",
      phone: "(555) 567-8901",
      status: "paused",
      priority: "low",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 7,
      name: "Jennifer White",
      phone: "(555) 678-9012",
      status: "recovery",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 8,
      name: "Christopher Lee",
      phone: "(555) 789-0123",
      status: "active",
      priority: "medium",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 9,
      name: "Michelle Brown",
      phone: "(555) 890-1234",
      status: "paused",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 10,
      name: "Daniel Garcia",
      phone: "(555) 901-2345",
      status: "active",
      priority: "low",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 11,
      name: "Ashley Miller",
      phone: "(555) 012-3456",
      status: "recovery",
      priority: "medium",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 12,
      name: "Matthew Wilson",
      phone: "(555) 123-4567",
      status: "active",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 13,
      name: "Stephanie Taylor",
      phone: "(555) 234-5678",
      status: "paused",
      priority: "low",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 14,
      name: "Kevin Moore",
      phone: "(555) 345-6789",
      status: "active",
      priority: "medium",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 15,
      name: "Rachel Jackson",
      phone: "(555) 456-7890",
      status: "recovery",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 16,
      name: "Tyler Robinson",
      phone: "(555) 567-8901",
      status: "active",
      priority: "low",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 17,
      name: "Brittany Clark",
      phone: "(555) 678-9012",
      status: "paused",
      priority: "medium",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 18,
      name: "Jonathan Lewis",
      phone: "(555) 789-0123",
      status: "active",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 19,
      name: "Nicole Parker",
      phone: "(555) 890-1234",
      status: "recovery",
      priority: "medium",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 20,
      name: "Brandon Hughes",
      phone: "(555) 901-2345",
      status: "paused",
      priority: "low",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 21,
      name: "Samantha Torres",
      phone: "(555) 012-3456",
      status: "active",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 22,
      name: "Jason Mitchell",
      phone: "(555) 123-4567",
      status: "recovery",
      priority: "low",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 23,
      name: "Catherine Adams",
      phone: "(555) 234-5678",
      status: "paused",
      priority: "medium",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 24,
      name: "Michael Scott",
      phone: "(555) 345-6789",
      status: "active",
      priority: "high",
      avatar: "/api/placeholder/40/40",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);

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

  const handleDeleteCancel = () => {
    if (deleteTimer) {
      clearInterval(deleteTimer);
      setDeleteTimer(null);
    }
    setIsDeleting(false);
    setDeleteProgress(0);
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
  const filteredClients = clients.filter((client) => {
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
        return "Recovery";
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
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
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

  return (
    <div className="h-[91vh] bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleViewChange('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Clients
          </button>
          <button
            onClick={() => handleViewChange("active")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "active"
                ? "bg-[#6366F1] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            View Active
          </button>
          <button
            onClick={() => handleViewChange("paused")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "paused"
                ? "bg-[#E5E7EB] text-[#374151]"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            View Paused
          </button>
          <button
            onClick={() => handleViewChange("recovery")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "recovery"
                ? "bg-[#F59E0B] text-[#161E2F]"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Recovery
          </button>
        </div>
      </div>

      {/* Client List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {currentClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-12 h-12 rounded-full bg-gray-600"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(
                      client.status
                    )}`}
                  ></div>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg">
                    {client.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{client.phone}</p>
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
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Eye />
                  </button>
                </Link>

                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                  <Trash2 />
                </button>
                {/* Delete Button with Progress */}
                {/* <button
                  onClick={isDeleting ? handleDeleteCancel : handleDeleteClick}
                  disabled={isDeleting}
                  className="w-full relative overflow-hidden flex items-center space-x-3 text-left p-3 rounded-lg bg-red-900 hover:bg-red-800 transition-colors"
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-red-600 transition-all duration-100 ease-linear"
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
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
                  <p className="text-gray-300 mb-2">
                    Are you sure you want to delete this case?
                  </p>
                  <p className="text-gray-400 text-sm">
                    <strong>Case:</strong> Sarah Johnson - Personal Injury Case
                    #PI-2024-001
                  </p>
                  <p className="text-red-400 text-sm mt-2">
                    This action cannot be undone.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleDeleteModalClose}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentClients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No clients found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredClients.length > itemsPerPage && (
        <div className="flex items-center justify-between px-6 pt-4 border-t border-gray-800 flex-shrink-0">
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
              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
