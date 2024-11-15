"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_utils/GlobalApi";

function CheckOut() {
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Fetch cart items from the API
    const fetchCartItems = async () => {
      const jwt = sessionStorage.getItem("jwt");
      const user = JSON.parse(sessionStorage.getItem("user"));

      if (jwt && user) {
        const items = await GlobalApi.getCartItems(user.id, jwt);
        setCartItemList(items);

        // Calculate subtotal
        const calculatedSubtotal = items.reduce(
          (total, item) => total + item.quantity * item.pricePerUnit,
          0
        );
        setSubtotal(calculatedSubtotal.toFixed(2));
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center">
      {/* Header */}
      <header className="bg-green-700 text-white w-full py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">🍎 Grocery Checkout</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col lg:flex-row gap-10 mt-10 px-4">
        {/* Cart Summary Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Your Cart
          </h2>
          <div className="space-y-4">
            {cartItemList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-green-100 p-3 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.image}`}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-green-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-green-700 font-semibold">
                  ${(item.quantity * item.pricePerUnit).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-bold text-green-800">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-800">
              <p>Delivery</p>
              <p>$1.50</p>
            </div>
            <div className="flex justify-between text-2xl font-bold text-green-900 mt-4">
              <p>Total</p>
              <p>${(parseFloat(subtotal) + 2.5).toFixed(2)}</p>
            </div>
          </div>
        </section>

        {/* Checkout Form Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Delivery Details
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-green-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                className="w-full border border-green-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your address"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full border border-green-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your phone number"
              />
            </div>
            <Button className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition duration-300">
              Place Order
            </Button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-700 text-white w-full py-4 mt-auto">
        <p className="text-center">
          &copy; 2024 Grocery Store. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default CheckOut;
