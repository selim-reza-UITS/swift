import React from "react";
import ClientDetails from "./ClientDetails";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import { useGetClientByIdQuery } from "../../../../Redux/feature/Admin/admin";

const EditAndViewPart = () => {
  const params = useParams();
  // ধরো client fetch
  const { data: client, isLoading: clientLoading } = useGetClientByIdQuery(
    params.id
  );

  // ধরো chat এও data লাগছে (dummy loading দেখানোর জন্য)
  const chatLoading = false; // পরে এখানে chat এর জন্যও loading ধরতে পারবে

  if (clientLoading || chatLoading) {
    return (
      <div className="h-[86vh] flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="h-[86vh] bg-gray-900 text-white flex relative">
      {/* Left side - Client Details */}
      <ClientDetails />
      {/* Right side - Chat */}
      <Chat />
    </div>
  );
};

export default EditAndViewPart;
