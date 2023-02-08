import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { STUDENT_REF_NAME } from "../../api/databaseRef";
import { useWrapper } from "../../context/DataWrapper";
import { studentValidationScheme } from "../../lib/yupValidator";
import { IBatch } from "../../types/batch.types";
import { IStudent } from "../../types/student.types";
import Modal from "../utill/Modal";
import Select from "../utill/Select";
import TextInput from "../utill/TextInput";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  student?: IStudent;
}
const CreateStudentModal = ({ open, setOpen, edit, student }: Props) => {
  const { batchList } = useWrapper();
  const [errors, setErrors] = useState<any>({});
  const [name, setName] = useState(student?.name || "");
  const [roll, setRoll] = useState(student?.roll || "");
  const [registration, setRegistration] = useState(student?.registration || "");
  const [phone, setPhone] = useState(student?.phone || "");
  const [email, setEmail] = useState(student?.email || "");
  const [batch, setBatch] = useState(student?.batchId || "");
  const [createStudentLoading, setCreateStudentLoading] = useState(false);

  const db = getDatabase();
  const handleSubmit = () => {
    studentValidationScheme
      .validate(
        {
          name,
          roll,
          batch,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        if (edit && student?.studentId) {
          editStudent();
        } else {
          createStudent();
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

  const editStudent = async () => {
    try {
      setCreateStudentLoading(true);
      const updatedNewStudent: IStudent = {
        ...(student as IStudent),
        name,
        email: email ? email : "",
        phone: phone ? phone : "",
        batchId: batch,
        registration: registration ? registration : "",
        avatar: "",
        roll,
      };
      await update(
        ref(db, `${STUDENT_REF_NAME}/${student?.studentId}`),
        updatedNewStudent
      );
      resetForm();
      toast.success("Student Updated Successful");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const createStudent = async () => {
    try {
      setCreateStudentLoading(true);
      const newStudent: IStudent = {
        studentId: new Date().getTime().toString(),
        name,
        email: email ? email : "",
        phone: phone ? phone : "",
        batchId: batch,
        registration: registration ? registration : "",
        avatar: "",
        roll,
      };
      await set(
        ref(db, `${STUDENT_REF_NAME}/${newStudent?.studentId}`),
        newStudent
      );
      resetForm();
      toast.success("Student Created");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const resetForm = () => {
    setCreateStudentLoading(false);
    setOpen(false);
    setName("");
    setRoll("");
    setRegistration("");
    setEmail("");
    setPhone("");
    setBatch("");
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full py-3 ">
        <h2 className="mb-4  text-purple-800 font-extrabold text-2xl">
          {edit ? "Update Student" : "Create New Student"}
        </h2>
        <hr />
        <Select
          label="Batch"
          onChange={(e: any) => setBatch(e.target.value)}
          value={batch}
          error={errors?.batch}
          isRequired={true}
          optionList={batchList}
          renderItem={(item: IBatch, index: number) => (
            <option value={item?.batchId}>{item?.batchName}</option>
          )}
        />
        <TextInput
          label="Student Name"
          placeholder="Enter Student Name"
          type="text"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          error={errors?.name}
          required={true}
        />
        <TextInput
          label="Roll"
          placeholder="Enter Student Roll"
          type="number"
          value={roll}
          onChange={(e: any) => setRoll(e.target.value)}
          error={errors?.roll}
          required={true}
        />
        <TextInput
          label="Registration"
          placeholder="Enter Registration"
          type="number"
          value={registration}
          onChange={(e: any) => setRegistration(e.target.value)}
          error={errors?.registration}
        />{" "}
        <TextInput
          label="Phone"
          placeholder="Enter Phone"
          type="text"
          value={phone}
          onChange={(e: any) => setPhone(e.target.value)}
          error={errors?.phone}
        />
        <TextInput
          label="Email"
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          error={errors?.email}
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
            {createStudentLoading ? "Creating.." : "Create"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default CreateStudentModal;
