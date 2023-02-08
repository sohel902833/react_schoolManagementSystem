import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { ACTIVITY_REF_NAME } from "../api/databaseRef";
import ActivityItem from "../components/activities/ActivityItem";
import CreateActivityModal from "../components/activities/CreateActivityModal";
import ActionModal from "../components/utill/ActionModal";
import { useWrapper } from "../context/DataWrapper";
import { IActivity } from "../types/user.types";

const ActivityManagement = () => {
  const [addNewActivityModal, setNewActivityModal] = useState(false);
  const { activityList, loading } = useWrapper();
  const [editActivityModal, setEditActivityModal] = useState(false);
  const [deleteActivityModal, setDeleteActivityModal] = useState(false);
  const [deleteActivityLoading, setDeleteActivityLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const handleEditActivityModal = (activity: IActivity, open: boolean) => {
    setSelectedActivity(activity);
    setEditActivityModal(open);
  };
  const handleDeleteTeacherModal = (activity: IActivity, open: boolean) => {
    setSelectedActivity(activity);
    setDeleteActivityModal(open);
  };

  const db = getDatabase();

  const deleteActivity = async () => {
    try {
      setDeleteActivityLoading(true);
      await remove(
        ref(db, `${ACTIVITY_REF_NAME}/${selectedActivity?.activityId}`)
      );
      setDeleteActivityLoading(false);
      setDeleteActivityModal(false);
      toast.success("Activity Deleted");
    } catch (er) {
      toast.error("Something Wrong!!");
      setDeleteActivityLoading(false);
      setDeleteActivityModal(false);
    }
  };

  const handleAddActivityModal = () => {
    setNewActivityModal((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Activity Management
        </h2>
        <button
          onClick={handleAddActivityModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-sm hover:bg-purple-800"
        >
          Add New Activity
        </button>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Activity..</h2>
        ) : (
          activityList?.map((item) => (
            <ActivityItem
              key={item?.activityId}
              activity={item}
              handleDeleteActivity={handleDeleteTeacherModal}
              handleUpdateActivity={handleEditActivityModal}
            />
          ))
        )}
      </div>
      <CreateActivityModal
        open={addNewActivityModal}
        setOpen={setNewActivityModal}
      />
      {deleteActivityModal && selectedActivity?.activityId && (
        <ActionModal
          open={deleteActivityModal}
          setOpen={setDeleteActivityModal}
          actionHandler={() => deleteActivity()}
          title="Delete Activity"
          message="Are Your Sure You Want to Delete This Activity?"
          actionLoading={deleteActivityLoading}
          actionLoadingText="Deleting.."
        />
      )}
      {editActivityModal && selectedActivity?.activityId && (
        <CreateActivityModal
          open={editActivityModal}
          setOpen={setEditActivityModal}
          edit={true}
          activity={selectedActivity}
        />
      )}
    </div>
  );
};

export default ActivityManagement;
