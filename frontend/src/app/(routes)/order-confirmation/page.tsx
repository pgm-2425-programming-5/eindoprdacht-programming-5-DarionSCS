"use client";
import React from "react";
import { useRouter } from "next/navigation";

function OrderConfirmation() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        {/* Checkmark Icon */}
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 5.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order is being processed.
        </p>
        <p className="text-gray-600">
          We’ll send you an email with the details shortly.
        </p>
        <button
          onClick={goToHome}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
