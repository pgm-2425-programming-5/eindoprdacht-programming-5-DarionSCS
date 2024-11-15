"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PayPalButtons } from "@paypal/react-paypal-js";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Checkout() {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("jwt");
      const userData = JSON.parse(sessionStorage.getItem("user"));

      if (!token) {
        router.push("/sign-in");
        return;
      }

      setJwt(token);
      setUser(userData);
    }
  }, [router]);

  // Fetch cart items and calculate totals
  useEffect(() => {
    const fetchCartItems = async () => {
      if (jwt && user) {
        const items = await GlobalApi.getCartItems(user.id, jwt);
        setCartItemList(items);
        setTotalCartItem(items.length);

        const calculatedSubtotal = items.reduce(
          (total, item) => total + item.quantity * item.pricePerUnit,
          0
        );
        setSubtotal(calculatedSubtotal.toFixed(2));

        const calculatedTotal = (calculatedSubtotal * 1.21 + 5).toFixed(2);
        setTotalAmount(calculatedTotal);
      }
    };

    fetchCartItems();
  }, [jwt, user]);

  const onApprove = (data) => {
    const payload = {
      data: {
        paymentId: data?.paymentId?.toString(),
        totalOrderAmount: totalAmount,
        fullName: fullName,
        phone: phone,
        address: address,
        orderItemList: cartItemList.map((item) => ({
          quantity: item.quantity,
          price: totalAmount, // Map pricePerUnit to price
          product: item.productDocumentId,
        })),
        userId: user.id,
      },
    };
    console.log(payload);

    GlobalApi.createOrder(payload, jwt).then(() => {
      toast.success("Order placed successfully!");
      cartItemList.forEach((item) => {
        GlobalApi.deleteCartItem(item.documentId, jwt);
        console.log("Deleted item:", item.documentId);
        router.push("/");
      });
    });
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        {/* Billing Details */}
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <input
              className="border rounded-md p-3 w-full"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              className="border rounded-md p-3 w-full"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              className="border rounded-md p-3 w-full"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <h2 className="font-bold text-2xl mt-6">Your Cart</h2>
          <div className="space-y-4 mt-4">
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
        </div>

        {/* Cart Summary */}
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subtotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$5.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (21%): <span>${(subtotal * 0.21).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${totalAmount}</span>
            </h2>
            <hr />
            <span className="text-sm text-gray-500">
              *Minimum order amount is $8
            </span>
            <Button onClick={() => onApprove({ paymentId: 123 })}>Test</Button>
            {totalAmount > 8 && (
              <PayPalButtons
                disabled={!(fullName && phone && address)}
                style={{ layout: "horizontal" }}
                onApprove={onApprove}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
