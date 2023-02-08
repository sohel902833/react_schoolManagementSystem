import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { STUDENT_REF_NAME } from "../api/databaseRef";
import CreateStudentModal from "../components/students/CreateStudentModal";
import StudentItem from "../components/students/StudentItem";
import ActionModal from "../components/utill/ActionModal";
import { useWrapper } from "../context/DataWrapper";
import { IStudent } from "../types/student.types";

const Students = () => {
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [editStudentModal, setEditStudentModal] = useState(false);
  const [deleteStudentModal, setDeleteStudentModal] = useState(false);
  const [deleteStudentLoading, setDeleteStudentLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const { loading, studentList } = useWrapper();

  const handleEditStudentModal = (student: IStudent, open: boolean) => {
    setSelectedStudent(student);
    setEditStudentModal(open);
  };
  const handleDeleteStudentModal = (student: IStudent, open: boolean) => {
    setSelectedStudent(student);
    setDeleteStudentModal(open);
  };

  const db = getDatabase();

  const deleteStudent = async () => {
    try {
      setDeleteStudentLoading(true);
      await remove(
        ref(db, `${STUDENT_REF_NAME}/${selectedStudent?.studentId}`)
      );
      setDeleteStudentLoading(false);
      setDeleteStudentModal(false);
      toast.success("Student Deleted");
    } catch (er) {
      toast.error("Something Wrong!!");
      setDeleteStudentLoading(false);
      setDeleteStudentModal(false);
    }
  };

  const handleAddStudentModal = () => {
    setAddStudentModal((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Students
        </h2>
        <button
          onClick={handleAddStudentModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-sm hover:bg-purple-800"
        >
          Add New Students
        </button>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Student..</h2>
        ) : (
          studentList?.map((item) => (
            <StudentItem
              key={item?.studentId}
              student={item}
              handleDeleteStudent={handleDeleteStudentModal}
              handleUpdateStudent={handleEditStudentModal}
            />
          ))
        )}
      </div>
      <CreateStudentModal open={addStudentModal} setOpen={setAddStudentModal} />
      {deleteStudentModal && selectedStudent?.studentId && (
        <ActionModal
          open={deleteStudentModal}
          setOpen={setDeleteStudentLoading}
          actionHandler={() => deleteStudent()}
          title="Delete Student"
          message="Are Your Sure You Want to Delete This Student?"
          actionLoading={deleteStudentLoading}
          actionLoadingText="Deleting.."
        />
      )}
      {editStudentModal && selectedStudent?.studentId && (
        <CreateStudentModal
          open={editStudentModal}
          setOpen={setEditStudentModal}
          edit={true}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default Students;
