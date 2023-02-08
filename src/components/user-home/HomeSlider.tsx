import { useEffect, useState } from "react";
import { useWrapper } from "../../context/DataWrapper";

const HomeSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { basicInfo, sliderImageList } = useWrapper();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        return prev < sliderImageList?.length - 1 ? prev + 1 : 0;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImageList]);

  return (
    <div className="p-4 bg-white/20 dark:bg-stone-800/20 w-full h-full rounded-xl shadow-lg dark:shadow-white/20">
      {sliderImageList?.length > 0 && (
        <img
          className="w-full h-[300px] object-cover md:h-[400px] rounded-xl  transition-[.5] "
          src={sliderImageList[currentImage].imageUrl}
        />
      )}

      <h2 className="mt-2  dark:text-white font-extrabold  text-xl">
        {sliderImageList[currentImage]?.title}
      </h2>
      <h2 className="mt-2  dark:text-purple-500 text-purple-600 font-extrabold  text-4xl shadow-2xl">
        {basicInfo?.instituteName}
      </h2>
      <div className="flex bg-white dark:bg-stone-800/20 p-3 mt-2 items-center">
        <h2 className="dark:bg-stone-800/10 shadow-md h-full p-2 dark:text-white font-bold rounded-lg">
          Notice:{" "}
        </h2>
        <div className="text-black dark:text-white">
          {/* @ts-ignore */}
          <marquee>{basicInfo?.headLine}</marquee>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
