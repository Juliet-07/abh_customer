import React from "react";
import { useRouter } from "next/router";

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;

  // Fetch order details using orderId from API or context

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {/* Your invoice details go here */}
      <h1>Order Details for {orderId}</h1>
      {/* Render the invoice here */}
      <div className="invoice-container">
        {/* Add the invoice display components */}
      </div>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={handleDownload}>
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

const handleDownload = () => {
  // Implement the download invoice logic here
  const link = document.createElement("a");
  link.href = "/path-to-invoice-file"; // Replace with actual invoice file path or API endpoint
  link.download = "invoice.pdf"; // or the correct file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
