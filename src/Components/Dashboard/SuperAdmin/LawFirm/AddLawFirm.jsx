import React, { useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import "animate.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCreateLawFirmMutation } from "../../../../Redux/feature/SuperAdmin/superAdmin";

const businessOptions = [
  "LLC",
  "PLLC",
  "PROFESSIONAL CORPORATION",
  "CORPORATION",
  "PARTNERSHIP",
  "SOLE_PROP",
  "LLP",
  "OTHER",
];

const AddLawFirm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firmName: "",
    areaCode: "",
    email: "",
    manager: "",
    address: "",
    website: "",
    taxId: "",
    businessType: "",
  });

  const [errors, setErrors] = useState({
    areaCode: "",
    email: "",
    taxId: "",
  });

  const [createLawFirm, { isLoading }] = useCreateLawFirmMutation();

  // EIN Auto Format (XX-XXXXXXX)
  const handleTaxIdChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 9);
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `${raw.slice(0, 2)}-${raw.slice(2)}`;
    }
    setFormData((prev) => ({ ...prev, taxId: formatted }));
  };

  // Generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset errors on change
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Validate Area Code
    if (name === "areaCode" && value.length > 10) {
      setErrors((prev) => ({
        ...prev,
        areaCode: "Area Code cannot be more than 10 characters",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firmName ||
      !formData.areaCode ||
      !formData.email ||
      !formData.manager ||
      !formData.address ||
      !formData.website ||
      !formData.taxId ||
      !formData.businessType
    ) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required!",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    const postData = {
      name: formData.firmName,
      contact_name: formData.manager,
      contact_email: formData.email,
      website: formData.website,
      address: formData.address,
      area_code: formData.areaCode,
      timezone: "Asia/Dhaka",
      ein: formData.taxId,
      business_type: formData.businessType.toUpperCase(),
    };

    try {
      await createLawFirm(postData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Firm Registered!",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#22C55E",
      });
      onClose();
    } catch (error) {
      console.error(error);

      // ✅ Validation Error (400) handle
      if (error?.status === 400 && error?.data) {
        const messages = Object.values(error.data).flat().join("\n");

        Swal.fire({
          icon: "error",
          title: "Oops! Invalid Input",
          text: messages,
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#EF4444",
        });
      } else {
        // Generic Error
        Swal.fire({
          icon: "error",
          title: "Failed to register!",
          text: error?.data?.message || "Something went wrong.",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#EF4444",
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm poppins">
      <div className="animate__animated animate__fadeInDown relative max-w-2xl bg-[#0f172a] text-white rounded-xl p-8 w-full mx-4 max-h-[600px] overflow-y-auto scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute text-[#FFFFFF] top-3 right-3 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        <h2 className="mb-3 text-2xl font-semibold text-center">
          Register a Firm
        </h2>
        <p className="mb-6 text-sm text-center text-[#FFFFFF]">
          Please provide the following information to set up your firm's
          account.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Firm Name */}
          <div>
            <label className="block mb-2 text-sm">Firm Name*</label>
            <input
              type="text"
              name="firmName"
              value={formData.firmName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          {/* Desired Area Code */}
          <div>
            <label className="block mb-2 text-sm">Desired Area Code*</label>
            <input
              type="text"
              name="areaCode"
              value={formData.areaCode}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg text-sm outline-none ${
                errors.areaCode
                  ? "border border-red-500 bg-[#1e293b]"
                  : "bg-[#1e293b]"
              }`}
            />
            {errors.areaCode && (
              <p className="mt-1 text-xs text-red-500">{errors.areaCode}</p>
            )}
          </div>

          {/* Tax ID */}
          <div>
            <label className="block mb-2 text-sm">Tax ID (EIN)*</label>
            <input
              type="text"
              name="taxId"
              placeholder="XX-XXXXXXX"
              value={formData.taxId}
              onChange={handleTaxIdChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          {/* Business Type Dropdown */}
          <div>
            <label className="block mb-2 text-sm">Business Type*</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            >
              <option value="">Select Business Type</option>
              {businessOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Founding Admin Email */}
          <div>
            <label className="block mb-2 text-sm">Founding Admin Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg text-sm outline-none ${
                errors.email
                  ? "border border-red-500 bg-[#1e293b]"
                  : "bg-[#1e293b]"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Managing User */}
          <div>
            <label className="block mb-2 text-sm">Admin Name*</label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              placeholder="Enter admin name"
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-sm">
              Firm's Physical Address*
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block mb-1 text-sm">Firm's Website*</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 hover:opacity-90"
            >
              {isLoading ? "Submitting..." : "Add Firm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLawFirm;
