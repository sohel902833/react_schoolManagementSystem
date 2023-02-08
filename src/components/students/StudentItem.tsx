import avatarImg from "../../assets/avatar.svg";
import { useWrapper } from "../../context/DataWrapper";
import { IStudent } from "../../types/student.types";
interface Props {
  student: IStudent;
  handleDeleteStudent: (student: IStudent, open: boolean) => void;
  handleUpdateStudent: (student: IStudent, open: boolean) => void;
}
const StudentItem = ({
  student,
  handleDeleteStudent,
  handleUpdateStudent,
}: Props) => {
  const { batchList, classList } = useWrapper();

  const getClassName = () => {
    const classId = batchList?.filter(
      (batch) => student?.batchId === batch?.batchId
    )[0]?.classId;
    return classList?.filter((classItem) => classItem?.classId === classId)[0]
      ?.className;
  };

  return (
    <div className="dark:bg-slate-800 flex flex-col gap-2  grow  rounded-md p-4 basis-[400px] relative shadow-lg bg-white">
      <img src={avatarImg} className="w-full h-[200px] object-cover" />
      <h2 className="dark:text-white text-2xl font-semibold">
        {student?.name}
      </h2>
      <h2 className="dark:text-white text-xl">Roll: {student?.roll}</h2>

      <h2 className="dark:text-white text-xl">Class: {getClassName()}</h2>
      <h2 className="dark:text-white text-xl">
        Email: {student?.email}, Phone: {student?.phone}
      </h2>
      <h2 className="dark:text-white text-xl">
        Registration: {student?.registration}
      </h2>
      <div className="flex items-center justify-end gap-2 mt-2">
        <button
          onClick={() => handleDeleteStudent(student, true)}
          className="bg-red-600 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-red-500"
        >
          Delete
        </button>
        <button
          onClick={() => handleUpdateStudent(student, true)}
          className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 "
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default StudentItem;
