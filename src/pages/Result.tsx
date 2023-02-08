import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { RESULT_SHIT_REF_NAME } from "../api/databaseRef";
import CreateResultShitModal from "../components/result-shit/CreateResultShit";
import ResultShitItem from "../components/result-shit/ResultShitItem";
import ActionModal from "../components/utill/ActionModal";
import { useWrapper } from "../context/DataWrapper";
import { IResultShit } from "../types/batch.types";
const Result = () => {
  const [addResultShitModal, setAddResultShitModal] = useState(false);
  const [editResultShitModal, setEditResultShitModal] = useState(false);
  const [deleteResultShitModal, setDeleteResultShitModal] = useState(false);
  const [deleteResultShitLoading, setDeleteResultShitLoading] = useState(false);

  const [selectedResultShit, setSelectedResultShit] =
    useState<IResultShit | null>(null);
  const { loading, resultShitList } = useWrapper();

  const handleEditResultShitModal = (shit: IResultShit, open: boolean) => {
    setSelectedResultShit(shit);
    setEditResultShitModal(open);
  };
  const handleDeleteResultShitModal = (shit: IResultShit, open: boolean) => {
    setSelectedResultShit(shit);
    setDeleteResultShitLoading(open);
  };

  const db = getDatabase();

  const deleteResultShit = async () => {
    try {
      setDeleteResultShitLoading(true);
      await remove(
        ref(db, `${RESULT_SHIT_REF_NAME}/${selectedResultShit?.resultShitId}`)
      );
      setDeleteResultShitLoading(false);
      setDeleteResultShitModal(false);
      toast.success("Result Shit Deleted");
    } catch (er) {
      toast.error("Something Wrong!!");
      setDeleteResultShitLoading(false);
      setDeleteResultShitModal(false);
    }
  };

  const handleAddResultShitModal = () => {
    setAddResultShitModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Result Shit
        </h2>
        <button
          onClick={handleAddResultShitModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-sm hover:bg-purple-800"
        >
          Create New Result Shit
        </button>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Result Shit..</h2>
        ) : (
          resultShitList?.map((item) => (
            <ResultShitItem
              key={item?.resultShitId}
              resultShit={item}
              handleDeleteResultShit={handleDeleteResultShitModal}
              handleUpdateResultShit={handleEditResultShitModal}
            />
          ))
        )}
      </div>
      <CreateResultShitModal
        open={addResultShitModal}
        setOpen={setAddResultShitModal}
      />
      {deleteResultShitLoading && selectedResultShit?.resultShitId && (
        <ActionModal
          open={deleteResultShitModal}
          setOpen={setDeleteResultShitModal}
          actionHandler={() => deleteResultShit()}
          title="Delete Result Shit"
          message="Are Your Sure You Want to Delete This Shit?"
          actionLoading={deleteResultShitLoading}
          actionLoadingText="Deleting.."
        />
      )}
      {editResultShitModal && selectedResultShit?.resultShitId && (
        <CreateResultShitModal
          open={editResultShitModal}
          setOpen={setEditResultShitModal}
          edit={true}
          resultShit={selectedResultShit}
        />
      )}
    </div>
  );
};

export default Result;
