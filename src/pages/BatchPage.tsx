import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { BATCH_REF_NAME } from "../api/databaseRef";
import BatchItem from "../components/batch/BatchItem";
import CreateBatchModal from "../components/batch/CreateBatchModal";
import ActionModal from "../components/utill/ActionModal";
import { useWrapper } from "../context/DataWrapper";
import { IBatch } from "../types/batch.types";
const BatchPage = () => {
  const [addNewBatchModal, setAddNewBatchModal] = useState(false);
  const { batchList, loading } = useWrapper();
  const [deleteBatchModal, setDeleteBatchModal] = useState(false);
  const [editBatchModal, setEditBatchModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<IBatch | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const db = getDatabase();

  const deleteBatch = async () => {
    try {
      setDeleteLoading(true);
      await remove(ref(db, `${BATCH_REF_NAME}/${selectedBatch?.batchId}`));
      setDeleteLoading(false);
      setDeleteBatchModal(false);
      toast.success("Class Deleted");
    } catch (er) {
      toast.error("Something Wrong!!");
      setDeleteLoading(false);
      setDeleteBatchModal(false);
    }
  };
  const handleCreateBatchModal = () => {
    setAddNewBatchModal((prev) => !prev);
  };
  const handleDeleteBatch = (batch: IBatch, open: boolean) => {
    setDeleteBatchModal(open);
    setSelectedBatch(batch);
  };
  const handleUpdateBatch = (batch: IBatch, open: boolean) => {
    setEditBatchModal(open);
    setSelectedBatch(batch);
  };

  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Batch List
        </h2>
        <button
          onClick={handleCreateBatchModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-sm hover:bg-purple-800"
        >
          Add New Batch
        </button>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Batch...</h2>
        ) : (
          batchList?.map((item) => (
            <BatchItem
              key={item?.batchId}
              batch={item}
              handleDeleteBatch={handleDeleteBatch}
              handleUpdateBatch={handleUpdateBatch}
            />
          ))
        )}
      </div>
      <CreateBatchModal open={addNewBatchModal} setOpen={setAddNewBatchModal} />
      {deleteBatchModal && selectedBatch?.batchId && (
        <ActionModal
          open={deleteBatchModal}
          setOpen={setDeleteBatchModal}
          actionHandler={() => deleteBatch()}
          title="Delete Batch"
          message="Are Your Sure You Want to Delete This Batch?"
          actionLoading={deleteLoading}
          actionLoadingText="Deleting.."
        />
      )}
      {editBatchModal && selectedBatch?.batchId && (
        <CreateBatchModal
          open={editBatchModal}
          setOpen={setEditBatchModal}
          edit={true}
          batch={selectedBatch}
        />
      )}
    </div>
  );
};

export default BatchPage;
