import { useWrapper } from "../../context/DataWrapper";
import { IBatch } from "../../types/batch.types";
interface Props {
  batch: IBatch;
  handleDeleteBatch: (batch: IBatch, open: boolean) => void;
  handleUpdateBatch: (batch: IBatch, open: boolean) => void;
}
const BatchItem = ({ batch, handleDeleteBatch, handleUpdateBatch }: Props) => {
  const { classList } = useWrapper();

  const getClassName = () => {
    return classList?.filter((item) => item?.classId === batch?.classId)[0]
      ?.className;
  };

  return (
    <>
      <div className="flex flex-col gap-2  grow  rounded-md p-4 basis-80 relative shadow-lg bg-white dark:bg-slate-800">
        <h2 className="text-2xl font-semibold dark:text-white">
          {batch?.batchName}
        </h2>
        <h2 className="text-xl dark:text-white">Class: {getClassName()}</h2>
        <h2 className="text-xl dark:text-white">Session: {batch?.session}</h2>
        <h2 className="text-xl dark:text-white">Group: {batch?.group}</h2>
        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            onClick={() => handleDeleteBatch(batch, true)}
            className="bg-red-600 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => handleUpdateBatch(batch, true)}
            className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 "
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default BatchItem;
