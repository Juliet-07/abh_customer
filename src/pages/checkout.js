import React, { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import { useCart } from "react-use-cart";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

//internal import

import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import CartItem from "@component/cart/CartItem";
import InputShipping from "@component/form/InputShipping";
import InputPayment from "@component/form/InputPayment";
import { notifySuccess } from "@utils/toast";
import DropdownComponent from "./state-selection";

const Checkout = () => {
  const router = useRouter();
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const { handleSubmit } = useForm();
  const { items, emptyCart } = useCart();
  const [shippingCost, setShippingCost] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState("");
  const [logisticsGateway, setLogisticsGateway] = useState("");
  const [reference, setReference] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [townId, setTownId] = useState("");
  // Calculate the cart total using sellingPrice instead of price
  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + item.sellingPrice * item.quantity;
    }, 0);
  }, [items]);
  const discount = 0.0; // Update this value based on your logic
  const totalCost = cartTotal + shippingCost - discount;
  const currency = "₦";

  console.log(items, "items in the cart");
  let weights = items.map((item) => item.weight);
  let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  console.log(totalWeight, "weight of products in this cart");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    // city: "",
    // state: "",
    country: "",
    shippingFee: "",
    products: [],
  };

  const [orderDetails, setOrderDetails] = useState(initialValues);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    street,
    // city,
    // state,
    country,
    shippingFee,
    products,
  } = orderDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleStateInfo = useCallback((data) => {
    console.log({ data });
    setState(data.state);
    setCity(data.cityName);
    setTownId(data.townId);
    console.log(city, "checking state");
  }, []);

  // Fetch delivery fee
  const fetchDeliveryFee = async (origin) => {
    let costData;
    let cost;
    try {
      const payload = {
        Origin: origin,
        Destination: state,
        // Weight: items.reduce(
        //   (total, item) => total + item.weight * item.quantity,
        //   0
        // ),
        Weight: totalWeight,
        // Weight: 10,
        // OnforwardingTownID: String(townId),
        OnforwardingTownID: townId,
        // PickupType: "1",
      };
      console.log(payload);
      const response = await axios.post(
        `${apiURL}/logistic/delivery-fee`,
        payload
      );
      console.log(response.data.data, "response from delivery fee");
      costData = response.data.data;
      cost = parseFloat(costData[0]?.TotalAmount);
      console.log(cost, "actual amount");
      return isNaN(cost) ? 0 : cost;
    } catch (error) {
      console.error("Error fetching delivery fee:", error);
    }
  };

  const calculateTotalDeliveryFee = async () => {
    try {
      let vendorOrigins = items.map((origin) => origin?.vendor?.state);
      console.log(vendorOrigins, "places of the vendor");

      const uniqueOrigins = [...new Set(vendorOrigins)];

      const deliveryFeePromises = uniqueOrigins.map((origin) =>
        fetchDeliveryFee(origin)
      );

      const deliveryFees = await Promise.all(deliveryFeePromises);
      console.log("Fetched delivery fees:", deliveryFees);

      const totalDeliveryFee = deliveryFees.reduce((total, fee) => {
        const numericFee = parseFloat(fee);
        return total + (isNaN(numericFee) ? 0 : numericFee);
      }, 0);

      setShippingCost(totalDeliveryFee);

      console.log("Total Delivery Fee:", totalDeliveryFee);
    } catch (error) {
      console.error("Error calculating total delivery fee:", error);
    }
  };

  // const handleShippingCost = () => {
  //   // if (state && townId) {
  //   fetchDeliveryFee();
  //   // }
  // };

  const handleCalculateDeliveryFee = () => {
    calculateTotalDeliveryFee();
  };

  const handleLogisticsSelect = (value) => {
    setLogisticsGateway(value);
  };

  const handlePaymentSelect = (value) => {
    setPaymentGateway(value);
  };

  const submitOrder = () => {
    let orderResponse;
    let url;
    const payload = {
      personaInfo: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      },
      shippingAddress: {
        street: street,
        city: city,
        state: state,
        country: country,
      },
      shippingFee: shippingCost,
      shippingMethod: logisticsGateway,
      paymentGateway: paymentGateway,
      products: items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };
    console.log(payload, "create order payload");
    setIsCheckoutSubmit(true);

    try {
      axios
        .post(`${apiURL}/orders`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((order) => {
          console.log(order.data);
          if (order.status === 201) {
            notifySuccess("Order Successfully created");
          }
          orderResponse = order.data.data;
          url = orderResponse.paymentResponse.data.url;
          emptyCart();
          router.push(url);
          // const paymentPayload = {
          //   amount: totalCost,
          //   email: email,
          //   customerName: firstName + lastName,
          //   currency: "NGN",
          //   transactionRef: ref,
          //   callback: "http://localhost:3000/about-us",
          // };

          // if (paymentGateway === "HYDROGENPAY") {
          //   axios
          //     .post(
          //       `${apiURL}/payments/hydrogenpay/initialize`,
          //       paymentPayload,
          //       {
          //         headers: {
          //           Authorization: `Bearer ${token}`,
          //           "Content-type": "application/json; charset=UTF-8",
          //         },
          //       }
          //     )
          //     .then((response) => {
          //       console.log(response);
          //     })
          // .catch((error) => {
          //   console.error("Payment Initialization Error:", error);
          // });
          // }
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        });
    } catch (error) {
      console.log("Unexpected Error:", error);
    }
  };
  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(submitOrder)}>
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
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                          required
                        />
                        {/* <Error errorName={errors.firstName} /> */}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <Label label="Last Name" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Last Name"
                          name="lastName"
                          value={lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <Label label="Email" />
                        <input
                          type="email"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <Label label="Phone Number" />
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Phone Number"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02. Shipping Information
                    </h2>

                    <div className="grid grid-cols-6 gap-6 mb-4">
                      <div className="col-span-6">
                        <Label label="Street Address" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="123 Boulevard Rd, Beverley Hills"
                          name="street"
                          value={street}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <Label label="City" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Los Angeles"
                          name="city"
                          value={city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <Label label="State" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="Illinois"
                          name="state"
                          value={state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <Label label="Country" />
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 text-sm"
                          placeholder="United States"
                          name="country"
                          value={country}
                          onChange={handleChange}
                          required
                        />
                      </div> */}
                    </div>
                    <DropdownComponent onForm={handleStateInfo} />

                    <Label label="Shipping Cost" />
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          currency={currency}
                          // handleShippingCost={handleShippingCost}
                          handleShippingCost={handleCalculateDeliveryFee}
                          value="REDSTART_LOGISTICS"
                          description="Delivery Cost: "
                          cost={shippingCost}
                          onClick={handleLogisticsSelect}
                        />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          currency={currency}
                          // handleShippingCost={handleShippingCost}
                          // register={register}
                          value="DHL"
                          description="Delivery Cost: "
                          cost={shippingCost}
                        />
                      </div> */}
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      03. Payment Gateway
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          name="Hydrogen Pay"
                          value="HYDROGENPAY"
                          Icon={IoWalletSharp}
                          onClick={handlePaymentSelect}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          // setShowCard={setShowCard}
                          // register={register}
                          name="Providus Bank"
                          value="PROVIDUS"
                          Icon={ImCreditCard}
                          onClick={handlePaymentSelect}
                        />
                      </div>
                    </div>
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
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        type="submit"
                        className="bg-[#359E52] hover:bg-[#359E52] border border-[#359E52] transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                      >
                        {isCheckoutSubmit ? (
                          <span className="flex justify-center text-center">
                            {" "}
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">Processing</span>
                          </span>
                        ) : (
                          <span className="flex justify-center text-center">
                            Create Order
                            <span className="text-xl ml-2">
                              {" "}
                              <IoArrowForward />
                            </span>
                          </span>
                        )}
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

                {/* <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  Discount
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    0.00
                  </span>
                </div> */}

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
