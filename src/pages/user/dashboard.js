import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IoLockOpenOutline } from "react-icons/io5";
import {
  FiCheck,
  FiFileText,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiSettings,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi";
import axios from "axios";

//internal import
import Layout from "@layout/Layout";
import Card from "@component/order-card/Card";
import { UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import RecentOrder from "@pages/user/recent-order";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Dashboard = ({ title, description, children }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("abhUserInfo");
  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);
  const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderstats] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
  });

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.clear("abhUserInfo");
    Cookies.remove("couponInfo");
    router.push("/");
  };

  const userSidebar = [
    {
      title: "Dashboard",
      href: "/user/dashboard",
      icon: FiGrid,
    },
    {
      title: "My Orders",
      href: "/user/my-orders",
      icon: FiList,
    },
    {
      title: "Update Profile",
      href: "/user/update-profile",
      icon: FiSettings,
    },
    {
      title: "Change Password",
      href: "/user/change-password",
      icon: FiFileText,
    },
  ];

  useEffect(() => {
    let ordersData;
    const getMyOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiURL}/orders/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        console.log(response.data.data.data, "Orders");
        ordersData = response.data.data.data;
        setOrders(ordersData);
        calculateOrderStats(ordersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    getMyOrders();
  }, [router]);

  const calculateOrderStats = (orders) => {
    const stats = { pending: 0, processing: 0, completed: 0 };
    orders.forEach((order) => {
      if (order.deliveryStatus === "PENDING") stats.pending++;
      else if (order.deliveryStatus === "PROCESSING") stats.processing++;
      else if (order.deliveryStatus === "COMPLETED") stats.completed++;
    });
    console.log(stats, "statistics");
    setOrderstats(stats);
  };
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={title ? title : "Dashboard"}
          description={description ? description : "This is User Dashboard"}
        >
          <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
              <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
                <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
                  {userSidebar?.map((item) => (
                    <span
                      // key={item.title}
                      className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                    >
                      <item.icon
                        className="flex-shrink-0 h-4 w-4"
                        aria-hidden="true"
                      />
                      <Link
                        href={item.href}
                        className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600"
                      >
                        {item.title}
                      </Link>
                    </span>
                  ))}
                  <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                    <span className="mr-2">
                      <IoLockOpenOutline />
                    </span>{" "}
                    <button
                      onClick={handleLogOut}
                      className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
                    >
                      Logout
                    </button>
                  </span>
                </div>
              </div>
              <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
                {!children && (
                  <div className="overflow-hidden">
                    <h2 className="text-xl font-serif font-semibold mb-5">
                      Dashboard
                    </h2>
                    <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                      <Card
                        title="Total Orders"
                        Icon={FiShoppingCart}
                        quantity={orders?.length}
                        className="text-red-600  bg-red-200"
                      />
                      <Card
                        title="Pending Orders"
                        Icon={FiRefreshCw}
                        quantity={orderStats.pending}
                        className="text-orange-600 bg-orange-200"
                      />
                      <Card
                        title="In Progress"
                        Icon={FiTruck}
                        quantity={orderStats.processing}
                        className="text-indigo-600 bg-indigo-200"
                      />
                      <Card
                        title="Complete Orders"
                        Icon={FiCheck}
                        quantity={orderStats.completed}
                        className="text-emerald-600 bg-emerald-200"
                      />
                    </div>
                    <RecentOrder
                      data={orders}
                      loading={loading}
                      error={error}
                    />
                  </div>
                )}
                {children}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
