import Header from "@/components/Header";
import Slider from "@/components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  console.log("sliderList:", sliderList);

  return (
    <div>
      <Header />
      <div className=" sm:p-10">
        <Slider sliderList={sliderList} />
      </div>
    </div>
  );
}
