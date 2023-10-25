import avatarImg from "../../assets/avatar.svg";
import { IOnlineAdmit } from "../../types/user.types";
interface Props {
  item: IOnlineAdmit;
}
const AdmitRequestItem = ({ item }: Props) => {
  return (
    <div className="flex flex-col gap-2  grow  rounded-md p-4 basis-80 relative shadow-lg bg-white dark:bg-slate-800">
      <img src={avatarImg} className="w-full h-[200px] object-cover" />
      <h2 className="text-2xl font-semibold dark:text-white">
        Name: {item?.name}
      </h2>
      <h2 className="text-xl  dark:text-white">Phone: {item?.phone}</h2>
      <h2 className="text-xl  dark:text-white">
        Class : {item?.className},Age: {item?.age}
      </h2>
      <h2 className="text-xl  dark:text-white">Email: {item?.email}</h2>
    </div>
  );
};

export default AdmitRequestItem;
