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
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const Home = ({ popularProducts, discountProducts, attributes }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
          console.log(response.data.data.products);
          setProducts(response.data.data.products);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
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

            {/* <div className="bg-white">
              <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
                <div className="flex w-full">
                  <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                    <MainCarousel />
                  </div>
                  <div className="w-full hidden lg:flex">
                    <OfferCard />
                  </div>
                </div>
                <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6">
                  <Banner />
                </div>
              </div>
            </div> */}

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
                        pathname: `categories/${category._id}`,
                        query: { name: category.name }, // Add the category name as a query parameter
                      }}
                    >
                      {/* <div className="w-[100px] md:w-[270px] h-[130px] md:h-[270px] bg-[#CED9CF] flex flex-col items-center justify-center rounded md:rounded-lg"> */}
                      <div className="w-full h-full p-2 md:p-3 bg-[#CED9CF] flex flex-col items-center justify-center rounded md:rounded-lg">
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

              {/* <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    Popular Products for Daily Shopping
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    See all our popular products in this week. You can choose
                    your daily needs products from this list and get some
                    special offer with free shipping.
                  </p>
                </div>
              </div> */}
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
                      {products.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                      {/* {popularProducts
                        ?.slice(
                          0,
                          storeCustomizationSetting?.home?.popular_product_limit
                        )
                        .map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            attributes={attributes}
                          />
                        ))} */}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* feature category's */}
            {/* <div className="bg-gray-100 lg:py-16 py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      Featured Categories
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      Choose your necessary products from this feature
                      categories.
                    </p>
                  </div>
                </div>

                <FeatureCategory />
              </div>
            </div> */}

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

            {/* discounted products */}
            {/* {storeCustomizationSetting?.home?.discount_product_status &&
              discountProducts?.length > 0 && (
                <div
                  id="discount"
                  className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
                >
                  <div className="mb-10 flex justify-center">
                    <div className="text-center w-full lg:w-2/5">
                      <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                        <CMSkeleton
                          count={1}
                          height={30}
                          // error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_title
                          }
                        />
                      </h2>
                      <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={5}
                          height={20}
                          // error={error}
                          loading={loading}
                          data={
                            storeCustomizationSetting?.home
                              ?.latest_discount_description
                          }
                        />
                      </p>
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
                          {discountProducts
                            ?.slice(
                              0,
                              storeCustomizationSetting?.home
                                ?.latest_discount_product_limit
                            )
                            .map((product) => (
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
              )} */}
          </div>
        </Layout>
      )}
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const { cookies } = context.req;
//   const { query, _id } = context.query;

//   const [data, attributes] = await Promise.all([
//     ProductServices.getShowingStoreProducts({
//       category: _id ? _id : "",
//       title: query ? query : "",
//     }),

//     AttributeServices.getShowingAttributes(),
//   ]);

//   return {
//     props: {
//       popularProducts: data.popularProducts,
//       discountProducts: data.discountedProducts,
//       cookies: cookies,
//       attributes,
//     },
//   };
// };

export default Home;
