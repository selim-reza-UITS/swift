import {
  FaTwitter,
  FaSlack,
  FaFacebookF,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../../assets/logo.png"; // Adjust the path as necessary
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-[#0D111C] text-white px-6 md:px-20 py-12 poppins">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="" />
            <h1 className="font-semibold text-white text-2xl">Arviso</h1>
          </div>
          <p className="text-sm footer-color mt-2 max-w-xs">
            AI-powered client communication platform for law firms.
          </p>
          <div className="flex space-x-4 mt-4 footer-color">
            <a href="" className="hover:text-white cursor-pointer">
              <FaTwitter className="hover:text-white cursor-pointer" />
            </a>
            <a className="hover:text-white cursor-pointer" href="">
              <FaLinkedin />
            </a>

            <a href="" className="hover:text-white cursor-pointer">
              {" "}
              <FaFacebookF />{" "}
            </a>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
          <a href="#" className="text-sm footer-color hover:text-white">
            Home
          </a>
          <Link to={'/privacy'} className="text-sm footer-color hover:text-white">
            Privacy Policy
          </Link>
          <Link to={'/terms'} className="text-sm footer-color hover:text-white">
            Terms and condition
          </Link>
        </div>

        {/* Contact Section */}
        <div className="space-y-2">
          <h2 className="text-sm text-white font-semibold">Get in touch</h2>
          <div className="flex items-center footer-color text-sm">
            <FaEnvelope className="mr-2" />
            <span>hello@arviso.ai</span>
          </div>
          <div className="flex items-center footer-color text-sm">
            <FaPhoneAlt className="mr-2" />
            <span>0192 295 - 4922</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
