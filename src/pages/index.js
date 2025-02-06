import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import CardTwo from "@component/cta-card/CardTwo";
import StickyCart from "@component/cart/StickyCart";
import Loading from "@component/preloader/Loading";
import ProductCard from "@component/product/ProductCard";
import CMSkeleton from "@component/preloader/CMSkeleton";
import MainCarousel from "@component/carousel/MainCarousel";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const Home = ({ attributes }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const visibleProducts = 15;

  function scrollCategories(direction) {
    const container = document.getElementById("categoryContainer");
    const scrollAmount = 300; // Adjust this value to set the scroll distance
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

    const getCategories = () => {
      axios
        .get(`${apiURL}/category`)
        .then((response) => {
          console.log(response.data.data.items);
          setCategories(response.data.data.items);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    const getProducts = () => {
      axios
        .get(`${apiURL}/products/list/retail`)
        .then((response) => {
          console.log(response.data);
          setProducts(response.data.data.products);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };
    getCategories();
    getProducts();
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            <StickyCart />

            {/* Carousel */}
            <div className="bg-white w-full">
              <div className="mx-auto w-full px-0">
                <div className="flex w-full">
                  <div className="w-full">
                    <MainCarousel />
                  </div>
                </div>
              </div>
            </div>

            {/* Shop by Category */}
            <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="flex items-center">
                <div className="w-5 h-10 bg-[#359E52] rounded"></div>
                <p className="text-[#359E52] font-primarySemibold mx-4">
                  Categories
                </p>
              </div>
              <div className="py-5 md:text-xl font-primarySemibold">
                Shop by Category
              </div>
              {/* Category Carousel */}
              <div className="relative w-full flex items-center">
                {/* Left Arrow */}
                <button
                  className="absolute left-0 z-10 bg-white shadow-md rounded-full p-1 md:p-2"
                  onClick={() => scrollCategories("left")}
                >
                  <span className="material-icons">
                    <MdOutlineKeyboardArrowLeft />
                  </span>
                </button>
                {/* Categories */}
                <div
                  id="categoryContainer"
                  className="w-full flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
                >
                  {categories.map((category) => (
                    <Link
                      // href={`categories/${category._id}`}
                      href={{
                        pathname: `/categories/${category._id}`,
                        query: { name: category.name },
                      }}
                    >
                      <div className="min-w-[150px] md:min-w-[250px] h-full p-2 md:p-3 bg-[#CED9CF] flex flex-col items-center justify-center rounded md:rounded-lg">
                        <Image
                          width={211}
                          height={226}
                          src={category?.image}
                          alt={category?.name}
                          className="hidden md:block"
                          // priority
                        />
                        <Image
                          width={90}
                          height={75}
                          src={category?.image}
                          alt={category?.name}
                          className="block md:hidden"
                          // priority
                        />
                        <p className="text-[10px] md:text-sm py-3 text-center font-primaryMedium">
                          {category.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Right Arrow */}
                <button
                  className="absolute right-0 z-10 bg-white shadow-md rounded-full p-2"
                  onClick={() => scrollCategories("right")}
                >
                  <span className="material-icons">
                    <MdOutlineKeyboardArrowRight />
                  </span>
                </button>
              </div>
            </div>

            {/* WhatsApp Sticky Button For User Support */}
            <a
              href="https://wa.me/+2347061131509" // Replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-20 md:bottom-5 right-5 bg-green-500 rounded-full p-3 shadow-lg cursor-pointer z-50"
            >
              <FaWhatsapp size={35} color="white" />
            </a>

            {/* Our Products */}
            <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="flex items-center">
                <div className="w-2 md:w-5 h-10 bg-[#359E52] rounded"></div>
                <p className="text-[#359E52] font-primarySemibold mx-3 md:mx-4">
                  Our Products
                </p>
              </div>
              <div className="w-full flex items-center justify-between py-5">
                <div className="text-sm md:text-xl font-primarySemibold">
                  Explore Our Products
                </div>
                <Link href="/all-products">
                  <button className="hidden md:inline-block w-[250px] h-[44px] text-white font-primaryMedium bg-[#4CBD6B] rounded">
                    View all products
                  </button>
                </Link>
                <div className="block md:hidden">
                  <Link href="/all-products">
                    <button className="p-2 text-white font-primaryMedium bg-[#4CBD6B] rounded">
                      View all
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex">
                <div className="w-full">
                  {loading ? (
                    <CMSkeleton
                      count={20}
                      height={20}
                      error={error}
                      loading={loading}
                    />
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {products.slice(0, visibleProducts).map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sample Products */}
            <div className="block mx-auto max-w-screen-2xl mb-10">
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                {/* <div className="lg:p-16 p-6 bg-[#359E52] shadow-sm border rounded-lg"> */}
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto hidden md:block"
                  priority
                  src={"/sample-frame.png"}
                  alt="logo"
                />
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto block md:hidden"
                  priority
                  src={"/sample-mobile.png"}
                  alt="logo"
                />
                {/* </div> */}
              </div>
            </div>

            {/* promotional banner card */}
            <div className="block mx-auto max-w-screen-2xl">
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                <div className="lg:p-16 p-6 bg-[#359E52] shadow-sm border rounded-lg">
                  <CardTwo />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Home;
