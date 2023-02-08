import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { CLASS_REF_NAME } from "../../api/databaseRef";
import { IClass } from "../../types/class.types";
import Modal from "../utill/Modal";
import TextInput from "../utill/TextInput";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  classItem?: IClass;
}
const CreateClassModal = ({ open, setOpen, edit, classItem }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const [className, setClassName] = useState(classItem?.className || "");
  const [createClassLoading, setCreateClassLoading] = useState(false);
  const db = getDatabase();

  const handleSubmit = async () => {
    if (!className) {
      setErrors({
        className: "Please Enter Class Name",
      });
      return;
    }
    if (edit && classItem?.classId) {
      updateClass();
    } else {
      createNewClass();
    }
  };

  const createNewClass = async () => {
    try {
      setErrors({});
      setCreateClassLoading(true);

      const newClass: IClass = {
        classId: new Date().getTime().toString(),
        className: className,
      };

      await set(ref(db, `${CLASS_REF_NAME}/${newClass.classId}`), newClass);
      setCreateClassLoading(false);
      setClassName("");
      setOpen(false);

      toast.success("Class Created");
    } catch (err) {
      toast.error("Something Wrong!");
    }
  };
  const updateClass = async () => {
    try {
      setErrors({});
      setCreateClassLoading(true);

      const newClass: IClass = {
        ...(classItem as IClass),
        className: className,
      };

      await update(ref(db, `${CLASS_REF_NAME}/${newClass.classId}`), newClass);
      setCreateClassLoading(false);
      setClassName("");
      setOpen(false);

      toast.success("Class Updated");
    } catch (err) {
      toast.error("Something Wrong!");
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full py-3 ">
        <h2 className="mb-4  text-purple-800 font-extrabold text-2xl">
          {edit ? "Update Class" : "Create New Class"}
        </h2>
        <hr />
        <TextInput
          label="Class Name"
          placeholder="Enter Class Name"
          type="text"
          value={className}
          onChange={(e: any) => setClassName(e.target.value)}
          error={errors?.className}
          required={true}
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
            {createClassLoading ? "Creating.." : "Create"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default CreateClassModal;
