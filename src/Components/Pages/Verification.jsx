import { useEffect, useState } from "react";
import loginImage from "../../assets/loginpage.png";
import login from "../../assets/login-banner.png"; // Assuming you have a login image
import logo from "../../assets/loginlogo.png";
import SetNew from "./SetNew";
import Reset from "./Reset";

const Verification = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Suc
  const [otpSent, setOtpSent] = useState(false);
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setErrorMessage("Email not found. Please restart the process.");
    }
  }, []);
  // Handle input change
  const handleInputChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`input-${index + 1}`).focus(); // Focus next input
    }
  };

  // Handle keydown for navigating between inputs
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      document.getElementById(`input-${index - 1}`).focus(); // Focus previous input
    }
  };

  // Handle paste event (only numeric values are allowed)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").split("");
    if (
      pastedData.length === 4 &&
      pastedData.every((char) => /^\d$/.test(char))
    ) {
      setCode(pastedData);
    }
  };

  // Handle submit (Verification logic)
  // Handle submit
  const handleSubmit = async () => {
    const otp = code.join("");
    if (otp.length !== 4) {
      setErrorMessage("Please enter a valid 4-digit code.");
      return;
    }

    try {
      //   const response = await verifyPass({ email, otp }).unwrap(); // Send request
      console.log("OTP Verified:");
      //   if (response?.access_token) {
      //     localStorage.setItem("access_token", response.access_token); // Save token
      //   }
      // Navigate to verification page
      setOtpSent(true); // Adjust the route as needed
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      setErrorMessage(error?.data?.message || "Invalid OTP. Try again.");
    }
  };
  return (
    <div>
      {!otpSent ? (
        <div
          className="h-auto p-4 bg-center bg-cover "
          style={{ backgroundImage: `url(${loginImage})` }}
        >
          <div className="relative flex items-center justify-start min-h-screen mx-auto containmer">
            <div
              className=" rounded-lg p-10 w-full max-w-2xl shadow-2xl h-[800px] bg-center bg-cover  justify-center items-center ml-12  "
              style={{ backgroundImage: `url(${login})` }}
            >
              {/* left side */}
              <div className="flex flex-col items-center justify-center w-full h-full ">
                <div className="flex flex-col items-center ">
                  <div className="flex items-center gap-4 mb-4 text-xl font-extrabold md:text-2xl lg:text-6xl">
                    <a className="block text-teal-600" href="#">
                      <img src={logo} alt="" className="" />
                    </a>
                    <h1 className="text-black  poppins">Arviso</h1>
                  </div>
                  <p className="text-4xl font-bold text-blue-400 poppin poppins">
                    OTP code verification 🔐
                  </p>
                  <p className="text-[#54657E] w-2/3 mt-2 text-base poppins font-normal  poppins">
                    Please enter your email and we will send an OTP code in the
                    next step to reset your password.
                  </p>
                </div>

                {/* OTP Input Fields */}
                <div
                  className="flex justify-center mt-6 mb-4 space-x-3"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`input-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleInputChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 border border-[#7C3AED] bg-[#7C3AED] hover:bg-white rounded-xl text-center text-lg placeholder:text-[#313131] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-white hover:text-black"
                    />
                  ))}
                </div>
                {/* Success/Error Message */}
                {successMessage && (
                  <p className="mt-4 text-lg font-semibold">{successMessage}</p>
                )}
                {errorMessage ? (
                  <div className="text-xl text-center text-red-500">
                    {" "}
                    Verification Code not Valid Try again
                  </div>
                ) : (
                  <div></div>
                )}
                {/* Verify Button */}
                <div className="w-1/2 mx-auto " onClick={handleSubmit}>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-[#95016D]  via-[#7601C1] to-[#0124B6] text-white font-bold hover:opacity-90 transition outfit"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Reset></Reset>
      )}
    </div>
  );
};

export default Verification;
