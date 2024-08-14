import { useState } from "react";
import { useCart } from "react-use-cart";
import { notifyError, notifySuccess } from "@utils/toast";

const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const { addItem, items, updateItemQuantity } = useCart();
  // console.log('products',products)
  // console.log("items", items);

  const handleAddItem = (product) => {
    const result = items.find((i) => i.id === product.id);
    console.log(result, "checking the results");
    console.log(product, "checking products");
    // console.log(
    //   "result in add to",
    //   result,
    //   items,
    //   product.id
    //   // product?.quantity < result?.stock,
    //   // result?.quantity,
    //   // "item",
    //   // item
    // );
    const { variants, categories, description, ...updatedProduct } = product;

    // Calculate available stock
    const availableStock = product?.quantity - product?.soldQuantity;
    // console.log(availableStock, "checking stock");

    if (result) {
      if (result?.quantity + item <= availableStock) {
        updateItemQuantity(result.id, result.quantity + item);
        notifySuccess(`${item} ${product.name} added to cart!`);
      } else {
        notifyError("Insufficient stock!");
      }
    } else {
      if (item <= availableStock) {
        addItem({ ...product, quantity: availableStock }, item);
        notifySuccess(`${item} ${product.name} added to cart!`);
      } else {
        notifyError("Insufficient stock!");
      }
    }

    // const { variants, categories, description, ...updatedProduct } = product;

    // if (result !== undefined) {
    //   if (
    //     result?.quantity + item <=
    //     (product?.variants?.length > 0
    //       ? product?.quantity
    //       : product?.quantity - product?.soldQuantity)
    //   ) {
    //     addItem(updatedProduct, item);
    //     notifySuccess(`${item} ${product.name} added to cart!`);
    //   } else {
    //     notifyError("Insufficient stock!");
    //   }
    // } else {
    //   if (
    //     item <=
    //     (product?.variants?.length > 0
    //       ? product?.quantity
    //       : product?.quantity - product?.soldQuantity)
    //   ) {
    //     addItem(updatedProduct, item);
    //     notifySuccess(`${item} ${product.name} added to cart!`);
    //   } else {
    //     notifyError("Insufficient stock!");
    //   }
    // }
  };

  const handleIncreaseQuantity = (product) => {
    const result = items.find((p) => p.id === product.id);
    const availableStock = product?.quantity - product?.soldQuantity;
    console.log(availableStock,"checking stock")

    if (result) {
      if (result?.quantity + 1 <= availableStock) {
        updateItemQuantity(result.id, result.quantity + 1);
        notifySuccess(
          `Increased quantity of ${product.name} to ${result.quantity + 1}`
        );
      } else {
        notifyError("Insufficient stock!");
      }
    }
  };

  return {
    setItem,
    item,
    handleAddItem,
    handleIncreaseQuantity,
  };
};

export default useAddToCart;
