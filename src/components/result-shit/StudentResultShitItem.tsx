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
  handleUpdateResultShitTotalMark: (
    studentId: string,
    batchId: string,
    shitId: string,
    totalMark: string
  ) => void;
  updatedResultShit: any;
  shitId: string;
}
const StudentResultShitItem = ({
  shitId,
  student,
  handleUpdateResultShitGpa,
  handleUpdateResultShitPosition,
  handleUpdateResultShitTotalMark,
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
        Total Mark: {studentResult?.totalMark}
      </h2>
      <h2 className="dark:text-white text-xl">
        Got Mark:{" "}
        <label className="text-purple-700 font-bold">
          {studentResult?.gpa}
        </label>{" "}
        , Position:
        <label className="text-purple-700 font-bold">
          {studentResult?.position}
        </label>
      </h2>
      <div className="flex flex-col  gap-2">
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
        <TextInput
          label="Got Mark"
          placeholder="Got Mark"
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
        <TextInput
          label="Total Mark"
          placeholder="Total Mark"
          value={updatedResultShit[student?.studentId + shitId]?.totalMark}
          onChange={(e: any) =>
            handleUpdateResultShitTotalMark(
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
  );
};

export default StudentResultShitItem;
