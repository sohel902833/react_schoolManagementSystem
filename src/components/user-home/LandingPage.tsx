import { useWrapper } from "../../context/DataWrapper";
import { ITeacher } from "../../types/student.types";
import HomeSlider from "./HomeSlider";
import MainTeacherItem from "./MainTeacherItem";
import NoticeBox from "./NoticeBox";
import SocialLinks from "./SocialLinks";

const LandingPage = () => {
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

  console.log("HOME page");
  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mt-5 mx-auto flex flex-col sm:flex-col md:flex-row gap-5">
        <div className="flex-[3] mb-10">
          <div className="w-full">
            <HomeSlider />
            <br />
            <NoticeBox />
            <br />
            <h2 className="bg-blue-500 dark:bg-slate-900 text-white px-4 py-2 font-bold">
              Descriptioin About:
            </h2>
            <p className="dark:text-white">{basicInfo?.description}</p>
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
    </div>
  );
};

export default LandingPage;
