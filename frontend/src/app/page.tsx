import Header from "@/components/Header";
import Slider from "@/components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  console.log(categoryList);
  return (
    <div>
      <Header />
      <div className=" sm:p-10">
        <Slider sliderList={sliderList} />

        <CategoryList categoryList={categoryList} />

        <ProductList productList={productList} />
      </div>
      <Footer />
    </div>
  );
}
