import React from "react";
import Link from "next/link";
import dayjs from "dayjs";

const OrderHistory = ({ order, currency }) => {
  return (
    <>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="uppercase text-sm font-medium">
          {order?._id?.substring(20, 24)}
        </span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          {dayjs(order.created_at).format("MMMM D, YYYY")}
        </span>
      </td>

      {/* <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">{order.paymentMethod}</span>
      </td> */}
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
        {order.deliveryStatus === "DELIVERED" && (
          <span className="text-emerald-500">{order.deliveryStatus}</span>
        )}
        {order.deliveryStatus === "PENDING" && (
          <span className="text-orange-500">{order.deliveryStatus}</span>
        )}
        {order.deliveryStatus === "CANCEL" && (
          <span className="text-red-500">{order.deliveryStatus}</span>
        )}
        {order.deliveryStatus === "PROCESSING" && (
          <span className="text-indigo-500">{order.deliveryStatus}</span>
        )}
      </td>
      {/* <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm font-bold">
          {currency}
          {parseFloat(order?.totalAmount).toFixed(2).toLocaleString()}
        </span>
      </td> */}
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm font-bold">
          {/* {currency} */}#
          {parseFloat(order?.totalAmount)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </td>
      {/* <td className="px-5 py-3 leading-6 text-center text-emerald-500 whitespace-nowrap rounded-xl cursor-pointer">
        <Link href={`/order/${order._id}`}>
          <span className="text-sm">Details</span>
        </Link>
      </td> */}
      <td className="px-5 py-3 whitespace-nowrap text-center text-sm">
        <Link
          className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full"
          href={`/order/${order._id}`}
        >
          Details
        </Link>
      </td>
    </>
  );
};

export default OrderHistory;
