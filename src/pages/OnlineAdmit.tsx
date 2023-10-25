import AdmitRequestItem from "../components/online-admit/AdmitRequestItem";
import { useWrapper } from "../context/DataWrapper";

const OnlineAdmit = () => {
  const { onlineAdmitList, loading } = useWrapper();

  console.log("List", onlineAdmitList);
  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Admit Request
        </h2>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Requests..</h2>
        ) : (
          onlineAdmitList?.map((item) => (
            <AdmitRequestItem key={item?.admitId} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default OnlineAdmit;
