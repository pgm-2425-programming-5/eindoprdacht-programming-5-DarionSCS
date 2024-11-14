import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productList }) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Our popular demand:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(productList.data) &&
          productList.data.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default ProductList;
