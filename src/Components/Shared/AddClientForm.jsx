import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AddClientForm({ setShowAddClientModal }) {
  const [formData, setFormData] = useState({
    fullName: "",
    lawyerName: "",
    dateOfIncident: "",
    gender: "",
    managingUser: "Dev Guru",
    phoneNumber: "",
    injurySustained: "",
    generalCaseInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("New Client Added.")
    setFormData({
      fullName: "",
      lawyerName: "",
      dateOfIncident: "",
      gender: "",
      managingUser: "Dev Guru",
      phoneNumber: "",
      injurySustained: "",
      generalCaseInfo: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      lawyerName: "",
      dateOfIncident: "",
      gender: "",
      managingUser: "Dev Guru",
      phoneNumber: "",
      injurySustained: "",
      generalCaseInfo: "",
    });
    setShowAddClientModal(false);
  };

  return (
    <div className=" bg-[#0f172a] flex items-center justify-center rounded-xl w-full z-50">
      <Toaster/>
      <div className=" rounded-lg p-8 w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Plus className="w-6 h-6 mr-2 text-purple-400" />
            <h1 className="text-xl font-semibold text-white">
              Add a New Client
            </h1>
          </div>
          <p className="text-sm text-gray-400">
            Use this form to quickly and easily add a new client.
          </p>
        </div>

        <div className="space-y-4 bg-[#1E293B] p-8 rounded-xl">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Full Name<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g., John Doe"
              className="w-full bg-[#475569] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Lawyer Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Lawyer Name<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="lawyerName"
              value={formData.lawyerName}
              onChange={handleInputChange}
              placeholder="e.g., Saul Goodman"
              className="w-full bg-[#475569] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Date of Incident */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Date of Incident<span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              name="dateOfIncident"
              value={formData.dateOfIncident}
              onChange={handleInputChange}
              className="w-full bg-[#475569] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Gender<span className="text-red-400">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                  className="mr-2 text-purple-400 focus:ring-purple-400"
                />
                <span className="text-sm text-white">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                  className="mr-2 text-purple-400 focus:ring-purple-400"
                />
                <span className="text-sm text-white">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Prefer not to say"
                  checked={formData.gender === "Prefer not to say"}
                  onChange={handleInputChange}
                  className="mr-2 text-purple-400 focus:ring-purple-400"
                />
                <span className="text-sm text-white">Prefer not to say</span>
              </label>
            </div>
          </div>

          {/* Select Managing User */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Select Managing User(s)<span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                name="managingUser"
                value={formData.managingUser}
                onChange={handleInputChange}
                className="w-full bg-[#475569] text-white border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none"
              >
                <option value="Dev Guru">Dev Guru</option>
                <option value="Other User">Other User</option>
              </select>
              <div className="absolute transform -translate-y-1/2 pointer-events-none right-3 top-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Link a manager to this client. Select from users in your firm.
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Phone Number<span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="(XXX) XXX-XXXX"
              className="w-full bg-[#475569] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Injury's Sustained */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Injury's Sustained<span className="text-red-400">*</span>
            </label>
            <textarea
              name="injurySustained"
              value={formData.injurySustained}
              onChange={handleInputChange}
              placeholder="e.g., Whiplash, minor back pain..."
         
              className="w-full bg-[#475569] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 resize-none"
            />
          </div>

          {/* General Case Info */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              General Case Info<span className="text-red-400">*</span>
            </label>
            <textarea
              name="generalCaseInfo"
              value={formData.generalCaseInfo}
              onChange={handleInputChange}
              placeholder="e.g., Rear-ended at a stoplight..."
             
              className="w-full bg-[#475569] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center justify-center flex-1 px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-[#475569] hover:bg-slate-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
