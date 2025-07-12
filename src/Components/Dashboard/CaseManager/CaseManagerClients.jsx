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

                <button className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-400 hover:bg-gray-700">
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
