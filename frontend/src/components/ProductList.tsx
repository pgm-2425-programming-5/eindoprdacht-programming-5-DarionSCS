import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productList }) {
  const limitedProductList = Array.isArray(productList.data)
    ? productList.data.slice(0, 8)
    : [];

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Our Popular Demand:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {limitedProductList.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
