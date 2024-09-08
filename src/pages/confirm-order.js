import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import axios from "axios";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import CardTwo from "@component/cta-card/CardTwo";
import StickyCart from "@component/cart/StickyCart";
import Loading from "@component/preloader/Loading";
import ProductCard from "@component/product/ProductCard";
import FeatureCategory from "@component/category/FeatureCategory";
import CMSkeleton from "@component/preloader/CMSkeleton";
import MainCarousel from "@component/carousel/MainCarousel";
import OfferCard from "@component/offer/OfferCard";
import Banner from "@component/banner/Banner";

const ConfirmOrder = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);

  const categories = [
    {
      image: "/fashion.png",
      title: "Fashion & Apparel",
      path: "/about-us",
    },
    {
      image: "/electronics.png",
      title: "Electronics",
      path: "/contact-us",
    },
    {
      image: "/beauty.png",
      title: "Health & Beauty",
      path: "/contact-us",
    },
    {
      image: "/home.png",
      title: "Home & Kitchen",
      path: "/about-us",
    },
    {
      image: "/grocery.png",
      title: "Grocery and Gourmet",
      path: "/contact-us",
    },
    {
      image: "/beauty.png",
      title: "Health & Beauty",
      path: "/contact-us",
    },
  ];

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    const getProducts = () => {
      axios
        .get(`${apiURL}/products/list/retail`)
        .then((response) => {
          console.log(response.data.data.products);
          setProducts(response.data.data.products);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    // const getCategories = () => {
    //   axios
    //     .get(`${apiURL}/category`)
    //     .then((response) => {
    //       console.log(response.data.data.data);
    //       setCategories(response.data.data.data);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching vendors:", error);
    //     });
    // };

    // getCategories();
    getProducts();
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen bg-gray-50 py-4 mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="w-full h-[60px] bg-white mb-8 flex items-center px-5 font-primaryMedium shadow-md">
              Order Placement
            </div>
            <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-20">
              {/* form one */}
              <div className="w-full md:w-[50%] min-h-[80vh] p-5 md:rounded-xl border border-[#CFCBCB] bg-white grid">
                <b className="text-[16px]">Shipping Information</b>
                <div>
                  <label className="text-base">Full Name</label>
                  <input
                    type="text"
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Name of item"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-base">Phone Number</label>
                  <input
                    type="text"
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Name of item"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-base">Delivery Address</label>
                  <input
                    type="text"
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Name of item"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-base">Product Name</label>
                  <input
                    type="text"
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Name of item"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-base">Payment Method</label>
                  <input
                    type="text"
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Name of item"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                  />
                </div>
              </div>
              {/* form two */}
              <div className="w-full md:w-[50%] min-h-[80vh] p-5 md:rounded-xl border border-[#CFCBCB] bg-white grid gap-2">
                <b className="text-[16px] font-primarySemibold">
                  Payment Summary
                </b>

                <div className="flex justify-between">
                  <p className="font-primaryRegular">Item's total (1)</p>
                  <p className="font-primarySemibold">₦ 15,000.00</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-primaryRegular">QTY</p>
                  <p className="font-primaryRegular">1 unit</p>
                </div>

                <div className="w-full flex items-center justify-between font-primaryRegular mt-2">
                  <p>Subtotal</p>
                  <p>₦ 15,000.00</p>
                </div>

                <hr className="border-t border-gray-300 my-2" />

                <div className="w-full flex items-center justify-between font-primaryRegular">
                  <p>Shipping fee</p>
                  <p>₦ 1,500.00</p>
                </div>

                <hr className="border-t border-gray-300 my-2" />

                <div className="w-full flex items-center justify-between font-primarySemibold">
                  <p>Total</p>
                  <p>₦ 17,000.00</p>
                </div>

                <div className="w-full flex items-center justify-center mt-5">
                  <button className="w-[265px] h-[46px] bg-[#4CBD6B] rounded-lg text-white font-primarySemibold">
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default ConfirmOrder;
