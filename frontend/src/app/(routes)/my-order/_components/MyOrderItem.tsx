import Image from "next/image";
import React from "react";

function MyOrderItem({ orderItem }) {
  return (
    <div className="grid grid-cols-5 gap-4 items-center bg-white shadow-md rounded-md p-4">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${orderItem.product.image}`}
        width={80}
        height={80}
        alt={orderItem.product.name}
        className="bg-gray-100 p-2 rounded-md border"
      />
      <div className="col-span-2">
        <h2 className="font-semibold text-gray-800">
          {orderItem.product.name}
        </h2>
        <p className="text-sm text-gray-500">
          Price: ${orderItem.product.pricePerUnit}
        </p>
      </div>
      <h2 className="text-gray-700">Quantity: {orderItem.quantity}</h2>
      <h2 className="text-gray-900 font-semibold">
        Total: $
        {(orderItem.quantity * orderItem.product.pricePerUnit).toFixed(2)}
      </h2>
    </div>
  );
}

export default MyOrderItem;
