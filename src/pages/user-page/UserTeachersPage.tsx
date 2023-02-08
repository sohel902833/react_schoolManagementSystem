import { useWrapper } from "../../context/DataWrapper";
import avatarImage from "../../assets/avatar.svg";
import MainTeacherItem from "../../components/user-home/MainTeacherItem";
import SocialLinks from "../../components/user-home/SocialLinks";
import { ITeacher } from "../../types/student.types";
const UserTeachersPage = () => {
  const { teacherList } = useWrapper();
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
        Teachers
      </h1>
      <div className="container mt-5 mx-auto flex flex-col-reverse md:flex-row gap-5 sm:flex-col-reverse">
        <div className="flex-[3] mb-10">
          <div className="w-full">
            {teacherList?.sort(applySort).map((teacher, index) => (
              <div
                key={teacher?.teacherId}
                className="dark:bg-slate-800 bg-white/40 p-4 rounded-lg flex gap-4 mt-4 shadow-md"
              >
                <img
                  className="w-[120px] h-[120px] object-cover rounded-lg"
                  src={teacher?.image ? teacher?.image : avatarImage}
                />
                <div className="flex flex-col gap-1">
                  <h2 className="dark:text-white font-bold">
                    Name:{teacher?.name}
                  </h2>
                  <h3 className="dark:text-white">Title:{teacher?.title}</h3>
                  <h3 className="dark:text-white">
                    Mobile No:{teacher?.phone}
                  </h3>
                  <h3 className="dark:text-white">Email:{teacher?.email}</h3>
                </div>
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
                <MainTeacherItem key={item.phone} teacher={item} />
              ))}{" "}
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

export default UserTeachersPage;
