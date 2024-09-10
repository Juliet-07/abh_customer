import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import Layout from "@layout/Layout";
import ProductCard from "@component/product/ProductCard";
import Loading from "@component/preloader/Loading";

const CategoryPage = ({ params }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const categoryId = params.id;
  const { name } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!categoryId) return;

    // Fetch products by category ID
    const fetchProductsByCategory = async () => {
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
  }, [router]);

  return (
    <Layout>
      {loading ? (
        <Loading loading={loading} />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="max-w-screen-2xl mx-auto py-5 px-3 sm:px-10">
          <h2 className="text-xl font-primaryMedium mb-4">
            Products in {name} Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};

export default dynamic(() => Promise.resolve(CategoryPage), { ssr: false });
