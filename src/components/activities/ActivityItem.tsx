import { IActivity } from "../../types/user.types";
import VideoPlayer from "./VideoPlayer";
interface Props {
  activity: IActivity;
  handleDeleteActivity: (activity: IActivity, open: boolean) => void;
  handleUpdateActivity: (activity: IActivity, open: boolean) => void;
}
const ActivityItem = ({
  activity,
  handleDeleteActivity,
  handleUpdateActivity,
}: Props) => {
  return (
    <div className="dark:bg-slate-800 flex flex-col gap-2  grow  rounded-md p-4 basis-[400px] relative shadow-lg bg-white">
      {activity?.type === "image" && activity?.images && (
        <img
          src={activity?.images[0]}
          className="w-full h-[200px] object-cover"
        />
      )}
      {activity?.link && activity?.type === "video" && (
        <VideoPlayer video={activity} />
      )}
      <h2 className="dark:text-white text-2xl font-semibold">
        {activity?.title}
      </h2>
      <div className="flex items-center justify-end gap-2 mt-2">
        <button
          onClick={() => handleDeleteActivity(activity, true)}
          className="bg-red-600 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-red-500"
        >
          Delete
        </button>
        <button
          onClick={() => handleUpdateActivity(activity, true)}
          className="bg-purple-800 px-7 py-2 rounded-md text-slate-50 font-extrabold hover:bg-purple-500 "
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ActivityItem;
