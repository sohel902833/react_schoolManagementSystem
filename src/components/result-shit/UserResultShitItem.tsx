import { useNavigate } from "react-router-dom";
import { useWrapper } from "../../context/DataWrapper";
import { IResultShit } from "../../types/batch.types";
interface Props {
  resultShit: IResultShit;
}
const UserResultShitItem = ({ resultShit }: Props) => {
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
      <div
        onClick={navigateToEditResultShit}
        className="cursor-pointer hover:bg-slate-300 flex flex-col gap-2  grow  rounded-md p-4 basis-80 relative shadow-lg bg-white dark:bg-slate-800"
      >
        <h2 className="text-2xl font-semibold dark:text-white">
          {resultShit?.name}
        </h2>
        <h2 className="text-xl dark:text-white">Class: {getClassName()}</h2>
        <h2 className="text-xl dark:text-white">
          Published At:
          {new Date(resultShit?.resultShitId).toLocaleDateString()}
        </h2>
      </div>
    </>
  );
};

export default UserResultShitItem;
