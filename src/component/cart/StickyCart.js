import React, { useContext, useState,useMemo } from "react";
import dynamic from "next/dynamic";
import { useCart } from "react-use-cart";
import { IoBagHandleOutline } from "react-icons/io5";

//internal import
import { SidebarContext } from "@context/SidebarContext";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";

const StickyCart = () => {
  const { totalItems, items } = useCart();
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  const currency = globalSetting?.default_currency || "#";

    // Calculate the cart total using sellingPrice instead of price
    const cartTotal = useMemo(() => {
      return items.reduce((total, item) => {
        return total + item.sellingPrice * item.quantity;
      }, 0);
    }, [items]);

  return (
    <button aria-label="Cart" onClick={toggleCartDrawer} className="absolute">
      <div className="right-0 w-35 float-right fixed top-2/4 bottom-2/4 align-middle shadow-lg cursor-pointer z-30 hidden lg:block xl:block">
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-tl-lg p-2 text-gray-700">
          <span className="text-2xl mb-1 text-[#8DCB90]">
            <IoBagHandleOutline />
          </span>
          <span className="px-2 text-sm font-serif font-medium">
            {totalItems} Items
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#359E52] p-2 text-white text-base font-serif font-medium rounded-bl-lg mx-auto">
          {currency}
          {cartTotal.toFixed(2)}
        </div>
      </div>
    </button>
  );
};

export default dynamic(() => Promise.resolve(StickyCart), { ssr: false });
