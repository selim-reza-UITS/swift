import { useRef, useState, useEffect } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import Swal from "sweetalert2";

const EditClientDetails = ({ onClose, client, onUpdate }) => {
  const managingRef = useRef(null);
  const [isManagingOpen, setIsManagingOpen] = useState(false);

  const lawyerOptions = [
    "Robert Johnson",
    "Jane Doe",
    "Robert Smith",
    "Michael Davis",
    "Lisa Wilson",
  ];

  const managingUserOptions = [
    "Dev Guru",
    "Smith Dark",
    "John Smith",
    "Emily Clark",
  ];

  const [formData, setFormData] = useState({
    fullName: client.name || "",
    phoneNumber: client.phone || "",
    managingUsers: client.managingUsers || [],
    gender: client.gender || "Female",
    dateOfIncident: client.dateOfIncident || "2024-01-15",
    lawyerName: client.lawyerName || "Robert Johnson",
    injurySustained: client.injurySustained || "Lower back pain and stiffness.",
    generalCaseInfo:
      client.generalCaseInfo || "Client reported back pain after accident.",
    consentToCommunicate: client.consentToCommunicate || false,
    sentiment: client.sentiment || "Positive",
    concernLevel: client.concernLevel || "High",
  });

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
  const handleUpdate = () => {
    // Update parent data (optional if needed)
    if (onUpdate) onUpdate(formData);

    // SweetAlert
    Swal.fire({
      title: "Updated Successfully!",
      text: "Client information has been updated.",
      icon: "success",
      background: "#1f2937",
      color: "#ffffff",
      confirmButtonColor: "#6366F1",
    });

    onClose();
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="relative w-[450px] bg-[#0f172a] text-white rounded-xl p-4 ">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        <div className="mt-2 text-center">
          <img
            src={client.avatar}
            alt={formData.fullName || client.name}
            className="object-cover w-20 h-20 mx-auto border-2 border-blue-500 rounded-full"
          />
        </div>

        {/* Editable Fields
        <div className="mt-4 space-y-2 text-sm">
          {["name", "phone", "manager", "gender", "incidentDate", "lawyer"].map(
            (field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm capitalize">{field}:</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="p-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none"
                />
              </div>
            )
          )}
        </div> */}
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
            className="w-full bg-[#1e293b] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
        </div>
        {/* Phone Number */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Phone Number<span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            placeholder="(XXX) XXX-XXXX"
            className="w-full bg-[#1e293b] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
        </div>
        {/* Select Managing User(s) */}
        <div className="mt-4" ref={managingRef}>
          <label className="block mb-2 text-sm font-medium text-white">
            Select Managing User(s)<span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsManagingOpen((s) => !s)}
              className="w-full bg-[#1e293b] text-white border border-slate-500 rounded-md px-3 py-2 text-left"
            >
              {formData.managingUsers.length > 0
                ? formData.managingUsers.join(", ")
                : "Select managing users"}
            </button>
            {isManagingOpen && (
              <div className="absolute z-20 mt-1 w-full bg-[#1E293B] border border-slate-600 rounded-md shadow-lg max-h-48 overflow-auto">
                {managingUserOptions.map((name) => {
                  const checked = formData.managingUsers.includes(name);
                  return (
                    <label
                      key={name}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:bg-slate-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          setFormData((prev) => {
                            const set = new Set(prev.managingUsers);
                            if (e.target.checked) set.add(name);
                            else set.delete(name);
                            return {
                              ...prev,
                              managingUsers: Array.from(set),
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
          <p className="mt-1 text-sm text-gray-400">
            Link one or more managers from your firm to this client.
          </p>
        </div>
        {/* Gender */}
        <div className="mt-4">
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
        {/* Date of Incident */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Date of Incident<span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            name="dateOfIncident"
            value={formData.dateOfIncident}
            onChange={handleInputChange}
            className="w-full bg-[#1e293b] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
        </div>
        {/* Lawyer Name */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Lawyer Name<span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              name="lawyerName"
              value={formData.lawyerName}
              onChange={handleInputChange}
              className="w-full bg-[#1e293b] text-white border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none"
            >
              <option value="" disabled>
                Select a lawyer
              </option>
              {lawyerOptions.map((name) => (
                <option key={name} value={name}>
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
        {/* Case Notes */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold poppins">Case Notes</p>
          <div className="mb-2">
            <label className="text-sm">Injury's Sustained:</label>
            <input
              type="text"
              name="injurySustained"
              value={formData.injurySustained}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1e293b] border border-slate-500 text-sm focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">General Case Info:</label>
            <input
              type="text"
              name="generalCaseInfo"
              value={formData.generalCaseInfo}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1e293b] border border-slate-500 text-sm focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full py-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update Info
        </button>
      </div>
    </div>
  );
};

export default EditClientDetails;
