import { INotice } from "../../types/student.types";

interface Props {
  notice: INotice;
}
const NoticeItem = ({ notice }: Props) => {
  return (
    <div className="flex flex-col gap-2  grow  rounded-md p-4 basis-80 relative shadow-lg bg-white dark:bg-slate-800">
      <h2 className="text-2xl font-semibold">{notice?.title}</h2>
      <h2 className="text-xl dark:text-white">{notice?.description}</h2>
      <div className="flex items-center justify-end gap-2 mt-2">
        <button className="bg-red-600 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-red-500">
          Delete
        </button>
        <button className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 ">
          Edit
        </button>
      </div>
    </div>
  );
};

export default NoticeItem;
