import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { SLIDER_IMAGE_REF_NAME } from "../../api/databaseRef";
import { sliderValidatorScheme } from "../../lib/yupValidator";
import { ISlider } from "../../types/slider.types";
import Modal from "../utill/Modal";
import TextArea from "../utill/TextArea";
import TextInput from "../utill/TextInput";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  slider?: ISlider;
}
const CreateSliderImageModal = ({ open, setOpen, edit, slider }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const [title, setTitle] = useState(slider?.title || "");
  const [imageName, setImageName] = useState(slider?.imageName || "");
  const [imageUrl, setImageUrl] = useState(slider?.imageUrl || "");

  const [createBatchLoading, setCreateBatchLoading] = useState(false);

  const db = getDatabase();
  const handleSubmit = () => {
    sliderValidatorScheme
      .validate(
        {
          title,
          imageName,
          imageUrl,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        if (edit && slider?.imageId) {
          editSlider();
        } else {
          createSlider();
        }
      })
      .catch((err) => {
        let newError: any = {};
        err.inner?.forEach((item: any) => {
          newError[item.path] = item.message;
        });
        setErrors(newError);
      });
  };

  const editSlider = async () => {
    try {
      setCreateBatchLoading(true);
      const updatedSlider: ISlider = {
        ...(slider as ISlider),
        title,
        imageName,
        imageUrl,
      };
      await update(
        ref(db, `${SLIDER_IMAGE_REF_NAME}/${updatedSlider?.imageId}`),
        updatedSlider
      );
      resetForm();
      toast.success("Slider Updated Successful");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const createSlider = async () => {
    try {
      setCreateBatchLoading(true);
      const newSlider: ISlider = {
        imageId: new Date().getTime().toString(),
        title,
        imageName,
        imageUrl,
      };
      await set(
        ref(db, `${SLIDER_IMAGE_REF_NAME}/${newSlider?.imageId}`),
        newSlider
      );
      resetForm();
      toast.success("Slider Created");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const resetForm = () => {
    setCreateBatchLoading(false);
    setOpen(false);
    setTitle("");
    setImageName("");
    setImageUrl("");
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full py-3 ">
        <h2 className="mb-4  text-purple-800 font-extrabold text-2xl">
          {edit ? "Update Slider Image" : "Create New Slider Image"}
        </h2>
        <hr />
        <TextInput
          label="Slider Image Name"
          placeholder="Enter Slider Image Name"
          type="text"
          value={imageName}
          onChange={(e: any) => setImageName(e.target.value)}
          error={errors?.imageName}
          required={true}
        />
        <TextInput
          label="Slider Image Title"
          placeholder="Enter Slider Image Title"
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          error={errors?.title}
          required={true}
        />
        <TextArea
          label="Slider Image Link"
          placeholder="Enter Slider Image Link"
          type="text"
          value={imageUrl}
          onChange={(e: any) => setImageUrl(e.target.value)}
          error={errors?.imageUrl}
          required={true}
          rows={3}
        />

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-red-600 px-7 py-2 rounded-sm text-slate-50 font-extrabold hover:bg-red-500"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 px-7 py-2 rounded-sm text-slate-50 font-extrabold hover:bg-purple-500 "
          >
            {createBatchLoading ? "Creating.." : "Create"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default CreateSliderImageModal;
