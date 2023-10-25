import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RESULT_REF_NAME, STUDENT_REF_NAME } from "../api/databaseRef";
import StudentResultShitItem from "../components/result-shit/StudentResultShitItem";
import { useWrapper } from "../context/DataWrapper";

const EditShitResult = () => {
  const { shitId } = useParams();
  const { loading, resultShitList, studentList } = useWrapper();
  const [updatedResultShit, setUpdatedResultShit] = useState<any>({});
  const [resultShitLoading, setResultShitLoading] = useState<boolean>(false);
  const db = getDatabase();

  const handleUpdateResultShitPosition = (
    studentId: string,
    batchId: string,
    shitId: string,
    position: number
  ) => {
    setUpdatedResultShit((prev: any) => ({
      ...prev,
      [studentId + shitId]: {
        ...prev[studentId + shitId],
        resultId: studentId + shitId,
        studentId,
        batchId,
        shitId,
        position,
      },
    }));
  };
  const handleUpdateResultShitGpa = (
    studentId: string,
    batchId: string,
    shitId: string,
    gpa: number
  ) => {
    setUpdatedResultShit((prev: any) => ({
      ...prev,
      [studentId + shitId]: {
        ...prev[studentId + shitId],
        resultId: studentId + shitId,
        studentId,
        batchId,
        shitId,
        gpa,
      },
    }));
  };
  const handleUpdateResultShitTotalMark = (
    studentId: string,
    batchId: string,
    shitId: string,
    totalMark: string
  ) => {
    setUpdatedResultShit((prev: any) => ({
      ...prev,
      [studentId + shitId]: {
        ...prev[studentId + shitId],
        resultId: studentId + shitId,
        studentId,
        batchId,
        shitId,
        totalMark,
      },
    }));
  };

  const setResultShit = async () => {
    try {
      setResultShitLoading(true);
      await update(ref(db, `${RESULT_REF_NAME}/`), updatedResultShit);
      setResultShitLoading(false);
      setUpdatedResultShit({});
      toast.success("Result Created");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const batchId = resultShitList?.filter(
    (item) => item?.resultShitId === shitId
  )[0]?.batchId;

  const newStudentList = studentList?.filter(
    (item) => item?.batchId === batchId
  );

  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Edit Shit Result
        </h2>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Student..</h2>
        ) : (
          newStudentList?.map((item) => (
            <StudentResultShitItem
              key={item?.studentId}
              student={item}
              handleUpdateResultShitGpa={handleUpdateResultShitGpa}
              handleUpdateResultShitPosition={handleUpdateResultShitPosition}
              handleUpdateResultShitTotalMark={handleUpdateResultShitTotalMark}
              updatedResultShit={updatedResultShit}
              shitId={shitId as string}
            />
          ))
        )}
      </div>
      <button
        disabled={resultShitLoading}
        onClick={setResultShit}
        className="bg-purple-600 px-7 py-2 rounded-sm text-slate-50 font-extrabold hover:bg-purple-500 "
      >
        {resultShitLoading ? "Creating.." : "Set"}
      </button>
    </div>
  );
};

export default EditShitResult;
