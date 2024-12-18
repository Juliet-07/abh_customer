import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import Layout from "@layout/Layout";
import ProductCard from "@component/product/ProductCard";
import Loading from "@component/preloader/Loading";
import Select from "react-select";

const sortingOptions = [
  { value: "newest", label: "Newest Arrival" },
  { value: "priceHighLow", label: "Price: High - Low" },
  { value: "priceLowHigh", label: "Price: Low - High" },
];

const CategoryPage = ({ params }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { id: categoryId, name } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(sortingOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!categoryId) return;

    // Fetch products by category ID
    const fetchProductsByCategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiURL}/products/category/${categoryId}`
        );
        console.log(response.data.data.products, "product by category");
        setProducts(response.data.data.products);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const getFilteredAndSortedProducts = (products) => {
    // Search Filter
    const filteredProducts = searchQuery
      ? products.filter((product) =>
          product.name?.toLowerCase().includes(searchQuery)
        )
      : products;

    // Sorting
    switch (sortOption.value) {
      case "relevance":
        return filteredProducts; // Implement relevance sorting logic
      case "newest":
        return [...filteredProducts].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "priceHighLow":
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case "priceLowHigh":
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      default:
        return filteredProducts;
    }
  };

  const displayedProducts = getFilteredAndSortedProducts(products);

  return (
    <>
      <Layout>
        {loading ? (
          <Loading loading={loading} />
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="bg-gray-50 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="flex flex-col md:flex-row gap-4 md:gap-10">
              <main>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h2 className="text-xl font-primaryMedium">
                    Products in {name} Category{" "}
                  </h2>
                  <div className="w-full md:w-1/2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div className="w-full ">
                      {displayedProducts.length === 0 ? (
                        <p className="text-center text-gray-500">
                          No products found.
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                          {displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};

export default dynamic(() => Promise.resolve(CategoryPage), { ssr: false });
