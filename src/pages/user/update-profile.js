import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

//internal import
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import Dashboard from "@pages/user/dashboard";
import InputArea from "@component/form/InputArea";
import CustomerServices from "@services/CustomerServices";
import { UserContext } from "@context/UserContext";
import Uploader from "@component/image-uploader/Uploader";
import { notifySuccess, notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const UpdateProfile = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const [userData, setUserData] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // return notifySuccess("This Feature is disabled for demo!");

    setLoading(true);

    const userData = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      image: imageUrl,
    };
    CustomerServices.updateCustomer(userInfo._id, userData)
      .then((res) => {
        if (res) {
          setLoading(false);
          notifySuccess("Profile Update Successfully!");
          Cookies.set("userInfo", JSON.stringify(res));
          window.location.reload();
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err?.response?.data?.message || err?.message);
      });
  };

  useEffect(() => {
    const getUserData = () => {
      axios
        .get(`${apiURL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data, "User Info");
          setUserData(response.data.data);
          setValue("name", userData.firstName + " " + userData.lastName);
          setValue("email", userData.email);
          setValue("address", userData.address);
          setValue("phone", userData.phone);
          setImageUrl(userData.image);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getUserData();
  }, []);

  return (
    <Dashboard
      title={showingTranslateValue(
        storeCustomizationSetting?.dashboard?.update_profile
      )}
      description="This is edit profile page"
    >
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">
                Profile Info
              </h2>
            </div>
          </div>
        </div>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* <div className="bg-white space-y-6">
              <div>
                <Label label="Photo" />
                <div className="mt-1 flex items-center">
                  <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                </div>
              </div>
            </div> */}

            <div className="mt-10 sm:mt-0">
              <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="lg:mt-6 mt-4 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="First Name"
                          name="name"
                          type="text"
                          placeholder="Full Name"
                          value={userData.firstName}
                        />
                        <Error errorName={errors.name} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Last Name"
                          name="address"
                          type="text"
                          placeholder="Enter Address"
                          value={userData.lastName}
                        />
                        <Error errorName={errors.address} />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Address"
                          name="address"
                          type="text"
                          placeholder="Enter Address"
                          value={userData.firstName}
                        />
                        <Error errorName={errors.address} />
                      </div> */}

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          placeholder="Enter Valid Phone Number"
                          value={userData.phoneNumber}
                        />
                        <Error errorName={errors.phone} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Enter Valid Email"
                          value={userData.email}
                        />
                        <Error errorName={errors.email} />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                      {/* {loading ? (
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
                          <span className="font-serif ml-2 font-light">
                            Processing
                          </span>
                        </button>
                      ) : (
                        <button
                          disabled={loading}
                          type="submit"
                          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          Update
                        </button>
                      )} */}
                      {/* <button
                        // disabled={loading}
                        type="button"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                      >
                        Edit
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default dynamic(() => Promise.resolve(UpdateProfile), { ssr: false });
