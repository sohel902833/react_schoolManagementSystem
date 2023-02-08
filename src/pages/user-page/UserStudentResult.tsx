import { useParams } from "react-router-dom";
import UserStudentResultItem from "../../components/result-shit/UserStudentResultItem";
import { useWrapper } from "../../context/DataWrapper";
const UserStudentResult = () => {
  const { shitId } = useParams();
  const { loading, resultShitList, studentList, classList, batchList } =
    useWrapper();

  const resultShit = resultShitList?.filter(
    (item) => item?.resultShitId === shitId
  )[0];
  const batch = batchList?.filter(
    (batch) => batch?.batchId === resultShit?.batchId
  )[0];
  const classItem = classList?.filter(
    (cls) => cls.classId === batch?.classId
  )[0];

  const newStudentList = studentList?.filter(
    (item) => item?.batchId === resultShit?.batchId
  );

  return (
    <>
      <h1 className="container mx-auto font-extrabold text-2xl mt-10 bg-blue-500 p-4 text-white dark:bg-slate-800">
        Result For , Class: {classItem?.className}, Batch:{batch?.batchName}-
        {batch?.session} <br />
        <br />
        Total Students-{" "}
        <label className="text-purple-800 text-2xl">
          {newStudentList?.length}
        </label>
      </h1>
      <div className="h-screen container mt-5 mx-auto flex flex-col md:flex-row gap-5 sm:flex-col-reverse">
        <div className="flex-[3] mb-10">
          <div className="flex gap-4 mt-3 flex-wrap ">
            {loading ? (
              <h2>Loading Students..</h2>
            ) : (
              newStudentList?.map((item) => (
                <UserStudentResultItem
                  key={item?.studentId}
                  student={item}
                  shitId={shitId as string}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default UserStudentResult;
