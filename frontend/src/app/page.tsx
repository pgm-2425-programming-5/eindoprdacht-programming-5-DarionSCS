import Slider from "@/components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <div>
      <div className=" sm:p-10">
        <Slider sliderList={sliderList} />

        <CategoryList categoryList={categoryList} />

        <ProductList productList={productList} />
      </div>
    </div>
  );
}
