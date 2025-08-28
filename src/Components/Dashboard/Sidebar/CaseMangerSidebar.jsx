import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { VscGraphLine } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.png";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { Plus } from "lucide-react";
import AddClientForm from "../../Shared/AddClientForm";
import "./sidebar.css";
const CaseMangerSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const isActiveDashboard = location.pathname === "/dashboard/admin";
  const isActiveClient = location.pathname.startsWith("/dashboard/client");
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
  const toggleDropdownSettings = () => setSettingsDropdownOpen((prev) => !prev);
  return (
    <div className="bg-[#161E2F]  border-r-2  border-r-[#161E2F]  min-h-screen flex flex-col justify-between  open-sns">
      {/* Logo Section */}
      <div className="flex flex-col py-4">
        <Link to={"/"}>
          <div className="flex items-center justify-center w-full gap-2 text-xl font-extrabold md:text-xl lg:text-2xl mt-9">
            <Link
              to={"/dashboard/caseManager"}
              href="#"
            >
            <img src={logo} alt="" className="w-[50px] h-[50px]" />
            </Link>
          </div>
        </Link>
        {/* Menu Items */}
        <nav className="flex flex-col  text-[#9CA3AF] mt-9">
          <NavLink
            to="/dashboard/caseManager"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 ">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centter
                 }`}
              >
                <VscGraphLine className="w-[22px] h-[22px] font-bold" />
                <h1 className="text-xl font-medium poppins">Dashboard</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/caseManagerClients"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  `}
              >
                <HiMiniUserGroup className="w-[22px] h-[22px] font-bold" />
                <h1 className="text-xl font-medium poppins">Clients</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/caseManagerSettings"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  `}
              >
                <IoMdSettings className="w-[22px] h-[22px] font-bold" />
                <h1 className="text-xl font-medium poppins">Settings</h1>
              </div>
            </div>
          </NavLink>
          <Link onClick={() => setShowAddClientModal(true)}>
            <div className="flex items-center justify-between  mt-10 font-semibold p-2 w-full">
              <button className="px-4 flex items-center justify-center gap-2 py-2 text-sm font-medium mx-4 text-white rounded-md bg-gradient-to-r w-full from-purple-500 to-blue-600">
                <Plus className="w-[22px] h-[22px] font-bold" />
                <h1 className="text-xl font-medium poppins">New Client</h1>
              </button>
            </div>
          </Link>
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

export default CaseMangerSidebar;
