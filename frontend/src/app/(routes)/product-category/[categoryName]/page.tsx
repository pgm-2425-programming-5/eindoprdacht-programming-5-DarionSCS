import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/components/ProductList";

async function page({ params }) {
  const productList = await GlobalApi.getProductsByCategory(
    params.categoryName
  );
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className="text-3xl font-semibold text-white bg-green-600 mb-6 text-center p-10">
        {params.categoryName}
        <TopCategoryList
          categoryList={categoryList}
          selectedCategory={params.categoryName}
        />
        <div className="px-5 md:p-10">
          <ProductList productList={productList} />
        </div>
      </h2>
    </div>
  );
}

export default page;
