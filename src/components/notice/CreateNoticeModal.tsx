import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { NOTICE_REF_NAME } from "../../api/databaseRef";
import { noticeValidationScheme } from "../../lib/yupValidator";
import { INotice } from "../../types/student.types";
import Modal from "../utill/Modal";
import TextArea from "../utill/TextArea";
import TextInput from "../utill/TextInput";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  notice?: INotice;
}
const CreateNoticeModal = ({ open, setOpen, edit, notice }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const [title, setTitle] = useState(notice?.title || "");
  const [description, setDescription] = useState(notice?.description || "");
  const [createNoticeLoading, setCreateNoticeLoading] = useState(false);

  const db = getDatabase();
  const handleSubmit = () => {
    noticeValidationScheme
      .validate(
        {
          title,
          description,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        if (edit && notice?.noticeId) {
          editNotice();
        } else {
          createNotice();
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

  const editNotice = async () => {
    try {
      setCreateNoticeLoading(true);
      const updatedNewNotice: INotice = {
        ...(notice as INotice),
        title,
        description,
      };
      await update(
        ref(db, `${NOTICE_REF_NAME}/${notice?.noticeId}`),
        updatedNewNotice
      );
      resetForm();
      toast.success("Notice Updated Successful");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const createNotice = async () => {
    try {
      setCreateNoticeLoading(true);
      const newNotice: INotice = {
        noticeId: new Date().getTime().toString(),
        title,
        description,
      };
      await set(
        ref(db, `${NOTICE_REF_NAME}/${newNotice?.noticeId}`),
        newNotice
      );
      resetForm();
      toast.success("Notice Created");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const resetForm = () => {
    setCreateNoticeLoading(false);
    setOpen(false);
    setDescription("");
    setTitle("");
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full py-3 ">
        <h2 className="mb-4  text-purple-800 font-extrabold text-2xl">
          Create New Notice
        </h2>
        <hr />
        <TextInput
          label="Notice Title"
          placeholder="Enter Notice Title"
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          error={errors?.title}
          required={true}
        />
        <TextArea
          label="Notice Description"
          placeholder="Enter Notice Description"
          type="text"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
          error={errors?.description}
          required={true}
          rows={4}
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
            {createNoticeLoading ? "Creating.." : "Create"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default CreateNoticeModal;
