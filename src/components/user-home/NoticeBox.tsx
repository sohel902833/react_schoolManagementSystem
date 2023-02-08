import { Link } from "react-router-dom";
import { useWrapper } from "../../context/DataWrapper";

const NoticeBox = () => {
  const { noticeList } = useWrapper();

  return (
    <div className="border-2 border-blue-600 p-4 rounded-md bg-white dark:bg-slate-800 shadow-2xl">
      <h2 className="font-bold text-xl dark:text-white">Notice Board</h2>
      <ul className="list-[circle] ml-5 flex flex-col gap-3 mt-2">
        {noticeList?.slice(0, 5).map((item) => (
          <li
            key={item?.noticeId}
            className="hover:cursor-pointer hover:text-blue-600 dark:text-white"
          >
            {item?.description}
          </li>
        ))}
      </ul>
      <Link to="/notice">
        <button className="font-bold mt-10 bg-purple-500 rounded-lg text-white px-4 py-2">
          View All
        </button>
      </Link>
    </div>
  );
};

export default NoticeBox;
