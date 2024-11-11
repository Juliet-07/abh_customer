import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLock, FiMail } from "react-icons/fi";
import axios from "axios";
import { useForm } from "react-hook-form";

//internal import
import Error from "@component/form/Error";
import InputArea from "@component/form/InputArea";
import useLoginSubmit from "@hooks/useLoginSubmit";
import Label from "@component/form/Label";
import { notifyError, notifySuccess } from "@utils/toast";

const ResetPassword = ({ setShowResetPassword, setModalOpen }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { redirect } = router.query;
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      // Step 1: Request OTP
      if (step === 1) {
        const response = await axios.post(`${apiURL}/user/forget-password`, {
          email: resetPassword,
        });
        console.log(response.data, "checking response");
        notifySuccess(response.data.data);
        setStep(2);
      }
      // Step 2: Verify OTP and reset password
      else if (step === 2) {
        const response = await axios.patch(`${apiURL}/user/reset-password`, {
          email: resetPassword,
          otp: otp,
          newPassword: newPassword,
        });
        console.log(response.data, "checking response");
        notifySuccess(
          response.data.data + " " + "Please login with the new password"
        );
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      notifyError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <Link href="/" className="text-2xl font-primaryBold">
          {/* Forgot Password? */}
          {step === 1 ? "Forgot Password?" : "Reset Your Password"}
        </Link>
        {/* <p className="text-sm  text-gray-500 mt-2 mb-8 sm:mb-10 font-primaryRegular">
          Enter your registered email to recieve OTP.
        </p> */}
        <p className="text-sm text-gray-500 mt-2 mb-8 sm:mb-10 font-primaryRegular">
          {step === 1
            ? "Enter your registered email to receive an OTP."
            : "Enter the OTP sent to your email and create a new password."}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="flex flex-col justify-center font-primaryRegular"
      >
        <div className="grid grid-cols-1 gap-5">
          {step === 1 && (
            <div className="form-group relative">
              <Label label={`Email`} />
              <div className="relative">
                <input
                  value={resetPassword}
                  name="email"
                  type="email"
                  placeholder="Your Registered Email"
                  onChange={(e) => setResetPassword(e.target.value)}
                  className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-[#359E52] h-11 md:h-12"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-base">
                    <FiMail />
                  </span>
                </div>
              </div>
              {/* <Error errorName={} /> */}
            </div>
          )}
          {step === 2 && (
            <>
              <div className="form-group relative">
                <Label label={`OTP`} />
                <div className="relative">
                  <input
                    value={otp}
                    name="otp"
                    type="text"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-[#359E52] h-11 md:h-12"
                  />
                </div>
              </div>

              <div className="form-group relative">
                <Label label={`New Password`} />
                <div className="relative">
                  <input
                    value={newPassword}
                    name="newPassword"
                    type="password"
                    placeholder="Enter New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-[#359E52] h-11 md:h-12"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-base">
                      <FiLock />
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {loading ? (
            <button
              disabled={loading}
              type="submit"
              className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
            >
              <img
                src="/loader/spinner.gif"
                alt="Loading"
                width={20}
                height={10}
              />
              <span className="font-serif ml-2 font-light">Processing</span>
            </button>
          ) : (
            <button
              disabled={loading}
              type="submit"
              className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
            >
              Recover password
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
