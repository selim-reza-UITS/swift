/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import { useUpdateBillingMutation } from "../../../../Redux/feature/SuperAdmin/superAdmin";

const EditBillingModal = ({ onClose, billingData }) => {
  const [formData, setFormData] = useState({
    cost_admin: "",
    cost_case_manager: "",
    cost_intake_specialist: "",
    overage_rate: "",
    next_billing_date: "",
    billing_active: true, // added by default
  });

  const [updateBilling, { isLoading }] = useUpdateBillingMutation();

  useEffect(() => {
    if (billingData) {
      setFormData({
        cost_admin: billingData.cost_admin || "",
        cost_case_manager: billingData.cost_case_manager || "",
        cost_intake_specialist: billingData.cost_intake_specialist || "",
        overage_rate: billingData.overage_rate || "",
        next_billing_date: billingData.next_billing_date?.split("T")[0] || "",
        billing_active: billingData.billing_active ?? true,
      });
    }
  }, [billingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      await updateBilling({
        firmId: billingData.firm_id || 16, // fallback firmId = 16
        body: {
          formData,
          // Convert date to proper format
          next_billing_date: new Date(formData.next_billing_date).toISOString(),
        },
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Billing Updated!",
        text: "Billing information has been updated successfully.",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#22c55e",
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.data?.message || "Something went wrong.",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[400px] bg-[#0f172a] text-white rounded-xl p-6">
        <button
          className="absolute text-gray-400 top-3 right-3 hover:text-red-400"
          onClick={onClose}
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>
        <h2 className="mb-4 text-lg font-semibold">Edit Billing Info</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label>Cost per Admin</label>
            <input
              type="number"
              name="cost_admin"
              value={formData.cost_admin}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b]"
            />
          </div>
          <div>
            <label>Cost per Case Manager</label>
            <input
              type="number"
              name="cost_case_manager"
              value={formData.cost_case_manager}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b]"
            />
          </div>
          <div>
            <label>Cost per Intake Specialist</label>
            <input
              type="number"
              name="cost_intake_specialist"
              value={formData.cost_intake_specialist}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b]"
            />
          </div>
          <div>
            <label>Overage Rate</label>
            <input
              type="number"
              step="0.01"
              name="overage_rate"
              value={formData.overage_rate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b]"
            />
          </div>
          <div>
            <label>Next Billing Date</label>
            <input
              type="date"
              name="next_billing_date"
              value={formData.next_billing_date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b]"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 mt-2 bg-blue-600 rounded disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBillingModal;
