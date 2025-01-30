import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/toast";
import DropdownComponent from "@pages/state-selection";

const Signup = ({ title, description, children }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useForm();
  const [docx, setDocx] = useState({});
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [townId, setTownId] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    store: "",
    address: "",
    country: "",
    city: "",
    state: "",
    email: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    businessType: "",
    nationalIdentificationNumber: "",
    taxIdentificationNumber: "",
    cacRegistrationNumber: "",
  };

  const [createVendorDetails, setCreateVendorDetails] = useState(initialValues);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    store,
    country,
    // state,
    // city,
    address,
    alternatePhoneNumber,
    businessType,
    nationalIdentificationNumber,
    taxIdentificationNumber,
    cacRegistrationNumber,
  } = createVendorDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateVendorDetails({ ...createVendorDetails, [name]: value });
  };

  const handleFileUpload = (e) => {
    console.log(e.target.files);
    const docx = e.target.files[0];
    setDocx(docx);
  };

  const handleStateInfo = useCallback((data) => {
    console.log({ data });
    setState(data.state);
    setCity(data.cityName);
    setTown(data.town);
    setTownId(data.townId);
    console.log(city, "checking state");
  }, []);

  const handleCreateVendor = () => {
    setLoading(true);
    const url = `${apiURL}/vendors`;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("store", store);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("town", town);
    formData.append("townId", townId);
    formData.append("address", address);
    formData.append("alternatePhoneNumber", alternatePhoneNumber);
    formData.append("businessType", businessType);
    formData.append(
      "nationalIdentificationNumber",
      nationalIdentificationNumber
    );
    formData.append("taxIdentificationNumber", taxIdentificationNumber);
    formData.append("cacRegistrationNumber", cacRegistrationNumber);
    formData.append("cacCertificate", docx);
    formData.append("accountName", "");
    formData.append("accountNumber", "");
    formData.append("bankName", "");

    axios
      .post(url, formData, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          notifySuccess("Vendor Data sent successfully!");
          alert("Vendor Data sent successfully!");
          setCreateVendorDetails(initialValues);
          setDocx({});
          setState("");
          setCity("");
          setTown("");
        }
        console.log(response, "response from creating data");
      })
      .catch((error) => {
        alert(
          error.response?.data?.message ||
            "An error occurred! File is too large"
        );
        console.error("Error details:", error.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>ABH Markets</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="w-full flex flex-col md:flex-row p-4 md:p-0 overflow-auto">
        <Link href="/">
          <Image
            width={200}
            height={100}
            src="/abh_logo.png"
            alt="logo"
            className="block md:hidden"
          />
        </Link>
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-20">
          {/* Image */}
          <div className="md:w-1/2 flex flex-col items-center justify-center">
            {/* <div className="p-10 font-primaryBold text-xl md:text-3xl leading-10">
            Let's Get To Know
            <br /> You More
          </div> */}
            <div className="">
              <Image width={700} height={500} src="/knowMore.png" alt="logo" />
            </div>
          </div>
          {/* Form */}
          <div className="md:w-1/2 h-screen overflow-y-auto">
            <div className="w-full hidden md:flex items-center justify-between px-10 py-5">
              <div></div>
              <Link href="/">
                <Image
                  width={200}
                  height={100}
                  src="/abh_logo.png"
                  alt="logo"
                />
              </Link>
            </div>
            <form
              onSubmit={handleSubmit(handleCreateVendor)}
              className="w-full md:w-[90%] font-primaryRegular text-[#0C1415] p-4"
            >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="tracking-wide font-medium mb-2">
                    First Name
                  </label>
                  <input
                    className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="tracking-wide font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="tracking-wide font-medium mb-2">
                  Shop Name
                </label>
                <input
                  type="text"
                  name="store"
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  placeholder="CAC registered name"
                  value={store}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="tracking-wide font-medium mb-2">
                  Shop Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  placeholder="Enter location here"
                  value={address}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                <label
                  className="tracking-wide font-medium mb-2"
                  htmlFor="grid-city"
                >
                  City
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  id="grid-city"
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-4 md:mb-2">
                <label
                  className="tracking-wide font-medium mb-2"
                  htmlFor="grid-state"
                >
                  State
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  id="grid-state"
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  value={state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="tracking-wide font-medium mb-2"
                  htmlFor="grid-country"
                >
                  Country
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  id="grid-country"
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  value={country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div> */}
              <DropdownComponent onForm={handleStateInfo} />
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    className="tracking-wide font-medium mb-2"
                    htmlFor="grid-phone"
                  >
                    Business Phone Number
                  </label>
                  <input
                    className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                    id="grid-phone"
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="tracking-wide font-medium mb-2"
                    htmlFor="grid-alt"
                  >
                    Alternate Phone Number
                  </label>
                  <input
                    className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                    id="grid-alt"
                    type="text"
                    name="alternatePhoneNumber"
                    value={alternatePhoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="tracking-wide font-medium mb-2">
                  Business Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  placeholder="Input business email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="tracking-wide font-medium mb-2">
                  Business Type
                </label>
                <input
                  type="text"
                  name="businessType"
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  placeholder="Ex: Fashion"
                  value={businessType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="tracking-wide font-medium mb-2">
                  National Identification Number
                </label>
                <input
                  type="text"
                  name="nationalIdentificationNumber"
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  placeholder="Input NIN"
                  value={nationalIdentificationNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="tracking-wide font-medium mb-2">
                  Tax Identification Number
                </label>
                <input
                  type="number"
                  name="taxIdentificationNumber"
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  placeholder="Input TIN"
                  value={taxIdentificationNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="tracking-wide font-medium mb-2">
                  CAC Registration Number
                </label>
                <input
                  type="number"
                  name="cacRegistrationNumber"
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  placeholder="Input CAC Number"
                  value={cacRegistrationNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="tracking-wide font-medium mb-2">
                  CAC Document
                </label>
                <input
                  type="file"
                  name="docx"
                  onChange={handleFileUpload}
                  multiple
                  className="px-3"
                />
                <p className="text-red-500 text-xs mt-2">
                  File must be less than 1 MB
                </p>
              </div>
              <div className="w-full flex items-center justify-center my-6">
                <button
                  type="submit"
                  className="w-[395px] h-[50px] bg-[#4CBD6B] rounded-xl text-white font-semibold flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
