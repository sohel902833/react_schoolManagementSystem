import { IClass } from "../../types/class.types";
interface Props {
  classItem: IClass;
  handleDeleteClass: (classItem: IClass, open: boolean) => void;
  handleUpdateClass: (classItem: IClass, open: boolean) => void;
}

const ClassItem = ({
  classItem,
  handleDeleteClass,
  handleUpdateClass,
}: Props) => {
  return (
    <>
      <div className="dark:bg-slate-800 flex flex-col gap-2  grow  rounded-md p-4 basis-80 relative shadow-lg bg-white">
        <h2 className="dark:text-white text-4xl text-center font-extrabold text-purple-800">
          {classItem?.className}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => handleDeleteClass(classItem, true)}
            className="bg-red-600 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => handleUpdateClass(classItem, true)}
            className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 "
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default ClassItem;
