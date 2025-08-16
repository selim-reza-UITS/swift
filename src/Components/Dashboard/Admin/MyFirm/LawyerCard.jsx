/* eslint-disable react/prop-types */
import React from "react";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";

const LawyerCard = ({ data, onDelete, onView, onEdit }) => {
  return (
    <div className="bg-[#1e293b] p-4 rounded flex items-center justify-between poppins text-[#FFFFFF]">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="object-cover w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <p className="mt-1 mb-1 text-sm font-normal ">{data.phone}</p>
          <p className="text-sm font-normal">Managing User: {data.manager}</p>
        </div>
      </div>
      <div className="flex gap-4 text-xl text-gray-400">
        <FaEye onClick={onView} className="cursor-pointer hover:text-white" />
        <FaEdit onClick={onEdit} className="cursor-pointer hover:text-white" />
        <FaTrash
          onClick={onDelete}
          className="cursor-pointer hover:text-red-500"
        />
      </div>
    </div>
  );
};

export default LawyerCard;
