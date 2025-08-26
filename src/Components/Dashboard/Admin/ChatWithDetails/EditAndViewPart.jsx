import React from "react";
import ClientDetails from "./ClientDetails";
import Chat from "./Chat";

const EditAndViewPart = () => {
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
