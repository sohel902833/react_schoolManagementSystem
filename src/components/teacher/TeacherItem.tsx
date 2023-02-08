import avatarImg from "../../assets/avatar.svg";
import { ITeacher } from "../../types/student.types";
interface Props {
  teacher: ITeacher;
  handleEditTeacherModal: (teacher: ITeacher, open: boolean) => void;
  handleDeleteTeacherModal: (teacher: ITeacher, open: boolean) => void;
}
const TeacherItem = ({
  teacher,
  handleDeleteTeacherModal,
  handleEditTeacherModal,
}: Props) => {
  return (
    <div className="flex flex-col gap-2  grow  rounded-md p-4 basis-80 relative shadow-lg bg-white dark:bg-slate-800">
      <img src={avatarImg} className="w-full h-[200px] object-cover" />
      <h2 className="text-2xl font-semibold dark:text-white">
        {teacher?.name}
      </h2>
      <h2 className="text-xl  dark:text-white">Title: {teacher?.title}</h2>
      <h2 className="text-xl  dark:text-white">
        Email: {teacher?.email},Pass: {teacher?.password}
      </h2>
      <h2 className="text-xl  dark:text-white">Phone: {teacher?.phone}</h2>
      <h2 className="text-xl  dark:text-white">
        Position On Home Page: {teacher?.position}
      </h2>
      <div className="flex items-center justify-between gap-2 mt-2">
        {teacher?.pinned && (
          <button className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 ">
            Pinned
          </button>
        )}

        <div className="flex items-center  gap-2 mt-2">
          <button
            onClick={() => handleDeleteTeacherModal(teacher, true)}
            className="bg-red-600 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => handleEditTeacherModal(teacher, true)}
            className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 "
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherItem;
