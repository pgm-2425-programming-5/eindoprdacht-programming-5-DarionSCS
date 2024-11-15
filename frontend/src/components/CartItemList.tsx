import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function CartItemList({ cartItemList, onDeleteItem, onUpdateItem }) {
  const totalPrice = cartItemList.reduce(
    (total, cart) => total + cart.quantity * cart.pricePerUnit,
    0
  );

  return (
    <div>
      <div className="h-[500px] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 mb-5"
          >
            <div className="flex gap-6 items-center">
              {cart.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart.image}`}
                  width={90}
                  height={90}
                  alt={cart.name}
                  className="border p-2"
                />
              ) : (
                <div className="w-[90px] h-[90px] bg-gray-200 border p-2 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2 className="">Quantity: {cart.quantity}</h2>
                <h2 className="text-lg font-bold">
                  $ {(cart.quantity * cart.pricePerUnit).toFixed(2)}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={() => onUpdateItem(cart.documentId, cart.quantity - 1)}
                disabled={cart.quantity <= 1}
              >
                -
              </Button>
              <Button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={() => onUpdateItem(cart.documentId, cart.quantity + 1)}
              >
                +
              </Button>
              <TrashIcon
                className="cursor-pointer"
                onClick={() => onDeleteItem(cart.documentId)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total Price Section */}
      <div className="mt-4 text-right font-bold text-lg">
        Total Price:{" "}
        <span className="text-green-600">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CartItemList;
