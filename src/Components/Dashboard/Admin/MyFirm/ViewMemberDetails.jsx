/* eslint-disable react/prop-types */
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
          <img
            src="https://res.cloudinary.com/dwycwft99/image/upload/v1752214794/5856_lb1zob.jpg"
            alt={member.name}
            className="object-cover w-20 h-20 mx-auto rounded-full"
          />
          <h2 className="mt-3 text-xl font-bold">{member.name}</h2>
          <p className="text-base text-[#FFFFFF]">{member.email}</p>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#FFFFFF] text-base">Role:</span>
            <span className="text-[#FFFFFF] text-base">{member.role}</span>
          </div>
        </div>

        <div className="mt-7">
          <p className="mb-4 font-semibold text-s poppins">
            Communication Statistics
          </p>

          <div className="flex justify-between mb-3">
            <span className="text-base font-normal poppins">
              Average Sentiment:
            </span>
            <span className="font-medium text-green-400">Positive</span>
          </div>
          <div className="flex justify-between">
            <span>Average Client Risk:</span>
            <span className="font-medium text-red-500">Medium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMemberDetails;
