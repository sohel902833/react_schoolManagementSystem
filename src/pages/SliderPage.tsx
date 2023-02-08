import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { SLIDER_IMAGE_REF_NAME } from "../api/databaseRef";
import CreateSliderImageModal from "../components/slider-image/CreateSliderImageModal";
import SliderImageItem from "../components/slider-image/SliderImageItem";
import ActionModal from "../components/utill/ActionModal";
import { useWrapper } from "../context/DataWrapper";
import { ISlider } from "../types/slider.types";

const SliderPage = () => {
  const [createSliderModal, setCreateSliderModal] = useState(false);
  const { sliderImageList, loading } = useWrapper();
  const [editSliderModal, setEditSliderModal] = useState(false);
  const [deleteSliderModal, setDeleteSliderModal] = useState(false);
  const [deleteSliderLoading, setDeleteSliderLoading] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<ISlider | null>(null);

  const db = getDatabase();

  const deleteSlider = async () => {
    try {
      setDeleteSliderLoading(true);
      await remove(
        ref(db, `${SLIDER_IMAGE_REF_NAME}/${selectedSlider?.imageId}`)
      );
      setDeleteSliderLoading(false);
      setDeleteSliderModal(false);
      toast.success("Slider Deleted");
    } catch (er) {
      toast.error("Something Wrong!!");
      setDeleteSliderLoading(false);
      setDeleteSliderModal(false);
    }
  };

  const handleEditSliderModal = (slider: ISlider, open: boolean) => {
    setSelectedSlider(slider);
    setEditSliderModal(open);
  };
  const handleDeleteSliderModal = (slider: ISlider, open: boolean) => {
    setSelectedSlider(slider);
    setDeleteSliderModal(open);
  };
  const handleCreateSliderModal = () => {
    setCreateSliderModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Manage Slider
        </h2>
        <button
          onClick={handleCreateSliderModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-sm hover:bg-purple-800"
        >
          Add New Slider
        </button>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Slider..</h2>
        ) : (
          sliderImageList?.map((item) => (
            <SliderImageItem
              key={item?.imageId}
              slider={item}
              handleDeleteSlider={handleDeleteSliderModal}
              handleUpdateSlider={handleEditSliderModal}
            />
          ))
        )}
      </div>
      <CreateSliderImageModal
        open={createSliderModal}
        setOpen={setCreateSliderModal}
      />
      {deleteSliderModal && selectedSlider?.imageId && (
        <ActionModal
          open={deleteSliderModal}
          setOpen={setDeleteSliderModal}
          actionHandler={() => deleteSlider()}
          title="Delete Slider Image"
          message="Are Your Sure You Want to Delete This Slider Image?"
          actionLoading={deleteSliderLoading}
          actionLoadingText="Deleting.."
        />
      )}
      {editSliderModal && selectedSlider?.imageId && (
        <CreateSliderImageModal
          open={editSliderModal}
          setOpen={setEditSliderModal}
          edit={true}
          slider={selectedSlider}
        />
      )}
    </div>
  );
};

export default SliderPage;
