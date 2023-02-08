import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { CLASS_REF_NAME } from "../api/databaseRef";
import ClassItem from "../components/class/ClassItem";
import CreateClassModal from "../components/class/CreateClassModal";
import ActionModal from "../components/utill/ActionModal";
import { useWrapper } from "../context/DataWrapper";
import { IClass } from "../types/class.types";
const ClassPage = () => {
  const [addNewClassModal, setAddNewClassModal] = useState(false);
  const { loading, classList } = useWrapper();
  const [deleteClassModal, setDeleteClassModal] = useState(false);
  const [editClassModal, setEditClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<IClass | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const db = getDatabase();

  const deleteClass = async () => {
    try {
      setDeleteLoading(true);
      await remove(ref(db, `${CLASS_REF_NAME}/${selectedClass?.classId}`));
      setDeleteLoading(false);
      setDeleteClassModal(false);
      toast.success("Class Deleted");
    } catch (er) {
      toast.error("Something Wrong!!");
      setDeleteLoading(false);
      setDeleteClassModal(false);
    }
  };

  const handleDeleteClass = (classItem: IClass, open: boolean) => {
    setSelectedClass(classItem);
    setDeleteClassModal(open);
  };
  const handleUpdateClass = (classItem: IClass, open: boolean) => {
    setSelectedClass(classItem);
    setEditClassModal(open);
  };

  const handleCreateClassModal = () => {
    setAddNewClassModal((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Class List
        </h2>
        <button
          onClick={handleCreateClassModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-sm hover:bg-purple-800"
        >
          Add New Class
        </button>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Classes..</h2>
        ) : (
          classList?.map((item) => (
            <ClassItem
              key={item?.classId}
              classItem={item}
              handleDeleteClass={handleDeleteClass}
              handleUpdateClass={handleUpdateClass}
            />
          ))
        )}
      </div>
      <CreateClassModal open={addNewClassModal} setOpen={setAddNewClassModal} />
      {deleteClassModal && selectedClass?.classId && (
        <ActionModal
          open={deleteClassModal}
          setOpen={setDeleteClassModal}
          actionHandler={() => deleteClass()}
          title="Delete Class"
          message="Are Your Sure You Want to Delete This Class?"
          actionLoading={deleteLoading}
          actionLoadingText="Deleting.."
        />
      )}
      {editClassModal && selectedClass?.classId && (
        <CreateClassModal
          open={editClassModal}
          setOpen={setEditClassModal}
          edit={true}
          classItem={selectedClass}
        />
      )}
    </div>
  );
};

export default ClassPage;
