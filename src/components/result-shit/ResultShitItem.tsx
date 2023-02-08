import { useNavigate } from "react-router-dom";
import { useWrapper } from "../../context/DataWrapper";
import { IResultShit } from "../../types/batch.types";
interface Props {
  resultShit: IResultShit;
  handleDeleteResultShit: (resultShit: IResultShit, open: boolean) => void;
  handleUpdateResultShit: (resultShit: IResultShit, open: boolean) => void;
}
const ResultShitItem = ({
  resultShit,
  handleDeleteResultShit,
  handleUpdateResultShit,
}: Props) => {
  const { classList, batchList } = useWrapper();
  const navigate = useNavigate();
  const getClassName = () => {
    const classId = batchList?.filter(
      (item) => item?.batchId === resultShit?.batchId
    )[0]?.classId;
    return classList?.filter((item) => item?.classId === classId)[0]?.className;
  };

  const navigateToEditResultShit = () => {
    navigate(`shit/${resultShit?.resultShitId}`);
  };

  return (
    <>
      <div className="cursor-pointer flex flex-col gap-2  grow  rounded-md p-4 basis-80 relative shadow-lg bg-white dark:bg-slate-800">
        <h2
          onClick={navigateToEditResultShit}
          className="text-2xl  hover:bg-slate-300 font-semibold dark:text-white"
        >
          {resultShit?.name}
        </h2>
        <h2 className="text-xl dark:text-white">Class: {getClassName()}</h2>
        <h2 className="text-xl dark:text-white">
          Published At:{" "}
          {new Date(resultShit?.resultShitId).toLocaleDateString()}
        </h2>

        <button
          onClick={() => handleDeleteResultShit(resultShit, true)}
          className={`w-[120px] px-7 py-2 rounded-md text-slate-50 font-extrabold ${
            resultShit?.status === "pending"
              ? "bg-red-600  hover:bg-red-500"
              : "bg-green-600  hover:bg-green-500"
          }`}
        >
          {resultShit?.status}
        </button>

        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            onClick={() => handleDeleteResultShit(resultShit, true)}
            className="bg-red-600 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => handleUpdateResultShit(resultShit, true)}
            className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 "
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultShitItem;
