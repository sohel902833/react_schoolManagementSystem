import { IActivity } from "../../types/user.types";
import VideoPlayer from "./VideoPlayer";
interface Props {
  activity: IActivity;
}
const UserActivityItem = ({ activity }: Props) => {
  return (
    <div className="dark:bg-slate-800 flex flex-col gap-2  grow  rounded-md p-4 basis-[400px] relative shadow-lg bg-white">
      {activity?.type === "image" ? (
        <img src={activity?.link} className="w-full h-[200px] object-cover" />
      ) : (
        <VideoPlayer video={activity} />
      )}
      <h2 className="dark:text-white text-2xl font-semibold">
        {activity?.title}
      </h2>
    </div>
  );
};

export default UserActivityItem;
