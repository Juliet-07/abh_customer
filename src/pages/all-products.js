import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import axios from "axios";
import Select from "react-select";

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
import FilterSidebar from "./filterSidebar";

const sortingOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest Arrival" },
  { value: "priceHighLow", label: "Price: High - Low" },
  { value: "priceLowHigh", label: "Price: Low - High" },
];

const AllProducts = ({ popularProducts, discountProducts, attributes }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState(sortingOptions[0]);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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
          console.log(response.data);
          setProducts(response.data.data.products);
          // console.log(response.data.data.products[0].categoryId.name);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getProducts();
  }, [router]);

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };

  const sortProducts = (products) => {
    switch (sortOption.value) {
      case "relevance":
        return products; // Implement relevance sorting logic
      case "newest":
        return [...products].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "priceHighLow":
        return [...products].sort((a, b) => b.price - a.price);
      case "priceLowHigh":
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  // const filteredProducts = selectedCategories.length
  //   ? products.filter((product) =>
  //       selectedCategories.some((selectedCategory) => {
  //         // Check if the categoryId.name matches any of the selected categories
  //         return product.categoryId?.name === selectedCategory;
  //       })
  //     )
  //   : products;

  const filteredProducts = products.filter((product) => {
    // Match products by name with case-insensitive search
    return product.name
      ?.toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
  });

  // Prioritize search results
  const prioritizedProducts = filteredProducts.sort((a, b) => {
    const aMatch = a.name
      ?.toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const bMatch = b.name
      ?.toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    // Matching products move to the top
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0; // No change in order
  });

  // Apply sorting options after prioritization
  const sortedAndFilteredProducts = sortProducts(prioritizedProducts);

  // Add this line to log the filtered products to the console
  console.log("Filtered Products:", filteredProducts);

  // const sortedAndFilteredProducts = sortProducts(filteredProducts);

  const toggleMobileFilter = () => {
    setIsMobileFilterVisible(!isMobileFilterVisible);
  };

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            <StickyCart />

            <div className="bg-gray-50 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="hidden md:block">
                  <p className="text-xl font-primarySemibold mb-4">Filter</p>
                  <FilterSidebar
                    setSelectedCategories={setSelectedCategories}
                  />
                </div>
                {/* Mobile FiltercloseCategoryDrawer */}
                <div className="md:hidden">
                  <div
                    className="flex items-center gap-10"
                    onClick={toggleMobileFilter}
                  >
                    <p className="font-primarySemibold">Filter</p>
                    <span>{isMobileFilterVisible ? "▲" : "▼"}</span>
                  </div>
                  {isMobileFilterVisible && (
                    <FilterSidebar
                      setSelectedCategories={setSelectedCategories}
                    />
                  )}
                </div>
                <main>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="md:text-xl font-primarySemibold">
                      All Products
                      <span className="mx-2 font-primaryRegular text-xs">
                        ( {sortedAndFilteredProducts.length} products found)
                      </span>
                    </div>
                    <div className="w-full md:w-1/2">
                      <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-primarySemibold">Sort by:</p>

                      <Select
                        options={sortingOptions}
                        value={sortOption}
                        onChange={handleSortChange}
                        className="z-20"
                      />
                    </div>
                  </div>

                  <div className="w-full ">
                    {loading ? (
                      <CMSkeleton
                        count={20}
                        height={20}
                        error={error}
                        loading={loading}
                      />
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {sortedAndFilteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            attributes={attributes}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default AllProducts;
