import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { TEACHER_REF_NAME } from "../api/databaseRef";
import CreateTeacherModal from "../components/teacher/CreateTeacherModal";
import TeacherItem from "../components/teacher/TeacherItem";
import ActionModal from "../components/utill/ActionModal";
import { useWrapper } from "../context/DataWrapper";
import { ITeacher } from "../types/student.types";

const Teachers = () => {
  const [addTeacherModal, setAddTeacherModal] = useState(false);
  const { teacherList, loading } = useWrapper();
  const [editTeacherModal, setEditTeacherModal] = useState(false);
  const [deleteTeacherModal, setDeleteTeacherModal] = useState(false);
  const [deleteTeacherLoading, setDeleteTeacherLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);

  const handleEditTeacherModal = (teacher: ITeacher, open: boolean) => {
    setSelectedTeacher(teacher);
    setEditTeacherModal(open);
  };
  const handleDeleteTeacherModal = (teacher: ITeacher, open: boolean) => {
    setSelectedTeacher(teacher);
    setDeleteTeacherModal(open);
  };

  const db = getDatabase();

  const deleteTeacher = async () => {
    try {
      setDeleteTeacherLoading(true);
      await remove(
        ref(db, `${TEACHER_REF_NAME}/${selectedTeacher?.teacherId}`)
      );
      setDeleteTeacherLoading(false);
      setDeleteTeacherModal(false);
      toast.success("Teacher Deleted");
    } catch (er) {
      toast.error("Something Wrong!!");
      setDeleteTeacherLoading(false);
      setDeleteTeacherModal(false);
    }
  };

  const handleAddTeacherModal = () => {
    setAddTeacherModal((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Teachers
        </h2>
        <button
          onClick={handleAddTeacherModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-sm hover:bg-purple-800"
        >
          Add New Teacher
        </button>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Teacher..</h2>
        ) : (
          teacherList?.map((item) => (
            <TeacherItem
              key={item?.teacherId}
              teacher={item}
              handleDeleteTeacherModal={handleDeleteTeacherModal}
              handleEditTeacherModal={handleEditTeacherModal}
            />
          ))
        )}
      </div>
      <CreateTeacherModal open={addTeacherModal} setOpen={setAddTeacherModal} />
      {deleteTeacherModal && selectedTeacher?.teacherId && (
        <ActionModal
          open={deleteTeacherModal}
          setOpen={setDeleteTeacherModal}
          actionHandler={() => deleteTeacher()}
          title="Delete Teacher"
          message="Are Your Sure You Want to Delete This Teacher?"
          actionLoading={deleteTeacherLoading}
          actionLoadingText="Deleting.."
        />
      )}
      {editTeacherModal && selectedTeacher?.teacherId && (
        <CreateTeacherModal
          open={editTeacherModal}
          setOpen={setEditTeacherModal}
          edit={true}
          teacher={selectedTeacher}
        />
      )}
    </div>
  );
};

export default Teachers;
