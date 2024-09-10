import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { IoAdd, IoBagAddSharp, IoRemove } from "react-icons/io5";
import { useCart } from "react-use-cart";
import axios from "axios";

//internal import

import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import useGetSetting from "@hooks/useGetSetting";
import Discount from "@component/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@component/modal/ProductModal";
import ImageWithFallback from "@component/common/ImageWithFallBack";
import { handleLogEvent } from "@utils/analytics";

const ProductCard = ({ product, attributes }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [modalOpen, setModalOpen] = useState(false);

  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity, handleAddItem } = useAddToCart();
  const { globalSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const currency = globalSetting?.default_currency || "₦";

  // console.log('attributes in product cart',attributes)

  // const handleAddItem = (p) => {
  //   if (p.quantity < 1) return notifyError("Insufficient stock!");

  //   if (p?.variants?.length > 0) {
  //     setModalOpen(!modalOpen);
  //     return;
  //   }
  //   const { slug, variants, categories, description, ...updatedProduct } =
  //     product;
  //   console.log("product info", product);
  //   const newItem = {
  //     ...updatedProduct,
  //     title: showingTranslateValue(p?.name),
  //     id: p.id,
  //     variant: p.prices,
  //     price: p.price,
  //     originalPrice: product.prices?.originalPrice,
  //   };
  //   addItem(newItem);
  // };

  // const handleAddToCart = async () => {
  //   if (product.quantity < 1) return notifyError("Insufficient stock!");

  //   const { categories, description, ...updatedProduct } = product;

  //   console.log("product info in modal", product);

  //   const newItem = {
  //     ...updatedProduct,
  //     title: product?.name,
  //     id: product.id,
  //     price: product.price,
  //   };

  //   try {
  //     const response = await axios.put(`${apiURL}/cart/add`, {
  //       productId: product.id,
  //       quantity: item,
  //     });

  //     if (response.status === 200) {
  //       handleAddItem(newItem);
  //       notifySuccess("Item added to cart successfully!");
  //     } else {
  //       notifyError("Failed to add item to cart!");
  //     }
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //     notifyError("Error adding item to cart!");
  //   }
  // };

  const handleModalOpen = (event, id) => {
    setModalOpen(event);
  };

  return (
    <>
      {modalOpen && (
        <ProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          currency={currency}
          attributes={attributes}
        />
      )}

      <div className="h-full group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative">
        <div className="w-full flex justify-between">
          <Stock
            product={product}
            stock={product.quantity - product.soldQuantity}
            card
          />
          {/* <Discount product={product} /> */}
        </div>
        <div
          onClick={() => {
            handleModalOpen(!modalOpen, product._id);
            handleLogEvent("product", `opened ${product?.name} product modal`);
          }}
          className="relative flex justify-center cursor-pointer pt-2 w-full h-44"
        >
          <div className="relative w-full h-full p-3 flex items-center justify-center">
            {product.images[0] ? (
              <img
                src={product.featured_image}
                alt="product"
                className="flex items-center justify-center h-full"
              />
            ) : (
              <Image
                src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                fill
                style={{
                  objectFit: "contain",
                }}
                sizes="100%"
                alt="product"
                className="object-contain transition duration-150 ease-linear transform group-hover:scale-105"
              />
            )}
          </div>
        </div>
        <div className="w-full px-3 lg:px-4 pb-2 overflow-hidden">
          <div className="relative mb-1">
            <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {product.quantity + " " + product.unit}
            </span>
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2">{product.name}</span>
            </h2>
          </div>

          <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
            <Price
              card
              product={product}
              currency={currency}
              // price={product?.sellingPrice}
              // price={
              //   product?.isCombination
              //     ? product?.variants[0]?.price
              //     : product?.prices?.price
              // }
              // originalPrice={
              //   product?.isCombination
              //     ? product?.variants[0]?.originalPrice
              //     : product?.prices?.originalPrice
              // }
            />

            <div
              // onClick={() => handleAddItem(product)}
              onClick={() => handleModalOpen(!modalOpen, product._id)}
              aria-label="cart"
              className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
            >
              {" "}
              <span className="text-xl">
                <IoBagAddSharp />
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
