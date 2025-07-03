import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

import getRole from "../../utils/role";

const Header = () => {
  //   const role = useSelector((state) => state.auth.role); // Redux  role
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  //   const { data, isLoading, error, refetch } = useGetStudentProfileQuery();
  const role = getRole();
  return (
    <div className="flex items-center border-b  border-b-[#161E2F] justify-between p-6 bg-[#161E2F] dark:bg-white text-white dark:text-white">
      {/* Title */}
      <div></div>

      {/* Profile Section based on role */}
      <div className="flex justify-around items-center gap-4">
        {role === "Admin" && (
          <div className="curosr-pointer" onClick={() => setIsModalOpen(true)}>
            <img
              src="https://example.com/admin-profile.jpg"
              alt="Admin Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        )}
        {role === "User" && (
          <div
            className="curosr-pointer"
            onClick={() => setIsSchoolModalOpen(true)}
          >
            {/* <img
              src={data?.data?.user?.image}
              alt="Student Profile"
              className="w-10 h-10 rounded-full"
            /> */}
            <img
              src="https://example.com/admin-profile.jpg"
              alt="Admin Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        )}

        {role === "Parents" && (
          <div>
            <img
              src="https://example.com/parents-profile.jpg"
              alt="Parents Profile"
              className="w-10 h-10 rounded-full"
            />
            <span>Parents</span>
          </div>
        )}
      </div>

      {/* {isModalOpen && <AdminProfile onClose={() => setIsModalOpen(false)} />} */}
      {/* {isSchoolModalOpen && (
        <SchoolProfile onClose={() => setIsSchoolModalOpen(false)} />
      )} */}
    </div>
  );
};

export default Header;
