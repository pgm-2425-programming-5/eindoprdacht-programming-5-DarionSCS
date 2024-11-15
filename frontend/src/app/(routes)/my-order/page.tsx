"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_components/MyOrderItem";

function MyOrder() {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (!jwt) {
      router.replace("/sign-in");
    } else {
      fetchMyOrders();
    }
  }, [jwt, user]);

  const fetchMyOrders = async () => {
    try {
      const orders = await GlobalApi.getMyOrder(user.id, jwt);
      setOrderList(orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  return (
    <div>
      <h2 className="p-3 bg-green-700 text-xl font-bold text-center text-white">
        My Orders
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-gray-800">Order History</h2>
        <div className="mt-10 space-y-6">
          {orderList.length > 0 ? (
            orderList.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger>
                  <div className="border p-4 bg-gray-100 flex flex-col md:flex-row md:gap-24 gap-4 rounded-md">
                    <h2>
                      <span className="font-bold mr-2">Order Date:</span>
                      {moment(item?.createdAt).format("DD/MMM/YYYY")}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Total Amount:</span>${" "}
                      {item?.totalOrderAmount}
                    </h2>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-4 bg-gray-50 rounded-md">
                    {item.orderItemList.map((order, index_) => (
                      <MyOrderItem orderItem={order} key={index_} />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You haven’t placed any orders yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
