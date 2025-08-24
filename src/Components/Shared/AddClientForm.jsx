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
    consentToCommunicate: true,
  });

  // Fetch dynamic dropdown data (skip until token is available)
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

  const { data: lawyersData, isLoading: isLawyersLoading } =
    useGetAllLawyerQuery(undefined, { skip: !hasToken });
  const { data: usersData, isLoading: isUsersLoading } = useGetAllUserQuery(
    undefined,
    { skip: !hasToken }
  );
  const [createClient, { isLoading: isCreating }] = useCreateClientMutation();
  console.log(usersData);
  console.log(lawyersData);

  const lawyerOptions = Array.isArray(lawyersData)
    ? lawyersData
        .map((l) => ({ id: l?.id, name: l?.name }))
        .filter((x) => x.id && x.name)
    : [];
  console.log(lawyerOptions);

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
  
  // Check if Consent to Communicate is checked
  if (!formData.consentToCommunicate) {
    toast.error("You must give consent to communicate before submitting.");
    return;
  }

  // Validate if Managing Users are assigned
  if (!formData.managingUsers || formData.managingUsers.length === 0) {
    toast.error("Please assign at least one managing user.");
    return;
  }

  try {
    const normalizedDate = (formData.dateOfIncident || "").replaceAll("/", "-");
    const payload = {
      full_name: formData.fullName,
      gender: String(formData.gender || "").toLowerCase(),
      lawyer: Number(formData.lawyerName),
      phone_number: formData.phoneNumber?.replace(/\D/g, "") || "",
      injuries_sustained: formData.injurySustained,
      general_case_info: formData.generalCaseInfo,
      date_of_incident: normalizedDate,
      managing_users: formData.managingUsersIds || [],
    };
    
    const res = await createClient(payload);
    
    if (res?.data) {
      toast.success(res.data?.message || "Client created successfully");
      // Ensure client list refreshes
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (_) {}
      
      setFormData({
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
      consentToCommunicate: false,
    });
    setShowAddClientModal(false);
  };

  return (
    <div className=" bg-[#0f172a] flex items-center justify-center rounded-xl w-full z-50">
      <Toaster />
      <div className=" rounded-lg p-8 w-full max-h-[80vh] overflow-y-auto scrollbar-hide">
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
            <div className="relative">
              <select
                name="lawyerName"
                value={formData.lawyerName}
                onChange={handleInputChange}
                className="w-full bg-[#475569] text-white border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none"
              >
                <option value="" disabled>
                  Select a lawyer
                </option>
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

          {/* Date of Incident */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Date of Incident<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="dateOfIncident"
              placeholder="YYYY-MM-DD"
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
              {/* <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Prefer not to say"
                  checked={formData.gender === "Prefer not to say"}
                  onChange={handleInputChange}
                  className="mr-2 text-purple-400 focus:ring-purple-400"
                />
                <span className="text-sm text-white">Prefer not to say</span>
              </label> */}
            </div>
          </div>

          {/* Select Managing User(s) */}
          <div ref={managingRef}>
            <label className="block mb-2 text-sm font-medium text-white">
              Select Managing User(s)<span className="text-red-400">*</span>
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

          {/* Consent to Communicate */}
          <div>
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                name="consentToCommunicate"
                checked={formData.consentToCommunicate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    consentToCommunicate: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-purple-500 focus:ring-purple-400"
                required
              />
              <span>Client Consented to Communication</span>
            </label>
            <p className="mt-1 text-xs text-gray-400">
              Required to enable messaging in Client Details.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center justify-center flex-1 px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
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
