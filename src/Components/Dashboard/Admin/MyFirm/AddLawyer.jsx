import React from 'react';
import { TbXboxXFilled } from "react-icons/tb";
const AddLawyer = ({ onClose}) => {
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
               alt={client.name}
               className="object-cover w-20 h-20 mx-auto border-2 border-blue-500 rounded-full"
             />
             <h2 className="mt-3 text-xl font-bold">{client.name}</h2>
             <p className="text-base text-[#FFFFFF]">{client.phone}</p>
           </div>
   
           <div className="mt-4 space-y-2 text-sm">
             <div className="flex justify-between">
               <span className="text-[#FFFFFF] text-base roboto ">
                 Incident Date:
               </span>
               <span className="text-[#FFFFFF] text-base roboto ">2024-01-15</span>
             </div>
             <div className="flex justify-between">
               <span className="text-[#FFFFFF] text-base">Gender:</span>
               <span className="text-[#FFFFFF] text-base">Female</span>
             </div>
             <div className="flex justify-between">
               <span className="text-[#FFFFFF] text-base">Managing User:</span>
               <span className="text-[#FFFFFF] text-base">{client.manager}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-[#FFFFFF] text-base">Lawyer:</span>
               <span className="text-[#FFFFFF] text-base">Robert Johnson</span>
             </div>
           </div>
   
           <div className="mt-7">
             <p className="mb-4 font-semibold text-s poppins">
               Communication Status
             </p>
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
               <span className="font-medium text-red-500">High</span>
             </div>
           </div>
   
           <div className="mt-5">
             <p className="mb-2 text-base font-semibold poppins">Case Notes</p>
             <div className="bg-[#161E2F] text-sm text-gray-300 rounded-md px-3 py-2 border border-gray-700 roboto ">
               Client reported back pain after accident.
             </div>
           </div>
   
           <button className="mt-4 w-full bg-[#2C2F48] hover:bg-[#3b3e5b] text-sm text-white py-2 rounded-lg border border-[#3A3A3A]">
             + Log Case Update
           </button>
         </div>
       </div>
    );
}

export default AddLawyer;
