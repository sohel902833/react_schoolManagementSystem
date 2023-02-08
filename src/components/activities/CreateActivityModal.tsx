import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { ACTIVITY_REF_NAME } from "../../api/databaseRef";
import { activityValidatorScheme } from "../../lib/yupValidator";
import { IActivity } from "../../types/user.types";
import Modal from "../utill/Modal";
import Select from "../utill/Select";
import TextArea from "../utill/TextArea";
import TextInput from "../utill/TextInput";
import {
  getDownloadURL,
  getStorage,
  ref as storgeRef,
  uploadBytes,
} from "firebase/storage";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  activity?: IActivity;
}
const CreateActivityModal = ({ open, setOpen, edit, activity }: Props) => {
  const [errors, setErrors] = useState<any>({});

  const [title, setTitle] = useState(activity?.title || "");
  const [link, setLink] = useState(activity?.link || "");
  const [type, setType] = useState(activity?.type || "video");
  const [images, setImages] = useState<any>([]);
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);

  const [createActivityLoading, setCreateActivityLoading] = useState(false);

  const db = getDatabase();
  const handleSubmit = () => {
    activityValidatorScheme
      .validate(
        {
          title,
          link: type === "image" ? "asd" : link,
          type,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        if (!edit && type === "image" && images?.length === 0) {
          toast.warn("Please Select Some Images");
        }
        setErrors({});
        if (edit && activity?.activityId) {
          const img = await handleImageUpload();
          editActivity(img);
        } else {
          const img = await handleImageUpload();
          createActivity(img);
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

  const handleImageUpload = async () => {
    const storage = getStorage();
    let result: string[] = [];
    if (type !== "image") return [];

    setImageUploadLoading(true);
    for (let image of images) {
      const imageRef = storgeRef(storage, `images/${image?.name}`);
      await uploadBytes(imageRef, image).then((data) => {
        getDownloadURL(data.ref).then((downloadURL) => {
          result.push(downloadURL);
        });
      });
    }
    setImageUploadLoading(false);
    return result;
  };

  const editActivity = async (uploadedImage: string[]) => {
    try {
      setCreateActivityLoading(true);
      const updateNewActivity: IActivity = {
        ...(activity as IActivity),
        title,
        link,
        type,
        images: uploadedImage?.length > 0 ? uploadedImage : activity?.images,
      };
      await update(
        ref(db, `${ACTIVITY_REF_NAME}/${updateNewActivity?.activityId}`),
        updateNewActivity
      );
      resetForm();
      toast.success("Activity Updated Successful");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const createActivity = async (uploadedImage: string[]) => {
    try {
      setCreateActivityLoading(true);
      const newActivity: IActivity = {
        activityId: new Date().getTime().toString(),
        title,
        link,
        type,
        images: uploadedImage,
      };
      await set(
        ref(db, `${ACTIVITY_REF_NAME}/${newActivity?.activityId}`),
        newActivity
      );
      resetForm();
      toast.success("Activity Created");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImages(files);
  };

  const resetForm = () => {
    setCreateActivityLoading(false);
    setOpen(false);
    setLink("");
    setTitle("");
    setType("");
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full py-3 ">
        <h2 className="mb-4  text-purple-800 font-extrabold text-2xl">
          {edit ? "Update Activity" : "Create New Activity"}
        </h2>
        <hr />
        <Select
          label="Activity Type"
          onChange={(e: any) => setType(e.target.value)}
          value={type}
          error={errors?.type}
          isRequired={true}
          optionList={["image", "video"]}
          renderItem={(item: any, index: number) => (
            <option value={item}>{item}</option>
          )}
        />
        <TextInput
          label="Title"
          placeholder="Enter Title"
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          error={errors?.title}
        />
        {type === "image" && (
          <div className="mt-4">
            <label
              htmlFor="activityImage"
              className="bg-purple-800 p-4 cursor-pointer text-white rounded-sm "
            >
              {images?.length > 0
                ? `${images?.length} Image Selected`
                : "Choose Images"}
            </label>
            <input
              onChange={handleSelectImage}
              type="file"
              id="activityImage"
              className="invisible"
              multiple
            />
          </div>
        )}
        {type === "video" && (
          <TextArea
            label="Link"
            placeholder="Enter Link"
            type="text"
            value={link}
            onChange={(e: any) => setLink(e.target.value)}
            error={errors?.link}
          />
        )}

        {imageUploadLoading && (
          <h2 className="my-2 text-green-800 dark:text-green-500">
            Uploading Image....
          </h2>
        )}

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
            {createActivityLoading ? "Creating.." : "Create"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default CreateActivityModal;
