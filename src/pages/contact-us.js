import React from "react";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiMapPin, FiBell } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import { notifySuccess } from "@utils/toast";
import InputArea from "@component/form/InputArea";

const ContactUs = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = () => {
    notifySuccess(
      "your message sent successfully. We will contact you shortly."
    );
  };

  return (
    <Layout title="Contact Us" description="This is contact us page">
      {/* Hero section */}
      <div
        className="w-full h-[350px] md:h-[550px] relative bg-cover md:px-10 2xl:px-20 md:flex items-center"
        style={{
          backgroundImage: `url(${"../contact-hero.png"})`,
        }}
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between relative z-[3] p-4 pt-20 md:pt-4">
          <div>
            <p className="text-3xl md:text-5xl font-primaryBold text-white my-4 text-center md:text-left">
              Contact Us
            </p>
            <div className="md:w-[621px] md:h-[240px] md:text-xl font-primaryRegular leading-10 md:leading-[50px] text-white text-center md:text-left">
              We value your feedback and inquiriries. Whether you have
              questions, need assistance, or want to share your thoughts, we are
              here to help
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* Contact Details */}
      <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-4 p-4 md:p-10">
        {/* Reach out to us */}
        <div className="md:w-[535px] bg-[#359E52] flex flex-col p-6 md:p-10">
          <div className="w-full font-primaryBold text-2xl text-white text-center">
            Reach Out To Us
          </div>
          <div className="grid gap-4 my-4 text-white font-primaryRegular">
            <div className="flex">
              <FiMail size={20} />
              <p className="mx-4">Email us</p>
              <p>@info.abhmarkets.com</p>
            </div>
            <div className="flex">
              <FiBell size={20} />
              <p className="mx-4">Call us</p>
              <p>+234 70 6113 1509</p>
            </div>
            <div className="flex">
              <FiMapPin size={20} />
              <p className="mx-4">location</p>
            </div>
            <div className="md:w-[343px] leading-10">
              10 Havana Estate SARS Road,
              <br /> Port Harcourt, Nigeria
            </div>
          </div>
        </div>
        {/* content form */}
        <div className="md:w-[748px] bg-white border border-[#CFCBCB] p-4">
          <div className="w-full font-primaryBold text-2xl text-center">
            Send Us A Message
          </div>
          {/* form proper */}
          <div className="">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="w-full mx-auto flex flex-col justify-center p-3 md:p-6"
            >
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                  <div className="w-full md:w-1/2 ">
                    <InputArea
                      register={register}
                      label={t("common:contact-page-form-input-name")}
                      name="name"
                      type="text"
                      placeholder={t("common:contact-page-form-plaholder-name")}
                    />
                    <Error errorName={errors.name} />
                  </div>
                  <div className="w-full md:w-1/2 md:ml-2.5 lg:ml-5 mt-2 md:mt-0">
                    <InputArea
                      register={register}
                      label={t("common:contact-page-form-input-email")}
                      name="email"
                      type="email"
                      placeholder={t(
                        "common:contact-page-form-plaholder-email"
                      )}
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>
                <div className="relative">
                  <InputArea
                    register={register}
                    label={t("common:contact-page-form-input-subject")}
                    name="subject"
                    type="text"
                    placeholder={t(
                      "common:contact-page-form-plaholder-subject"
                    )}
                  />
                  <Error errorName={errors.subject} />
                </div>
                <div className="relative mb-4">
                  <Label label={t("common:contact-page-form-input-message")} />
                  <textarea
                    {...register("message", {
                      required: `Message is required!`,
                    })}
                    name="message"
                    className="px-4 py-3 flex items-center w-full rounded appearance-none opacity-75 transition duration-300 ease-in-out text-sm focus:ring-0 bg-white border border-gray-300 focus:shadow-none focus:outline-none focus:border-gray-500 placeholder-body"
                    autoComplete="off"
                    spellCheck="false"
                    rows="4"
                    placeholder={t(
                      "common:contact-page-form-plaholder-message"
                    )}
                  ></textarea>
                  <Error errorName={errors.message} />
                </div>
                <div className="relative">
                  <button
                    data-variant="flat"
                    className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-[#359E52] text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto"
                  >
                    {t("common:contact-page-form-send-btn")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
