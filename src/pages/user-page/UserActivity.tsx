import UserActivityItem from "../../components/activities/UserActivityItem";
import MainTeacherItem from "../../components/user-home/MainTeacherItem";
import SocialLinks from "../../components/user-home/SocialLinks";
import { useWrapper } from "../../context/DataWrapper";
import { ITeacher } from "../../types/student.types";
import { IActivity } from "../../types/user.types";

const UserActivity = () => {
  const { activityList, loading, teacherList } = useWrapper();
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

  let newUserActivity: IActivity[] = [];

  activityList?.map((item) => {
    if (item?.type === "video") {
      newUserActivity.push(item);
    } else if (
      item?.type === "image" &&
      item?.images &&
      item?.images?.length > 0
    ) {
      item?.images?.map((image) => {
        newUserActivity.push({
          ...item,
          link: image,
        });
      });
    }
  });

  return (
    <>
      <h1 className="container mx-auto font-extrabold text-2xl mt-10 bg-blue-500 p-4 text-white dark:bg-slate-800">
        Our Activities
      </h1>
      <div className="container mt-5 mx-auto flex flex-col md:flex-row gap-5 sm:flex-col-reverse">
        <div className="flex-[3] mb-10">
          <div className="w-full">
            <div className="flex gap-4 mt-3 flex-wrap ">
              {loading ? (
                <h2>Loading Activity..</h2>
              ) : (
                newUserActivity?.map((item) => (
                  <UserActivityItem key={item?.activityId} activity={item} />
                ))
              )}
            </div>
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

export default UserActivity;
