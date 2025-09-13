/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetAllLawyerQuery,
  useGetAllUserQuery,
} from "../../Redux/api/intakeapi";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../Redux/feature/auth/authSlice";
import { useCreateClientMutation } from "../../Redux/api/intakeapi";
import { useGetClientQuery } from "../../Redux/feature/Admin/admin";

export default function AddClientForm({ setShowAddClientModal }) {
  const [formData, setFormData] = useState({
    fullName: "",
    lawyerName: "",
    dateOfIncident: "",
    gender: "",
    managingUsers: [],
    phoneNumber: "",
    injurySustained: "",
    generalCaseInfo: "",
  });

  const { data: clients = [], refetch } = useGetClientQuery();
  const accessToken = useSelector(selectAccessToken);

  let persistedToken = null;
  try {
    const authString = localStorage.getItem("auth");
    if (authString) {
      const auth = JSON.parse(authString);
      persistedToken = auth?.access || null;
    }
  } catch (e) {
    persistedToken = null;
  }
  const hasToken = Boolean(accessToken || persistedToken);

  const { data: lawyersData } = useGetAllLawyerQuery(undefined, {
    skip: !hasToken,
  });
  const { data: usersData } = useGetAllUserQuery(undefined, {
    skip: !hasToken,
  });

  const [createClient, { isLoading: isCreating }] = useCreateClientMutation();

  const lawyerOptions = Array.isArray(lawyersData)
    ? lawyersData
        .map((l) => ({ id: l?.id, name: l?.name }))
        .filter((x) => x.id && x.name)
    : [];

  const managingUserOptions = Array.isArray(usersData)
    ? usersData
        .map((u) => ({ id: u?.id, name: u?.name }))
        .filter((x) => x.id && x.name)
    : [];

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Managing Users
    // if (!formData.managingUsers || formData.managingUsers.length === 0) {
    //   toast.error("Please assign at least one managing user.");
    //   return;
    // }

    try {
      const normalizedDate = (formData.dateOfIncident || "").replaceAll(
        "/",
        "-"
      );
      const payload = {
        full_name: formData.fullName,
        gender: String(formData.gender || "").toLowerCase(),
        lawyer: formData.lawyerName ? Number(formData.lawyerName) : null,
        phone_number: formData.phoneNumber?.replace(/\D/g, "") || "",
        injuries_sustained: formData.injurySustained,
        general_case_info: formData.generalCaseInfo,
        date_of_incident: normalizedDate || null,
        managing_users: formData.managingUsersIds || [],
      };

      const res = await createClient(payload);

      if (res?.data) {
        toast.success(res.data?.message || "Client created successfully");
        refetch();
        window.scrollTo({ top: 0, behavior: "smooth" });

        setFormData({
          fullName: "",
          lawyerName: "",
          dateOfIncident: "",
          gender: "",
          managingUsers: [],
          phoneNumber: "",
          injurySustained: "",
          generalCaseInfo: "",
        });
        setShowAddClientModal(false);
      } else {
        const msg =
          res?.error?.data?.message ||
          res?.error?.data?.detail ||
          "Failed to create client";
        toast.error(msg);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create client");
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      lawyerName: "",
      dateOfIncident: "",
      gender: "",
      managingUsers: [],
      phoneNumber: "",
      injurySustained: "",
      generalCaseInfo: "",
    });
    setShowAddClientModal(false);
  };

  return (
    <div className=" bg-[#0f172a] flex items-center justify-center rounded-xl w-full z-50">
      <div className=" rounded-lg p-8 w-full max-h-[80vh] overflow-y-auto ">
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

        <div className="p-8 space-y-4 ">
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

          {/* Lawyer Name (Not Required) */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Assigned Attorney
            </label>
            <div className="relative">
              <select
                name="lawyerName"
                value={formData.lawyerName}
                onChange={handleInputChange}
                className="w-full bg-[#475569] text-white border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none"
              >
                <option value="">Select a lawyer</option>
                {lawyerOptions.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
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
          </div>

          {/* Date of Incident (Not Required) */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Date of Incident
            </label>
         
<input
  type="text"
  name="dateOfIncident"
  placeholder="MM-DD-YYYY"
  value={formData.dateOfIncident}
  onChange={(e) => {
    // Auto-format MM-DD-YYYY
    let raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = "";
    if (raw.length === 0) {
      formatted = "";
    } else if (raw.length <= 2) {
      formatted = raw;
    } else if (raw.length <= 4) {
      formatted = `${raw.slice(0, 2)}-${raw.slice(2)}`;
    } else {
      formatted = `${raw.slice(0, 2)}-${raw.slice(2, 4)}-${raw.slice(4)}`;
    }
    setFormData((prev) => ({
      ...prev,
      dateOfIncident: formatted,
    }));
  }}
  className="w-full bg-[#475569] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
/>

          </div>

          {/* Gender (Not Required) */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Gender
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

          {/* Managing User(s) */}
          <div ref={managingRef}>
            <label className="block mb-2 text-sm font-medium text-white">
              Managing User(s)<span className="text-red-400"></span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsManagingOpen((s) => !s)}
                className="w-full bg-[#475569] text-white border border-slate-500 rounded-md px-3 py-2 text-left"
              >
                {formData.managingUsers.length > 0
                  ? formData.managingUsers.join(", ")
                  : "Select managing users"}
              </button>
              {isManagingOpen && (
                <div className="absolute z-20 mt-1 w-full bg-[#1E293B] border border-slate-600 rounded-md shadow-lg max-h-48 overflow-auto">
                  {managingUserOptions.map(({ id, name }) => {
                    const checked = formData.managingUsers.includes(name);
                    return (
                      <label
                        key={id}
                        className="flex items-center gap-2 px-3 py-2 text-white cursor-pointer hover:bg-slate-600"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            setFormData((prev) => {
                              const set = new Set(prev.managingUsers);
                              if (e.target.checked) set.add(name);
                              else set.delete(name);
                              const idSet = new Set(
                                prev.managingUsersIds || []
                              );
                              if (e.target.checked) idSet.add(id);
                              else idSet.delete(id);
                              return {
                                ...prev,
                                managingUsers: Array.from(set),
                                managingUsersIds: Array.from(idSet),
                              };
                            });
                          }}
                        />
                        <span>{name}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Link one or more managers from your firm to this client.
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
              onChange={handlePhoneChange}
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
              className="flex items-center justify-center flex-1 px-4 py-2 font-medium text-white transition-colors duration-200 bg-purple-700 rounded-md hover:bg-purple-900"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="mb-0.5"> Create</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-[#475569] flex-1 hover:bg-slate-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-2 " />
              <span className=" mb-0.5"> Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
