import { useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import Swal from "sweetalert2";
const EditClientDetails = ({onClose ,client }) => {
      const [formData, setFormData] = useState({
    name: client.name,
    phone: client.phone,
    manager: client.manager,
    gender: client.gender || "Female", // optional
    incidentDate: client.incidentDate || "2024-01-15",
    lawyer: client.lawyer || "Robert Johnson",
    sentiment: client.sentiment || "Positive",
    concernLevel: client.concernLevel || "High",
    notes: client.notes || "Client reported back pain after accident.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      <div className="relative w-[350px] bg-[#0f172a] text-white rounded-xl p-4">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        <div className="mt-2 text-center">
          <img
            src={client.avatar}
            alt={formData.name}
            className="object-cover w-20 h-20 mx-auto border-2 border-blue-500 rounded-full"
          />
        </div>

        {/* Editable Fields */}
        <div className="mt-4 space-y-2 text-sm">
          {["name", "phone", "manager", "gender", "incidentDate", "lawyer"].map(
            (field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm capitalize">{field}:</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none"
                />
              </div>
            )
          )}
        </div>

        {/* Communication Status */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold poppins">Communication Status</p>
          <div className="mb-2">
            <label className="text-sm">Sentiment:</label>
            <input
              type="text"
              name="sentiment"
              value={formData.sentiment}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Concern Level:</label>
            <input
              type="text"
              name="concernLevel"
              value={formData.concernLevel}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Case Notes */}
        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold poppins">Case Notes</p>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 rounded bg-[#1e293b] border border-gray-700 text-sm focus:outline-none"
          />
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
}

export default EditClientDetails;
