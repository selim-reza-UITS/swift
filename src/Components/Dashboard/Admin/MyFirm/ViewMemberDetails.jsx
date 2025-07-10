import { TbXboxXFilled } from "react-icons/tb";

const ViewMemberDetails = ({ member, onClose }) => {
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
       y */}
          <h2 className="mt-3 text-xl font-bold">{member.name}</h2>
          <p className="text-base text-[#FFFFFF]">{member.email}</p>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#FFFFFF] text-base">Role:</span>
            <span className="text-[#FFFFFF] text-base">{member.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#FFFFFF] text-base">Under Lawyer ID:</span>
            <span className="text-[#FFFFFF] text-base">{member.lawyerId}</span>
          </div>
        </div>

        <div className="mt-7">
          <p className="mb-4 font-semibold text-s poppins">Communication Status</p>
          <div className="flex justify-between mb-3">
            <span className="text-base font-normal poppins">
              Scheduled Next Send Date
            </span>
            <span className="px-2 py-1 text-xs text-white bg-blue-600 rounded-full">
              5%
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-base font-normal poppins">Sentiment:</span>
            <span className="font-medium text-green-400">Positive</span>
          </div>
          <div className="flex justify-between">
            <span>Concern Level:</span>
            <span className="font-medium text-red-500">Medium</span>
          </div>
        </div>

       

      
      </div>
    </div>
  );
};

export default ViewMemberDetails;
