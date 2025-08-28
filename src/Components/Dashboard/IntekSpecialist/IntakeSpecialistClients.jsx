import { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  View,
  Trash,
} from "lucide-react";
import Swal from "sweetalert2";
import ViewClientDetails from "../Admin/Client/ViewClientDetails";
import EditClientDetails from "./EditClientDetails";
import { useClientOptOutMutation } from "../../../Redux/api/caseapi";
import { useGetAllClientsQuery } from "../../../Redux/api/intakeapi";
const IntakeSpecialistClients = () => {
  const [clientOptOut] = useClientOptOutMutation();

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

  const [isManagingOpen, setIsManagingOpen] = useState(false);
  const managingRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (managingRef.current && !managingRef.current.contains(event.target)) {
        setIsManagingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value || "";
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    let formatted = "";
    if (digits.length === 0) {
      formatted = "";
    } else if (digits.length < 4) {
      formatted = `(${digits}`;
    } else if (digits.length < 7) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
    setFormData((prev) => ({ ...prev, phoneNumber: formatted }));
  };
  const [displayClients, setDisplayClients] = useState([]);

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

  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditClient, setEditSelectedClient] = useState(null);
  const itemsPerPage = 7;
  const { data: clients = [], isLoading } = useGetAllClientsQuery(activeView);
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.full_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.ceil(clients.length / itemsPerPage);
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

  return (
    <div className=" bg-gray-900 text-white flex flex-col">
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
          {currentClients?.map((client) => (
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
                  {client?.concern_level}{" "}
                </span>
                <Edit
                  onClick={() => {
                    setEditSelectedClient(client);
                    setIsEditModalOpen(true);
                  }}
                  className="ml-3 text-gray-300 cursor-pointer hover:text-[#8B5CF6]"
                />
                <View
                  onClick={() => {
                    setSelectedClient(client);
                    setIsModalOpen(true);
                  }}
                  className="ml-3 text-gray-300 cursor-pointer hover:text-[#8B5CF6]"
                />
                <Trash
                  onClick={() => handleDeleteClient(client.id)}
                  className="ml-3 mb-0.5 text-gray-300 cursor-pointer  hover:text-red-400"
                />
              </div>
            </div>
          ))}

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
      {isEditModalOpen && selectedEditClient && (
        <EditClientDetails
          clientId={selectedEditClient.id} // Pass the client ID dynamically
          onClose={() => {
            setIsEditModalOpen(false);
            setEditSelectedClient(null);
          }}
          onUpdate={handleUpdate}
        />
      )}

      {isModalOpen && selectedClient && (
        <ViewClientDetails
          clientId={selectedClient?.id}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClient(null);
          }}
        />
      )}
    </div>
  );
};

export default IntakeSpecialistClients;
