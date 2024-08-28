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
            <div className="w-full h-[72px] bg-white my-3 flex items-center px-5 font-primaryBold">
              Your order is successfully placed
            </div>
            <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-5 md:gap-20">
              {/* form one */}
              <div
                className="w-full p-[20px] min-h-[100vh] md:rounded-[10px]
           border-[1px] border-[#CFCBCB] bg-white md:max-w-[426px]"
              >
                <b className="text-[16px]">Featured Image</b>
                <p className="text-[16px]">
                  Upload your product featured image here. Image size should not
                  be more than 2 MB
                </p>
                <br />
                <br />
                <b className="text-[16px]">Gallery</b>
                <p className="text-[16px]">
                  Upload your product image gallery here. Image size should not
                  be more than  2 MB
                </p>
                <br />
              </div>
              {/* form two */}
              <div className="w-full p-5 min-h-[100vh] md:rounded-xl border bg-white grid">
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
                  <label className="text-base">Quantity (in units)</label>
                  <input
                    type="number"
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Number of item"
                    name="quantity"
                    // value={quantity}
                    // onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-base">Manufacturer</label>
                  <input
                    type="text"
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Input Brand Name"
                    name="manufacturer"
                    // value={manufacturer}
                    // onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-base">Price</label>
                  <input
                    type="number"
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Price per item"
                    name="price"
                    // value={price}
                    // onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-base">Product Description</label>
                  <textarea
                    className="w-full border border-[#CFCBCB] p-3 my-2"
                    placeholder="Enter product description"
                    name="description"
                    // value={description}
                    // onChange={handleChange}
                  ></textarea>
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
