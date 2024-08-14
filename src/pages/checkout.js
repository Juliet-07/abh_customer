import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { CardElement } from "@stripe/react-stripe-js";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";
import { useCart } from "react-use-cart";

//internal import

import Layout from "@layout/Layout";
import useAsync from "@hooks/useAsync";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import CartItem from "@component/cart/CartItem";
import InputArea from "@component/form/InputArea";
import useGetSetting from "@hooks/useGetSetting";
import InputShipping from "@component/form/InputShipping";
import InputPayment from "@component/form/InputPayment";
// import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useUtilsFunction from "@hooks/useUtilsFunction";
import SettingServices from "@services/SettingServices";

const Checkout = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { items, cartTotal, currency } = useCart();
  // const { handleSubmit, submitHandler, error, isEmpty, isCheckoutSubmit } =
  //   useCheckoutSubmit();
  // const { t } = useTranslation();
  // const { storeCustomizationSetting } = useGetSetting();
  // const { showingTranslateValue } = useUtilsFunction();
  // const { data: storeSetting } = useAsync(SettingServices.getStoreSetting);

  // const {
  //   handleSubmit,
  //   submitHandler,
  //   handleShippingCost,
  //   register,
  //   errors,
  //   showCard,
  //   setShowCard,
  //   error,
  //   stripe,
  //   couponInfo,
  //   couponRef,
  //   handleCouponCode,
  //   discountAmount,
  //   shippingCost,
  //   total,
  //   isEmpty,
  //   items,
  //   cartTotal,
  //   currency,
  //   isCheckoutSubmit,
  // } = useCheckoutSubmit();

  // console.log(
  //   "shippingCost",
  //   shippingCost,
  //   "  storeCustomizationSetting?.checkout",
  //   storeCustomizationSetting?.checkout
  // );

  // console.log("storeCustomizationSetting", storeCustomizationSetting);

  // useEffect(() => {
  //   // Function to call addToCart API
  //   const sendCartDataToBackend = async () => {
  //     try {
  //       const response = await axios.post(`${apiURL}/cart/add`, { cartItems });
  //       if (response.status === 200) {
  //         console.log("Cart data successfully sent to backend:", response.data);
  //       } else {
  //         console.error("Failed to send cart data:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error sending cart data to backend:", error);
  //     }
  //   };

  //   // Call the function when the component mounts or when cartItems change
  //   if (cartItems.length > 0) {
  //     sendCartDataToBackend();
  //   }
  // }, [cartItems]);
  // Calculate shipping cost, discount, and total cost
  const shippingCost = 0.0; // Update this value based on your logic
  const discount = 0.0; // Update this value based on your logic
  const totalCost = cartTotal + shippingCost - discount;
  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                {/* <form onSubmit={handleSubmit(submitHandler)}> */}
                <form>
                  <div className="form-group">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      01. Personal Details
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <Label label="First Name" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="First Name"
                        />
                        {/* <Error errorName={errors.firstName} /> */}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <Label label="Last Name" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <Label label="Email" />
                        <input
                          type="email"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <Label label="Phone Number" />
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02. Shipping Information
                    </h2>

                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-6">
                        <Label label="Street Address" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="123 Boulevard Rd, Beverley Hills"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <Label label="City" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Los Angeles"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <Label label="Country" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="United States"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <Label label="Zip Code" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="2345"
                        />
                      </div>
                    </div>

                    <Label
                    // label={showingTranslateValue(
                    //   storeCustomizationSetting?.checkout?.shipping_cost
                    // )}
                    />
                    {/* <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          currency={currency}
                          handleShippingCost={handleShippingCost}
                          register={register}
                          value="FedEx"
                          // value={showingTranslateValue(
                          //   storeCustomizationSetting?.checkout
                          //     ?.shipping_name_two
                          // )}
                          // description={showingTranslateValue(
                          //   storeCustomizationSetting?.checkout
                          //     ?.shipping_one_desc
                          // )}
                          // time="Today"
                          cost={
                            Number(
                              storeCustomizationSetting?.checkout
                                ?.shipping_one_cost
                            ) || 60
                          }
                        />
                        <Error errorName={errors.shippingOption} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          currency={currency}
                          handleShippingCost={handleShippingCost}
                          register={register}
                          // value={showingTranslateValue(
                          //   storeCustomizationSetting?.checkout
                          //     ?.shipping_name_two
                          // )}
                          // description={showingTranslateValue(
                          //   storeCustomizationSetting?.checkout
                          //     ?.shipping_two_desc
                          // )}
                          // time="7 Days"
                          cost={
                            Number(
                              storeCustomizationSetting?.checkout
                                ?.shipping_two_cost
                            ) || 20
                          }
                        />
                        <Error errorName={errors.shippingOption} />
                      </div>
                    </div> */}
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      03. Payment Menthod
                    </h2>
                    {/* {showCard && (
                      <div className="mb-3">
                        <CardElement />{" "}
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-6">
                      {storeSetting?.cod_status && (
                        <div className="col-span-6 sm:col-span-3">
                          <InputPayment
                            setShowCard={setShowCard}
                            register={register}
                            name={t("common:cashOnDelivery")}
                            value="Cash"
                            Icon={IoWalletSharp}
                          />
                          <Error errorName={errors.paymentMethod} />
                        </div>
                      )}

                      {storeSetting?.stripe_status && (
                        <div className="col-span-6 sm:col-span-3">
                          <InputPayment
                            setShowCard={setShowCard}
                            register={register}
                            name={t("common:creditCard")}
                            value="Card"
                            Icon={ImCreditCard}
                          />
                          <Error errorName={errors.paymentMethod} />
                        </div>
                      )}
                    </div> */}
                  </div>

                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                    <div className="col-span-6 sm:col-span-3">
                      <Link
                        href="/"
                        className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
                      >
                        <span className="text-xl mr-2">
                          <IoReturnUpBackOutline />
                        </span>
                        Continue Shipping
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        type="submit"
                        // disabled={isEmpty || !stripe || isCheckoutSubmit}
                        className="bg-[#359E52] hover:bg-[#359E52] border border-[#359E52] transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                      >
                        {/* {isCheckoutSubmit ? (
                          <span className="flex justify-center text-center">
                            {" "}
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">processing</span>
                          </span>
                        ) : ( */}
                        <span className="flex justify-center text-center">
                          Confirm Order
                          {/* {showingTranslateValue(
                              storeCustomizationSetting?.checkout
                                ?.confirm_button
                            )} */}
                          <span className="text-xl ml-2">
                            {" "}
                            <IoArrowForward />
                          </span>
                        </span>
                        {/* )} */}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  Order Summary
                </h2>

                {/* <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} currency={currency} />
                  ))}

                  {isEmpty && (
                  <div className="text-center py-10">
                    <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                      <IoBagHandle />
                    </span>
                    <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                      No Item Added Yet!
                    </h2>
                  </div>
                  )}
                </div> */}

                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <CartItem key={item.id} item={item} currency={currency} />
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  Subtotal
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency} 
                    {cartTotal?.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  Shipping Cost
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {shippingCost?.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  Discount
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    0.00
                  </span>
                </div>

                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    Total Cost
                    <span className="font-serif font-extrabold text-lg">
                      {currency}
                      {parseFloat(totalCost).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
