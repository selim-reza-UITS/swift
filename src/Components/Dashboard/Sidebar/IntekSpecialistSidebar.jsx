import { FaSignOutAlt } from "react-icons/fa";
import { Plus } from "lucide-react";

import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { VscGraphLine } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.png";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { PiClockCountdownLight } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import AddClientForm from "../../Shared/AddClientForm";
const IntekSpecialistSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeetingsDropdownOpen, setSeetingsDropdownOpen] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(user);
  const dropdownRef = useRef(null);

  const isActiveDashboard = location.pathname === "/dashboard/intakeSpecialist";

  const isActiveClient = location.pathname.startsWith(
    "/dashboard/intakeSpecialist"
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    navigate("/login", { replace: true }); // Redirect to login page
  };
  const toggleDropdownSettings = () => setSeetingsDropdownOpen((prev) => !prev);
  return (
    <div className="bg-[#161E2F]  border-r-2  border-r-[#161E2F]  min-h-screen text-white flex flex-col justify-between  open-sns">
      {/* Logo Section */}
      <div className="flex flex-col py-4">
        <Link to={"/dashboard/intakeSpecialist"}>
          <div className="flex items-center justify-center w-full gap-2 text-xl font-extrabold md:text-xl lg:text-2xl mt-9">
            <a className="block" href="#">
              <img src={logo} alt="" className="" />
            </a>
          </div>
        </Link>
        {/* Menu Items */}
        <nav className="flex flex-col mt-9">
          <NavLink
            to="/dashboard/intakeSpecialist"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 ">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveDashboard
                      ? " rounded-xl"
                      : ""
                  }`}
              >
                <VscGraphLine className="w-[22px] h-[22px] font-bold" />
                <h1 className="text-xl font-medium poppins">Dashboard</h1>
              </div>
            </div>
          </NavLink>
          {/* <NavLink
            to="/dashboard/intakeSpecialistClients"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveClient
                      ? " rounded-xl"
                      : ""
                  }`}
              >
                <HiMiniUserGroup className="w-[22px] h-[22px] font-bold" />
                <h1 className="text-xl font-medium poppins">Clients</h1>
              </div>
            </div>
          </NavLink> */}
          <NavLink
            to="/dashboard/intakeSpecialistSettings"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveClient
                      ? " rounded-xl"
                      : ""
                  }`}
              >
                <IoMdSettings className="w-[22px] h-[22px] font-bold" />
                <h1 className="text-xl font-medium poppins">Settings</h1>
              </div>
            </div>
          </NavLink>
          <div
            onClick={() => setShowAddClientModal(true)}
            className="flex items-center justify-between w-[280px] cursor-pointer"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveClient
                      ? " rounded-xl"
                      : ""
                  }`}
              >
                <Plus className="w-[22px] h-[22px] font-bold" />
                <h1 className="text-xl font-medium poppins">New Client</h1>
              </div>
            </div>
          </div>
          {showAddClientModal && (
            <div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60"
              onClick={() => setShowAddClientModal(false)}
            >
              <div
                className="relative w-full max-w-lg p-0 rounded-lg shadow-lg bg-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                <AddClientForm setShowAddClientModal={setShowAddClientModal} />
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center p-2 pb-10 pl-10 space-x-3 text-red-500 rounded-lg cursor-pointer"
      >
        <FaSignOutAlt />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default IntekSpecialistSidebar;
