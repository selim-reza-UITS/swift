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
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        {/* Left Section */}
        <div>
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-[70px] h-[70px]" />
            <h1 className="text-2xl font-semibold text-white">Arviso</h1>
          </div>
          <p className="max-w-xs mt-2 text-sm footer-color">
            AI-powered client communication platform for law firms.
          </p>
          <div className="flex mt-4 space-x-4 footer-color">
            <a href="" className="cursor-pointer hover:text-white">
              <FaTwitter className="cursor-pointer hover:text-white" />
            </a>
            <a className="cursor-pointer hover:text-white" target="_blank" href="https://www.linkedin.com/in/arviso-ai-236334361/">
              <FaLinkedin />
            </a>

            <a href="" className="cursor-pointer hover:text-white">
              {" "}
              <FaFacebookF />{" "}
            </a>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-6">
          <Link to={'/'} className="text-sm footer-color hover:text-white">
            Home
          </Link>
          <Link to={'/privacy'} className="text-sm footer-color hover:text-white">
            Privacy Policy
          </Link>
          <Link to={'/terms'} className="text-sm footer-color hover:text-white">
            Terms and conditions
          </Link>
        </div>

        {/* Contact Section */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-white">Get in touch</h2>
          <div className="flex items-center text-sm footer-color">
            <FaEnvelope className="mr-2" />
            <span>hello@arviso.ai</span>
          </div>
          <div className="flex items-center text-sm footer-color">
            <FaPhoneAlt className="mr-2" />
            <span>(702) 305 - 4252</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
