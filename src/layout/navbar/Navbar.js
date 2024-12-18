import { useContext, useEffect, useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";

//internal import
import NavbarPromo from "@layout/navbar/NavbarPromo";
import { UserContext } from "@context/UserContext";
import LoginModal from "@component/modal/LoginModal";
import CartDrawer from "@component/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";
import useGetSetting from "@hooks/useGetSetting";
import { handleLogEvent } from "@utils/analytics";

const Navbar = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({});
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();

  const {
    state: { userInfo },
  } = useContext(UserContext);

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      const user = JSON.parse(Cookies.get("userInfo"));
      setImageUrl(user.image);
    }
    const getProducts = async () => {
      try {
        const allProducts = [];
        let page = 1;
        const limit = 10; // Assuming 10 is the default limit
        let totalPages = 1; // Initialize with a default value

        do {
          const response = await axios.get(`${apiURL}/products/list/retail`, {
            params: { page, limit },
          });
          const { products, totalPages: responseTotalPages } =
            response.data.data;

          allProducts.push(...products); // Add current page products to the list
          totalPages = responseTotalPages; // Update the total number of pages from the response
          page++; // Move to the next page
        } while (page <= totalPages); // Continue until all pages are fetched

        console.log(allProducts); // Combined list of all products
        setProducts(allProducts); // Set the combined products list
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    getProducts();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim()) {
      // Assuming each product has a 'name' property
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filtered, "checking search list");
      setSearchList(filtered);
    } else {
      setSearchList([]);
    }
  };

  // const handleSuggestionClick = (suggestion) => {
  //   setSearchText(suggestion);
  //   setSearchList([]);
  // };

  const handleSuggestionClick = (suggestion) => {
    // Redirect to product page using the product id or slug
    router.push(`/categories/${suggestion?.categoryId?._id}`); // Adjust URL based on your routing structure

    setSearchText(suggestion.name); // Optional: Update the input with the selected suggestion
    setSearchList([]); // Close the suggestion list
  };

  useEffect(() => {
    const getUserData = () => {
      if (!token) {
        console.log("No token found. User is not logged in.");
        setIsLoggedIn(false);
        return; // Exit the function if there's no token.
      }

      axios
        .get(`${apiURL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data, "User Info");
          setUserData(response.data.data); // Set user data in the state
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    };

    getUserData();
  }, []);

  return (
    <>
      <CartDrawer />
      {modalOpen && (
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <div className="bg-[#359E52] sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="top-bar h-full md:h-16 lg:h-auto flex flex-col md:flex-row md:items-center justify-between py-4 mx-auto">
            {/* Logo */}
            <Link
              href="/"
              className="mr-3 lg:mr-12 xl:mr-12  md:hidden lg:block"
            >
              <div className="relative w-[200px] h-10">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                  priority
                  src={"/abh_logo.png"}
                  alt="logo"
                />
              </div>
            </Link>
            {/* search button */}
            <div className="hidden md:block w-full transition-all duration-200 ease-in-out lg:flex lg:max-w-[520px] xl:max-w-[750px] 2xl:max-w-[900px] md:mx-12 lg:mx-4 xl:mx-0">
              <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
                <div className="flex flex-col mx-auto w-full">
                  <form
                    // onSubmit={handleSubmit}
                    className="relative pr-12 md:pr-14 bg-white overflow-hidden shadow-sm rounded-md w-full"
                  >
                    <label className="flex items-center py-0.5">
                      <input
                        // onChange={(e) => setSearchText(e.target.value)}
                        onChange={handleInputChange}
                        value={searchText}
                        className="form-input w-full pl-5 appearance-none transition ease-in-out border text-input text-sm font-sans rounded-md min-h-10 h-10 duration-200 bg-white focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
                        placeholder="Search"
                      />
                    </label>
                    <button
                      aria-label="Search"
                      type="submit"
                      className="outline-none text-xl text-gray-400 absolute top-0 right-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                    >
                      <IoSearchOutline />
                    </button>
                  </form>
                  {searchList.length > 0 && (
                    <ul className="absolute top-10 z-30 bg-white w-full max-h-64 overflow-y-auto shadow-lg rounded-md mt-1 border border-gray-200">
                      {searchList.map((list, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(list)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {list.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:hidden md:items-center lg:flex xl:flex absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                className="pr-5 text-white text-2xl font-bold"
                aria-label="Alert"
              >
                <FiBell className="w-6 h-6 drop-shadow-xl" />
              </button> */}
              <button
                aria-label="Total"
                onClick={toggleCartDrawer}
                className="relative px-5 text-white text-2xl font-bold"
              >
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>
              {/* Profile */}
              <button
                className="text-white font-primaryMedium"
                aria-label="Login"
              >
                {isLoggedIn ? (
                  <div className="flex items-center justify-between">
                    <FaUserCircle
                      size={24}
                      style={{ cursor: "pointer" }}
                      // onClick={() => setShowDropdown(!showDropdown)}
                    />
                    <span className="p-2">{userData?.firstName || "User"}</span>{" "}
                  </div>
                ) : (
                  // <Popover className="relative font-serif">
                  //   <Popover.Button className="group inline-flex items-center py-2 text-sm font-medium hover:text-emerald-600 focus:outline-none">
                  //     <span className="text-sm">Hello {" "} {userData?.firstName}</span>
                  //     <ChevronDownIcon
                  //       className="ml-1 h-3 w-3"
                  //       aria-hidden="true"
                  //     />
                  //   </Popover.Button>
                  //   <Transition
                  //     as={Fragment}
                  //     enter="transition ease-out duration-200"
                  //     enterFrom="opacity-0 translate-y-1"
                  //     enterTo="opacity-100 translate-y-0"
                  //     leave="transition ease-in duration-150"
                  //     leaveFrom="opacity-100 translate-y-0"
                  //     leaveTo="opacity-0 translate-y-1"
                  //   >
                  //     <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs bg-white">
                  //       <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                  //         <div className="relative grid gap-2 px-6 py-6">
                  //           <span className="p-2  font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                  //             <div className="w-full flex">
                  //               {/* <FiShoppingBag className="my-auto" /> */}
                  //               <Link
                  //                 href="/contact-us"
                  //                 onClick={() => setIsLoading(!isLoading)}
                  //                 className="relative inline-flex items-center font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                  //               >
                  //                 Contact Us
                  //               </Link>
                  //             </div>
                  //           </span>

                  //           <span className="p-2 font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                  //             <div className="w-full flex">
                  //               {/* <FiHelpCircle className="my-auto" /> */}
                  //               <Link
                  //                 href="/faq"
                  //                 onClick={() => setIsLoading(!isLoading)}
                  //                 className="relative inline-flex items-center font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                  //               >
                  //                 FAQ
                  //               </Link>
                  //             </div>
                  //           </span>
                  //         </div>
                  //       </div>
                  //     </Popover.Panel>
                  //   </Transition>
                  // </Popover>
                  <div
                    className="flex items-center"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <span>
                      <FiUser className="w-6 h-6 drop-shadow-xl" />
                    </span>
                    <p className="mx-2 text-sm">Sign in</p>
                  </div>
                )}
              </button>
            </div>
            {/* <Link href="/vendor/signup">
              <button className="bg-white w-20 h-10 text-[#359E52] font-semibold rounded-md mx-3 text-xs">
                Sell on ABH
              </button>
            </Link> */}
          </div>
        </div>
        {/* second header */}
        <NavbarPromo />
      </div>
    </>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
