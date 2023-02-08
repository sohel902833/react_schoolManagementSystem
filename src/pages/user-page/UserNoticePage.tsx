import UserLayout from "../../components/layout/UserLayout";
import MainTeacherItem from "../../components/user-home/MainTeacherItem";
import SocialLinks from "../../components/user-home/SocialLinks";
import { useWrapper } from "../../context/DataWrapper";
import { ITeacher } from "../../types/student.types";

const UserNoticePage = () => {
  const { noticeList, teacherList } = useWrapper();
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
        Notice
      </h1>
      <div className="container mt-5 mx-auto flex flex-col md:flex-row gap-5 sm:flex-col-reverse">
        <div className="flex-[3] mb-10">
          <div className="w-full">
            {noticeList?.map((notice) => (
              <div
                key={notice?.noticeId}
                className="dark:bg-slate-800 bg-white/40 p-4 rounded-lg flex flex-col gap-4 mt-4 shadow-md"
              >
                {notice?.images && (
                  <img
                    onClick={() => window.open(notice?.images)}
                    className="w-[220px] cursor-pointer h-[220px] object-cover rounded-md"
                    src={notice?.images}
                    alt=""
                  />
                )}

                <h2 className="dark:text-white font-bold">
                  {notice?.description}
                </h2>
                <h3 className="dark:text-white">
                  Date:{new Date(notice?.noticeId).toLocaleDateString()}
                </h3>
              </div>
            ))}
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

export default UserNoticePage;
