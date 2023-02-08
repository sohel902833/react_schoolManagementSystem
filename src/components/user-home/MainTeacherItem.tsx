import { ITeacher } from "../../types/student.types";
import avatarImg from "../../assets/avatar.svg";

interface Props {
  teacher: ITeacher;
}
const MainTeacherItem = ({ teacher }: Props) => {
  console.log("TEact", teacher);
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 shadow-md rounded-md py-4  cursor-pointer">
      <h2 className="bg-blue-500 dark:bg-slate-900 text-white px-4 py-2 font-bold">
        {teacher?.title}
      </h2>
      <img className="mb-3 h-[200px]  object-cover" src={avatarImg} />
      <h3 className="ml-7 font-bold dark:text-white">{teacher?.name}</h3>
      <h4 className="ml-7 text-gray-600 dark:text-gray-300">
        {teacher?.title}
      </h4>
    </div>
  );
};

export default MainTeacherItem;
