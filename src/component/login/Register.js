import React, { useState } from "react";
import {
  FiLock,
  FiMail,
  FiPhoneCall,
  FiUser,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import axios from "axios";

//internal import
import Error from "@component/form/Error";
import InputArea from "@component/form/InputArea";
import useLoginSubmit from "@hooks/useLoginSubmit";
import Label from "@component/form/Label";
import { notifyError, notifySuccess } from "@utils/toast";

const Register = ({ setShowResetPassword, setModalOpen }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, submitHandler, register1, errors } =
    useLoginSubmit(setModalOpen);

  // const { handleSubmit } = useForm();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    referralCode: "",
  };

  const [register, setRegister] = useState(initialValues);
  const { firstName, lastName, email, phoneNumber, password, referralCode } =
    register;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleRegisteration = async () => {
    setLoading(true);
    try {
      const user = await axios.post(`${apiURL}/user`, register);
      if (user.status === 201) {
        notifySuccess("User Successfully created");
        setRegister(initialValues);
        setModalOpen(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        console.log("Error:", errorMessage);
        notifyError(
          errorMessage[0] || "Sorry! Unable to complete registration"
        );
      } else {
        console.log("Error", error.message);
        notifyError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-primaryBold">Signing Up</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10 font-primaryRegular">
          Create an account with email
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleRegisteration)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5 font-primaryRegular">
          <div className="form-group relative">
            <Label label={`First Name`} />
            <div className="relative">
              <input
                value={firstName}
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none h-11 md:h-12"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-800 sm:text-base">
                  <FiUser />
                </span>
              </div>
            </div>

            <Error errorName={errors.name} />
          </div>

          <div className="form-group relative">
            <Label label={`Last Name`} />
            <div className="relative">
              <input
                value={lastName}
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none h-11 md:h-12"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-800 sm:text-base">
                  <FiUser />
                </span>
              </div>
            </div>
            <Error errorName={errors.email} />
          </div>

          <div className="form-group relative">
            <Label label={`Email`} />
            <div className="relative">
              <input
                value={email}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none h-11 md:h-12"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-800 sm:text-base">
                  <FiMail />
                </span>
              </div>
            </div>

            <Error errorName={errors.password} />
          </div>

          <div className="form-group relative">
            <Label label={`Phone Number`} />
            <div className="relative">
              <input
                value={phoneNumber}
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                onChange={handleChange}
                className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none h-11 md:h-12"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-800 sm:text-base">
                  <FiPhoneCall />
                </span>
              </div>
            </div>

            <Error errorName={errors.password} />
          </div>

          <div className="form-group relative">
            <Label label={`Password`} />
            <div className="relative">
              <input
                value={password}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none h-11 md:h-12"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-800 sm:text-base">
                  <FiLock />
                </span>
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-800" />
                ) : (
                  <FiEye className="text-gray-800" />
                )}
              </div>
            </div>

            <Error errorName={errors.password} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              {/* <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                Forgot password?
              </button> */}
            </div>
          </div>
          {loading ? (
            <button
              disabled={loading}
              type="submit"
              className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-[#359E52] text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-[#359E52] h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
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
              className="w-full text-center py-3 rounded bg-[#359E52] text-white hover:bg-[#359E52] transition-all focus:outline-none my-1"
            >
              Register
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Register;
