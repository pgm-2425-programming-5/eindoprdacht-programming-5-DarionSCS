import React from "react";
import Image from "next/image";

function CategoryList({ categoryList }) {
  return (
    <div className="mt-8 px-4 ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.isArray(categoryList.data) &&
          categoryList.data.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center bg-white p-4 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out transform hover:-translate-y-1"
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.icon?.url
                }
                alt={category.name}
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-700">
                {category.name}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CategoryList;
