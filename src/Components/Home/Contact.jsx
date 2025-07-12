import React from "react";

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
      <div className="flex flex-col items-start justify-between w-full gap-8 p-6 md:flex-row">
        {/* Left side */}
        <div className="flex flex-col justify-start">
          <h1 className="text-5xl poppins md:text-6xl font-medium bg-gradient-to-r from-[#7C3AED] to-[#537AFF] bg-clip-text text-transparent selection:mb-4 text-center md:text-left">
            Contact →
            <br />
            Us Today
          </h1>
          <p className="text-sm text-[#7C3AED] uppercase tracking-widest mt-4">
            Contact Form
          </p>
          <p className="text-xs text-[#7C3AED] mt-1 ">
            Send us a message and someone from the department you selected will
            get back to you as soon as possible.
          </p>
        </div>

        {/* Right side (Form) */}
        <form className="grid grid-cols-2 gap-4 text-purple-600 poppins">
          <div className="col-span-2 text-sbase  text-[#7C3AED]">
            <div>
              <input
                type="text"
                placeholder="Which Department are you contacting?"
                className="w-full border-b border-[#8B5CF6] focus:outline-none  bg-transparent focus:border-purple-600 placeholder:text-[#6366F1]  poppins"
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="First Name :"
              className="w-full border-b border-[#8B5CF6] focus:outline-none  bg-transparent focus:border-purple-600 placeholder:text-[#6366F1]  poppins"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name :"
              className="w-full border-b border-[#8B5CF6] focus:outline-none  bg-transparent focus:border-purple-600 placeholder:text-[#6366F1]  poppins"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email :"
              className="w-full border-b border-[#8B5CF6] focus:outline-none  bg-transparent focus:border-purple-600 placeholder:text-[#6366F1]  poppins"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Subject:"
              className="w-full border-b border-[#8B5CF6] focus:outline-none  bg-transparent focus:border-purple-600 placeholder:text-[#6366F1]  poppins"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1 text-[#6366F1] ">
              Message:
            </label>
            <textarea
              rows="4"
              className="w-full border border-[#6366F1] rounded-md p-2 focus:outline-none focus:border-purple-600"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
