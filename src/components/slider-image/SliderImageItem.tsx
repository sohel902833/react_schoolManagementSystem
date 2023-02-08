import { ISlider } from "../../types/slider.types";
interface Props {
  slider: ISlider;
  handleDeleteSlider: (slider: ISlider, open: boolean) => void;
  handleUpdateSlider: (slider: ISlider, open: boolean) => void;
}
const SliderImageItem = ({
  slider,
  handleDeleteSlider,
  handleUpdateSlider,
}: Props) => {
  return (
    <div className="dark:bg-slate-800 flex flex-col gap-2  grow  rounded-md p-4 basis-[400px] relative shadow-lg bg-white">
      <img src={slider?.imageUrl} className="w-full h-[200px] object-cover" />
      <h2 className="dark:text-white text-2xl font-semibold">
        {slider?.title}
      </h2>
      <h2 className="dark:text-white text-xl">{slider?.imageName}</h2>
      <div className="flex items-center justify-end gap-2 mt-2">
        <button
          onClick={() => handleDeleteSlider(slider, true)}
          className="bg-red-600 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-red-500"
        >
          Delete
        </button>
        <button
          onClick={() => handleUpdateSlider(slider, true)}
          className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 "
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default SliderImageItem;
