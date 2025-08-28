import { Check, CheckCheck, X } from "lucide-react";
import { TbXboxXFilled } from "react-icons/tb";
import { useGetClientByIdQuery } from "../../../../Redux/api/intakeapi";
import avatar from "../../../../assets/avatar.png";
import Loader from "../../../../Redux/feature/Shared/Loader";
import { div } from "framer-motion/client";

const ViewClientDetails = ({ onClose, clientId }) => {
  const {
    data: clientData,
    isLoading,
    error,
  } = useGetClientByIdQuery(clientId);
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="relative max-w-2xl w-1/4 mx-auto bg-[#0f172a] text-white rounded-xl p-4">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-red-500"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        {isLoading ? (
          <div className="bg-[#0f172a] h-[75vh] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mt-2 text-center">
              <img
                src={avatar}
                alt={clientData?.full_name}
                className="object-cover w-20 h-20 mx-auto border-2 border-blue-500 rounded-full"
              />
              <h2 className="mt-3 text-xl font-bold">
                {clientData?.full_name}
              </h2>
              <p className="text-base text-[#FFFFFF]">
                {clientData?.phone_number}
              </p>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#FFFFFF] text-base roboto ">
                  Incident Date:
                </span>
                <span className="text-[#FFFFFF] text-base roboto ">
                  {clientData?.date_of_incident}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FFFFFF] text-base">Gender:</span>
                <span className="text-[#FFFFFF] text-base">
                  {clientData?.gender}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FFFFFF] text-base">
                  Managing User(s):
                </span>
                <span className="text-[#FFFFFF] text-base">
                  <span className="text-[#FFFFFF] text-base">
                    {clientData?.managing_users
                      ?.map((user) => user.name)
                      .join(", ")}
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FFFFFF] text-base">Lawyer:</span>
                <span className="text-[#FFFFFF] text-base">
                  {clientData?.lawyer?.name}
                </span>
              </div>
            </div>
            <div className="mt-7">
              <p className="mb-4 font-semibold text-s poppins">
                Communication Status
              </p>
              <div className="flex justify-between mb-3">
                <span className="text-base font-normal poppins">
                  Consent Form:
                </span>
                <span className="px-2 py-1 text-xs text-white bg-blue-600 rounded-full">
                  {clientData?.consent_to_communicate ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-base font-normal poppins">
                  Scheduled Next Send:
                </span>
                <span className="px-2 py-1 text-xs text-white bg-blue-600 rounded-full">
                  {new Date(clientData?.scheduled_time)
                    .toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(",", " at")}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-base font-normal poppins">
                  Sentiment:
                </span>
                <span className="font-medium text-green-400">
                  {clientData?.sentiment}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Risk Level:</span>
                <span className="font-medium text-red-500">
                  {clientData?.concern_level}
                </span>
              </div>
            </div>
            <div className="mt-5">
              <p className="mb-2 text-base font-semibold poppins">Case Notes</p>
              <div className="flex justify-between">
                <span className="text-[#FFFFFF] text-base">
                  Injury's Sustained:
                </span>
                <span className="text-[#FFFFFF] text-base">
                  {clientData?.injuries_sustained ||
                    "Lower back pain and stiffness"}
                </span>
              </div>
              <div className="flex justify-between my-2">
                <span className="text-[#FFFFFF] text-base">
                  General Case Info:
                </span>
                <span className="text-[#FFFFFF] text-base">
                  {clientData?.general_case_info ||
                    "clientData? reported back pain after accident"}
                </span>
              </div>
              <div className="flex justify-between my-2">
                <span className="text-[#FFFFFF] text-base mr-1">
                  Insights:{" "}
                </span>
                <span className="text-[#FFFFFF] text-base text-justify">
                  {clientData?.insight ||
                    "Client reported back pain after accident"}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewClientDetails;
