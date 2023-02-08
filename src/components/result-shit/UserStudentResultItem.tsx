import avatarImg from "../../assets/avatar.svg";
import { useWrapper } from "../../context/DataWrapper";
import { IStudent } from "../../types/student.types";
interface Props {
  student: IStudent;
  shitId: string;
}
const UserStudentResultItem = ({ student, shitId }: Props) => {
  const { batchList, classList, resultList } = useWrapper();

  const getClassName = () => {
    const classId = batchList?.filter(
      (batch) => student?.batchId === batch?.batchId
    )[0]?.classId;
    return classList?.filter((classItem) => classItem?.classId === classId)[0]
      ?.className;
  };

  const studentResult = resultList.filter(
    (res) =>
      res?.batchId === student?.batchId &&
      res?.studentId === student?.studentId &&
      shitId === res?.shitId
  )[0];
  return (
    <div className="dark:bg-slate-800 flex flex-col gap-2  grow  rounded-md p-4 basis-[300px] relative shadow-lg bg-white">
      <img src={avatarImg} className="w-full h-[200px] object-cover" />
      <h2 className="dark:text-white text-2xl font-semibold">
        {student?.name}
      </h2>
      <h2 className="dark:text-white text-xl">Roll: {student?.roll}</h2>

      <h2 className="dark:text-white text-xl">Class: {getClassName()}</h2>
      <h2 className="dark:text-white text-xl">
        Gpa:{" "}
        <label className="text-purple-700 font-bold">
          {studentResult?.gpa}
        </label>{" "}
        , Position:
        <label className="text-purple-700 font-bold">
          {studentResult?.position}
        </label>
      </h2>
    </div>
  );
};

export default UserStudentResultItem;
