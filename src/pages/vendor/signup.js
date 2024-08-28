import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  return (
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

      <div className="md:w-1/2 flex flex-col items-center justify-center">
        <div className="p-10 font-primaryBold text-xl md:text-3xl leading-10">
          Let's Get To Know
          <br /> You More
        </div>
        <div className="md:pt-4">
          <Image width={563} height={500} src="/knowMore.png" alt="logo" />
        </div>
      </div>
      <div className="md:w-1/2 h-screen overflow-y-auto">
        <div className="w-full hidden md:flex items-center justify-between p-10">
          <div></div>
          <Link href="/">
            <Image width={200} height={100} src="/abh_logo.png" alt="logo" />
          </Link>
        </div>
        <form
          // onSubmit={handleSubmit(handleCreateVendor)}
          className="w-full md:w-[70%] font-primaryRegular text-[#0C1415]"
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
                // value={firstName}
                // onChange={handleChange}
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
                // value={lastName}
                // onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="tracking-wide font-medium mb-2">Shop Name</label>
            <input
              type="text"
              name="store"
              className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
              placeholder="CAC registered name"
              // value={store}
              // onChange={handleChange}
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
              // value={address}
              // onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
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
                // value={city}
                // onChange={handleChange}
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
                // value={state}
                // onChange={handleChange}
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
                // value={country}
                // onChange={handleChange}
              />
            </div>
          </div>
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
                // value={phoneNumber}
                // onChange={handleChange}
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
                // value={alternatePhoneNumber}
                // onChange={handleChange}
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
              // value={email}
              // onChange={handleChange}
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
              // value={businessType}
              // onChange={handleChange}
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
              // value={nationalIdentificationNumber}
              // onChange={handleChange}
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
              // value={taxIdentificationNumber}
              // onChange={handleChange}
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
              // value={cacRegistrationNumber}
              // onChange={handleChange}
            />
          </div>
          <div>
            <label className="tracking-wide font-medium mb-2">
              CAC Document
            </label>
            <input
              type="file"
              name="docx"
              // onChange={handleFileUpload}
              multiple
              className="px-3"
            />
            <p className="text-red-500 text-xs mt-2">File must be a PDF</p>
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
  );
};

export default Signup;
