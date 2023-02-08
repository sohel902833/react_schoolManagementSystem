import avatarImg from "../../assets/avatar.svg";
import { useWrapper } from "../../context/DataWrapper";
import { IStudent } from "../../types/student.types";
import TextInput from "../utill/TextInput";
interface Props {
  student: IStudent;
  handleUpdateResultShitGpa: (
    studentId: string,
    batchId: string,
    shitId: string,
    gpa: number
  ) => void;
  handleUpdateResultShitPosition: (
    studentId: string,
    batchId: string,
    shitId: string,
    position: number
  ) => void;
  updatedResultShit: any;
  shitId: string;
}
const StudentResultShitItem = ({
  shitId,
  student,
  handleUpdateResultShitGpa,
  handleUpdateResultShitPosition,
  updatedResultShit,
}: Props) => {
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
      <div className="flex items-center gap-2">
        <div className="flex-[1]">
          <TextInput
            label="Position/Roll"
            placeholder="Enter Position/Roll"
            value={updatedResultShit[student?.studentId + shitId]?.position}
            onChange={(e: any) =>
              handleUpdateResultShitPosition(
                student?.studentId,
                student?.batchId,
                shitId,
                e.target.value
              )
            }
            error={""}
            type="number"
          />
        </div>
        <div className="flex-[1]">
          <TextInput
            label="Gpa"
            placeholder="Enter Gpa"
            value={updatedResultShit[student?.studentId + shitId]?.gpa}
            onChange={(e: any) =>
              handleUpdateResultShitGpa(
                student?.studentId,
                student?.batchId,
                shitId,
                e.target.value
              )
            }
            error={""}
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentResultShitItem;
