import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import axios from "axios";

//internal import
import { pages } from "@utils/data";
import useAsync from "@hooks/useAsync";
import Loading from "@component/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import CategoryServices from "@services/CategoryServices";
import CategoryCard from "@component/category/CategoryCard";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Category = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();
  const { data, loading, error } = useAsync(() =>
    CategoryServices.getShowingCategory()
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

    getCategories();
  }, []);
  return (
    <div className="flex flex-col w-full h-full bg-white cursor-pointer font-primaryRegular scrollbar-hide">
      {categoryDrawerOpen && (
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-[#359E52] text-white border-b border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center">
            <Link href="/" className="mr-10">
              <Image width={100} height={38} src="/abh_logo.png" alt="logo" />
            </Link>
          </h2>
          <button
            onClick={closeCategoryDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      )}
      <div className="w-full max-h-full">
        {categoryDrawerOpen && (
          <h2 className="font-semibold  m-0 text-heading flex align-center border-b px-8 py-3">
            All Categories
          </h2>
        )}
        {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : data.length === 0 ? (
          <Loading loading={loading} />
        ) : (
          <div className="relative grid gap-2 p-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={category._id}
                id={category.id}
                // icon={category?.image}
                // nested={category?.subcategories}
                title={category?.name}
              />
            ))}
          </div>
        )}

        {categoryDrawerOpen && (
          <div className="relative grid gap-2 mt-5">
            <h3 className="font-semibold font-serif text-base m-0 text-heading flex align-center border-b px-8">
              Pages
            </h3>
            <div className="relative grid gap-1 p-4">
              {pages.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                >
                  <item.icon
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
