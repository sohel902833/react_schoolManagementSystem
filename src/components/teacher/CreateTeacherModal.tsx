import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { TEACHER_REF_NAME } from "../../api/databaseRef";
import { teacherValidationScheme } from "../../lib/yupValidator";
import { ITeacher } from "../../types/student.types";
import Modal from "../utill/Modal";
import TextInput from "../utill/TextInput";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  teacher?: ITeacher;
}
const CreateTeacherModal = ({ open, setOpen, edit, teacher }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const [teacherName, setTeacherName] = useState(teacher?.name || "");
  const [email, setEmail] = useState(teacher?.email || "");
  const [teacherId, setTeacherId] = useState(teacher?.teacherCode || "");
  const [phone, setPhone] = useState(teacher?.phone || "");
  const [password, setPassword] = useState(teacher?.password || "");
  const [title, setTitle] = useState(teacher?.title || "");
  const [pinned, setPinned] = useState(teacher?.pinned || false);
  const [position, setPosition] = useState(teacher?.position || "");
  const [createTeacherLoading, setCreateTeacherLoading] = useState(false);

  const db = getDatabase();
  const handleSubmit = () => {
    teacherValidationScheme
      .validate(
        {
          name: teacherName,
          title,
          phone,
          password,
          teacherCode: teacherId,
          email,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        if (edit && teacher?.teacherId) {
          editTeacher();
        } else {
          createTeacher();
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

  const editTeacher = async () => {
    try {
      setCreateTeacherLoading(true);
      const updatedNewTeacher: ITeacher = {
        ...(teacher as ITeacher),
        email,
        name: teacherName,
        password: password?.trim(),
        phone,
        teacherCode: teacherId,
        title,
        pinned,
        position: position ? Number(position) : -1,
      };
      await update(
        ref(db, `${TEACHER_REF_NAME}/${teacher?.teacherId}`),
        updatedNewTeacher
      );
      resetForm();
      toast.success("Teacher Updated Successful");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const createTeacher = async () => {
    try {
      setCreateTeacherLoading(true);
      const newTeacher: ITeacher = {
        teacherId: new Date().getTime().toString(),
        email,
        name: teacherName,
        password: password?.trim(),
        phone,
        teacherCode: teacherId,
        title,
        pinned,
        position: position ? Number(position) : -1,
      };
      await set(
        ref(db, `${TEACHER_REF_NAME}/${newTeacher?.teacherId}`),
        newTeacher
      );
      resetForm();
      toast.success("Teacher Created");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const resetForm = () => {
    setCreateTeacherLoading(false);
    setOpen(false);
    setEmail("");
    setPassword("");
    setPhone("");
    setTitle("");
    setTeacherId("");
    setTeacherName("");
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full py-3 ">
        <h2 className="mb-4  text-purple-800 font-extrabold text-2xl">
          {edit ? "Update Student" : "Create New Teacher"}
        </h2>
        <hr />
        <TextInput
          label="Teacher Name"
          placeholder="Enter Teacher Name"
          type="text"
          value={teacherName}
          onChange={(e: any) => setTeacherName(e.target.value)}
          error={errors?.name}
          required={true}
        />
        <TextInput
          label="Teacher Title"
          placeholder="Enter Teacher Title"
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          error={errors?.title}
          required={true}
        />
        <TextInput
          label="Teacher Email"
          placeholder="Enter Teacher Email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          error={errors?.email}
          required={true}
        />{" "}
        <TextInput
          label="Teacher Phone"
          placeholder="Enter Teacher Phone"
          type="text"
          value={phone}
          onChange={(e: any) => setPhone(e.target.value)}
          error={errors?.phone}
          required={true}
        />{" "}
        <TextInput
          label="Password"
          placeholder="Teacher Login Password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          error={errors?.password}
          required={true}
        />
        <TextInput
          label="Teacher ID"
          placeholder="Enter Teacher ID"
          type="text"
          value={teacherId}
          onChange={(e: any) => setTeacherId(e.target.value)}
          error={errors?.teacherCode}
          required={true}
        />
        <button
          onClick={() => setPinned((prev) => !prev)}
          className="bg-purple-600 px-7 py-2 rounded-sm text-slate-50 font-extrabold hover:bg-red-500"
        >
          {pinned ? "Pinned" : " Pin To Home Page"}
        </button>
        <TextInput
          label="Sorting Position"
          placeholder="Enter Sorting Position"
          type="number"
          value={position}
          onChange={(e: any) => setPosition(e.target.value)}
          error={errors?.position}
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
            {createTeacherLoading ? "Creating.." : "Create"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default CreateTeacherModal;
