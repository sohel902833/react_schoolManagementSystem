import MainTeacherItem from "../../components/user-home/MainTeacherItem";
import SocialLinks from "../../components/user-home/SocialLinks";
import { useWrapper } from "../../context/DataWrapper";
import { ITeacher } from "../../types/student.types";

const AboutOurSelf = () => {
  const { basicInfo, teacherList } = useWrapper();
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
        About Us
      </h1>
      <div className="h-screen container mt-5 mx-auto flex flex-col-reverse md:flex-row gap-5 sm:flex-col-reverse">
        <div className="flex-[3] mb-10">
          <div className="w-[60%]">
            <h2 className="text-xl dark:text-white">{basicInfo?.aboutUs}</h2>
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

export default AboutOurSelf;
