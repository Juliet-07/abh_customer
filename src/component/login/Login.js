import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

//internal  import
import Error from "@component/form/Error";
import useLoginSubmit from "@hooks/useLoginSubmit";
import InputArea from "@component/form/InputArea";
import Label from "@component/form/Label";
import { notifyError } from "@utils/toast";

const Login = ({ setShowResetPassword, setModalOpen }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { redirect } = router.query;
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const [loginDetails, setLoginDetails] = useState(initialValues);
  const { email, password } = loginDetails;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleLoginValidation = async () => {
    setLoading(true);
    try {
      const user = await axios.post(`${apiURL}/user/login`, loginDetails);
      console.log(user, "confirm here");
      let userDetail = user.data.data.accessToken;
      localStorage.setItem("abhUserInfo", userDetail);
      // router.push(redirect || "/checkout");
      // router.push("/user/dashboard")
      if (redirect) {
        router.push("/checkout");
      } else {
        router.push("/user/dashboard");
      }
    } catch (error) {
      setLoading(false);
      notifyError("Incorrect Login Details");
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-primaryBold">Login</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10 font-primaryRegular">
          Login with your email and password
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleLoginValidation)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5 font-primaryRegular">
          <div className="form-group relative">
            <Label label={`Email`} />
            <div className="relative">
              <input
                value={email}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-[#359E52] h-11 md:h-12"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-800 sm:text-base">
                  <FiMail />
                </span>
              </div>
            </div>
            {/* <Error errorName={} /> */}
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
                className="py-2 pl-10 pr-4 md:pr-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-[#359E52] h-11 md:h-12"
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
            {/* <Error errorName={} /> */}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none font-primaryRegular"
              >
                Forgot password?
              </button>
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
              Login
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
