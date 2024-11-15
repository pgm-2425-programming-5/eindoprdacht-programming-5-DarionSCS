import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

function ProductItem({ product }) {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out h-full">
      {/* Product Image */}
      {product?.images[0]?.formats?.small?.url ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product?.images[0].formats?.small?.url}`}
          alt={product.name || "Product Image"}
          width={150}
          height={150}
          className="h-[150px] rounded-lg object-cover"
        />
      ) : (
        <div className="h-[150px] w-[150px] flex items-center justify-center bg-gray-200 rounded-lg">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}

      {/* Product Information */}
      <h3 className="mt-4 text-lg font-medium text-gray-800">{product.name}</h3>

      {/* Spacer for consistent alignment */}
      <div className="flex-grow"></div>

      {/* Pricing */}
      <div className="mt-4 flex flex-col items-center">
        {product.mrp !== product.sellingPrice && (
          <span className="text-gray-500 line-through">${product.mrp}</span>
        )}
        <span className="text-green-600 font-semibold">
          ${product.sellingPrice}
        </span>
      </div>

      {/* Categories */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {product.categories.map((category) => (
          <span
            key={category.id}
            className="text-xs font-medium bg-green-100 text-green-600 px-2 py-1 rounded"
          >
            {category.name}
          </span>
        ))}
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className="mt-4 bg-green-500">Add to Cart</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
