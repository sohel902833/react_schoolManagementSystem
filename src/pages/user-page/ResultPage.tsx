import UserResultShitItem from "../../components/result-shit/UserResultShitItem";
import MainTeacherItem from "../../components/user-home/MainTeacherItem";
import SocialLinks from "../../components/user-home/SocialLinks";
import { useWrapper } from "../../context/DataWrapper";
import { ITeacher } from "../../types/student.types";

const ResultPage = () => {
  const { teacherList, resultShitList, loading } = useWrapper();
  const applySort = (a: ITeacher, b: ITeacher) => {
    if (a.position && b.position) {
      if (a.position < b.position) {
        return -1;
      }
      if (a.position > b.position) {
        return 1;
      }
      return 0;
    }
    return 0;
  };
  return (
    <>
      <h1 className="container mx-auto font-extrabold text-2xl mt-10 bg-blue-500 p-4 text-white dark:bg-slate-800">
        Result
      </h1>
      <div className="h-screen container mt-5 mx-auto flex flex-col md:flex-row gap-5 sm:flex-col">
        <div className="flex-[3] mb-10">
          <div className="flex gap-4 mt-3 flex-wrap ">
            {loading ? (
              <h2>Loading Result Shit..</h2>
            ) : (
              resultShitList
                ?.filter((shit) => shit?.status !== "pending")
                ?.map((item) => (
                  <UserResultShitItem
                    key={item?.resultShitId}
                    resultShit={item}
                  />
                ))
            )}
          </div>
        </div>
        <div className="flex-[1]">
          <div className="flex flex-col gap-3">
            {teacherList
              ?.filter((item) => item?.pinned)
              ?.sort(applySort)
              .map((item) => (
                <MainTeacherItem key={item.teacherId} teacher={item} />
              ))}
            <SocialLinks />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default ResultPage;
