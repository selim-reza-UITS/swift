import React, { useState } from "react";
import { FaMapMarkerAlt, FaTrash, FaRegEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import Swal from "sweetalert2";
import AddLawFirm from "./AddLawFirm";
import EditLawfirm from "./EditLawfirm";
import {
  useDeleteLawFirmMutation,
  useGetBillingByFirmQuery,
  useGetLawFirmQuery,
  useUpdateLawFirmStatusMutation,
} from "../../../../Redux/feature/SuperAdmin/superAdmin";
import EditBillingModal from "./EditBillingModal";
import { use } from "react";

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`w-12 h-6 flex items-center rounded-full cursor-pointer p-1 transition-colors duration-300 ${
        isOn ? "bg-green-400" : "bg-gray-500"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

// Billing info
const LawFirmCard = ({ item, onEdit, onDelete, onEditBilling }) => {
  const { data: billing, isLoading: billingLoading } = useGetBillingByFirmQuery(
    item.id
  );

  return (
    <div
      key={item.id}
      className={`rounded-lg p-4 shadow transition-all ${
        item.is_active
          ? "bg-[#1e293b] hover:shadow-lg"
          : "bg-[#1e293b] opacity-50"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <div className="flex items-center gap-3">
          <ToggleSwitch
            isOn={item.is_active}
            handleToggle={() => onEdit.toggleStatus(item)}
          />
          <button
            onClick={() => onEdit.edit(item)}
            className="text-cyan-400 hover:text-cyan-300"
          >
            <FaRegEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:text-red-400"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="mb-2 text-sm text-[#4ADE80]">
          Business Type: {item.business_type}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-1 text-sm text-[#D1D5DB]">
        <MdLocalPhone className="text-[#7C3AED] text-lg" /> {item.contact_email}
      </div>
      <div className="flex items-center gap-2 mb-3 text-sm text-[#D1D5DB] mt-1">
        <FaMapMarkerAlt className="text-[#7C3AED] text-lg" /> {item.address}
      </div>

      {/* Billing Info */}
      <div className="p-4 mt-4 border border-gray-700 shadow-inner rounded-xl">
        <h3 className="flex items-center justify-between mb-3 text-base font-semibold text-cyan-400">
          💳 Billing Information
          <FaEdit
            className="text-white cursor-pointer hover:text-cyan-400"
            onClick={() => onEditBilling(item, billing)}
          />
        </h3>

        {billingLoading ? (
          <p className="text-sm text-gray-400">Loading billing info...</p>
        ) : billing ? (
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Cost per Admin:</span>
              <span className="font-semibold text-white">
                ${billing.cost_admin}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cost per Case Manager:</span>
              <span className="font-semibold text-white">
                ${billing.cost_case_manager}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cost per Intake Specialist:</span>
              <span className="font-semibold text-white">
                ${billing.cost_intake_specialist}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Overage Rate:</span>
              <span className="font-semibold text-white">
                ${billing.overage_rate}/message
              </span>
            </div>
            <div className="flex justify-between">
              <span>Next Billing Date:</span>
              <span className="text-cyan-300">
                {new Date(billing.next_billing_date).toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No billing info found.</p>
        )}
      </div>
    </div>
  );
};

const LawFirm = () => {
  const { data: lawfirms, isLoading, refetch } = useGetLawFirmQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [updateStatus] = useUpdateLawFirmStatusMutation();
  const [billingModalOpen, setBillingModalOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [deleteLawFirm] = useDeleteLawFirmMutation();
  // Billing edit handle function
  const handleEditBilling = (firm, billing) => {
    setSelectedFirm(firm);
    setSelectedBilling(billing);
    setBillingModalOpen(true);
  };

  if (isLoading) return <p className="p-6 text-white">Loading firms...</p>;

  const filteredFirms = (lawfirms || []).filter(
    (firm) =>
      firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.contact_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleToggleStatus = async (firm) => {
    const action = firm.is_active ? "deactivate" : "activate";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} ${firm.name}?`,
      text: `This firm will be ${action}d.`,
      icon: "warning",
      background: "#1e293b", // dark background
      color: "#f1f5f9", // light text
      iconColor: "#facc15", // amber-400 for warning
      showCancelButton: true,
      confirmButtonColor: firm.is_active ? "#ef4444" : "#22c55e", // red for deactivate, green for activate
      cancelButtonColor: "#64748b",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        await updateStatus({
          id: firm.id,
          body: { is_active: !firm.is_active },
        }).unwrap();

        refetch();

        // Success popup
        Swal.fire({
          title: "Updated!",
          text: `${firm.name} has been ${action}d successfully.`,
          icon: "success",
          background: "#1e293b",
          color: "#f1f5f9",
          iconColor: "#22c55e",
          confirmButtonColor: "#3b82f6",
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to update status.",
          icon: "error",
          background: "#1e293b",
          color: "#f1f5f9",
          iconColor: "#ef4444",
          confirmButtonColor: "#3b82f6",
        });
      }
    }
  };

  const handleEdit = (firm) => {
    setSelectedFirm(firm);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1e293b",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteLawFirm(id).unwrap();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Law firm has been deleted.",
            background: "#1e293b",
            color: "#fff",
            confirmButtonColor: "#22c55e",
          });
          refetch();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: error?.data?.message || "Something went wrong.",
            background: "#1e293b",
            color: "#fff",
            confirmButtonColor: "#ef4444",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 poppins">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md w-1/3 outline-none"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400"
        >
          Add new firm
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFirms.map((item) => (
          <LawFirmCard
            key={item.id}
            item={item}
            onEdit={{ edit: handleEdit, toggleStatus: handleToggleStatus }}
            onDelete={handleDelete}
            onEditBilling={handleEditBilling}
          />
        ))}
      </div>

      {isModalOpen && <AddLawFirm onClose={() => setIsModalOpen(false)} />}
      {isEditModalOpen && (
        <EditLawfirm
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedFirm(null);
          }}
          firmToEdit={selectedFirm}
        />
      )}
      {billingModalOpen && selectedBilling && (
        <EditBillingModal
          billingData={selectedBilling}
          onClose={() => setBillingModalOpen(false)}
          onSave={(updatedData) => {
            console.log("Save billing data:", updatedData);
            setBillingModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default LawFirm;
