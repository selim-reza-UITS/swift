import { TbXboxXFilled } from "react-icons/tb";

const ViewLawyerDetails = ({ lawyer, onClose }) => {
  if (!lawyer) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="relative w-[350px] bg-[#0f172a] text-white rounded-xl p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        {/* Lawyer Image & Name */}
        <div className="mt-2 text-center">
          <img
            src={lawyer.image}
            alt={lawyer.name}
            className="object-cover w-20 h-20 mx-auto border-2 border-blue-500 rounded-full"
          />
          <h2 className="mt-3 text-xl font-bold">{lawyer.name}</h2>
          <p className="text-base text-[#FFFFFF]">{lawyer.email}</p>
          <p className="text-sm text-gray-400">{lawyer.phone}</p>
        </div>

        {/* Details */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-base">Role:</span>
            <span className="text-base">{lawyer.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base">Specialization:</span>
            <span className="text-base">{lawyer.specialization}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base">Cases Handled:</span>
            <span className="text-base">{lawyer.cases}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base">Firm:</span>
            <span className="text-base">{lawyer.firm}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base">Manager:</span>
            <span className="text-base">{lawyer.manager}</span>
          </div>
        </div>

        {/* Placeholder Sections */}

        {/* Notes Section */}
      </div>
    </div>
  );
};

export default ViewLawyerDetails;
