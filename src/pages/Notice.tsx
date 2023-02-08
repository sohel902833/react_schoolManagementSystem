import { useState } from "react";
import CreateNoticeModal from "../components/notice/CreateNoticeModal";
import NoticeItem from "../components/notice/NoticeItem";
import { useWrapper } from "../context/DataWrapper";
const Notice = () => {
  const [addNoticeModal, setAddNoticeModal] = useState(false);
  const { loading, noticeList } = useWrapper();

  const handleAddNoticeModal = () => {
    setAddNoticeModal((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Notice
        </h2>
        <button
          onClick={handleAddNoticeModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-sm hover:bg-purple-800"
        >
          Add New Notice
        </button>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        {loading ? (
          <h2>Loading Notice..</h2>
        ) : (
          noticeList?.map((item) => (
            <NoticeItem key={item?.noticeId} notice={item} />
          ))
        )}
      </div>
      <CreateNoticeModal open={addNoticeModal} setOpen={setAddNoticeModal} />
    </div>
  );
};

export default Notice;
