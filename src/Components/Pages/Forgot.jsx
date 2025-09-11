import { useState } from "react";
import loginImage from "../../assets/loginpage.png";
import login from "../../assets/login-banner.png"; // Assuming you have a login image
import logo from "../../assets/loginlogo.png";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Verification from "./Verification";
import { useForgotPasswordMutation } from "../../Redux/api/authapi";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const handleOtpSend = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear old error

    if (!email) {
      setErrorMessage("Email field cannot be empty!");
      return;
    }

    try {
      const response = await forgotPassword({ email });
      console.log("OTP Sent:", response);

      localStorage.setItem("email", email);

      // Show SweetAlert with the response message
      Swal.fire({
        icon: "success",
        title: "OTP Sent Successfully",
        // text: response?.message || "An OTP has been sent to your email.",
        text: "An OTP has been sent to your email.",
        confirmButtonColor: "#3085d6",
      });
      setOtpSent(true);
      // Optional: Navigate to OTP verification page
      // navigate("/verify-otp");
    } catch (error) {
      console.error("Error sending OTP:", error);

      if (error?.status === 400 && error?.data?.detail?.email?.detail) {
        setErrorMessage(
          "This email does not exist in our system. Please register first."
        );
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    }
  };
  return (
    <div>
      {!otpSent ? (
        <div
          className="h-auto p-4 bg-center bg-cover "
          style={{ backgroundImage: `url(${loginImage})` }}
        >
          <div className="container relative flex items-center justify-start min-h-screen mx-auto">
            <div
              className=" rounded-lg p-10 w-full max-w-2xl shadow-2xl h-[800px] bg-center bg-cover  justify-center items-center ml-12  "
              style={{ backgroundImage: `url(${login})` }}
            >
              <div className="flex flex-col justify-center w-full h-full">
                {" "}
                <div className="flex flex-col items-center mb-8">
                  <div className="flex items-center gap-4 mb-4 text-xl font-extrabold md:text-2xl lg:text-6xl">
                    <Link to="/login" className="block text-teal-600" href="/">
                      <img src={logo} alt="" className="w-[120px] h-[120px]" />
                    </Link>
                  </div>
                  <p className="mb-2 text-4xl font-bold text-blue-400 poppin poppins">
                    Reset Your Password
                  </p>
                  <p className="text-[#54657E] w-2/3 mt-2 text-base poppin font-normal  poppins">
                    Enter your email to receive a one-time password (OTP) to
                    reset your password.
                  </p>
                </div>
                <form onSubmit={handleOtpSend} className="space-y-4">
                  <div>
                    <label className="block text-[#979797] text-base mb-1 outfit">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-white/20 text-black placeholder-[#979797] focus:outline-none focus:ring-2 focus:ring-blue-400 border border-[#979797] outfit"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="w-1/2 mx-auto ">
                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-[#95016D]  via-[#7601C1] to-[#0124B6] text-white font-bold hover:opacity-90 transition outfit"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
                {message && (
                  <p className="mt-4 text-sm text-center text-green-400">
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Verification /> // Show the Verification page after OTP is sent
      )}
    </div>
  );
};

export default Forgot;
