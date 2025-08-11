import React from "react";
import Booking_widget from "./Booking_widget";

const Contact = () => {
  return (
    <div id="Contact us" className="container px-6 py-12 mx-auto">
      <div className="flex flex-col items-center justify-between mb-8">
        <h2 className="text-3xl poppins text-center md:text-left font-bold mb-2 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
          Secure Early Access to Arviso
        </h2>
        <p className="text-[#4B5563] text-center md:text-left mb-8 text-sm outfit">
          Choose the perfect plan for your firm's size and needs
        </p>
      </div>
      <div className="flex flex-col items-center justify-between w-full gap-8 p-6 md:flex-row">
        {/* Left side */}
        <div className="flex flex-col justify-start">
          <h1 className="text-5xl poppins md:text-6xl font-medium bg-gradient-to-r from-[#7C3AED] to-[#537AFF] bg-clip-text text-transparent selection:mb-4 text-center md:text-left">
            Contact →
            <br />
            Us Today
          </h1>
         
        </div>

        {/* Right side (Form) */}
   <div>
    <Booking_widget />
   </div>
      </div>
    </div>
  );
};

export default Contact;
