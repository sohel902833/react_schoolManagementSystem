import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useWrapper } from "../../context/DataWrapper";
const SocialLinks = () => {
  const { basicInfo } = useWrapper();

  const { facebookLink, youtubeLink, linkedinLink } = basicInfo || {};

  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 shadow-md rounded-md py-4 cursor-pointer">
      <h2 className="bg-blue-500 dark:bg-slate-900 text-white px-4 py-2 font-bold">
        Social Links
      </h2>
      <a
        className=""
        href={facebookLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-2 mt-2 pl-2 py-2 hover:text-blue-600 hover:bg-blue-400 dark:hover:bg-slate-900/50 ">
          <ArrowTopRightOnSquareIcon className="h-6 w-6 dark:text-white" />
          <h1 className="dark:text-white">Facebook</h1>
        </div>
      </a>
      <a
        className=""
        href={youtubeLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-2 mt-2 pl-2 py-2 hover:text-blue-600 hover:bg-blue-400 dark:hover:bg-slate-900/50 ">
          <ArrowTopRightOnSquareIcon className="h-6 w-6 dark:text-white" />
          <h1 className="dark:text-white">Youtube</h1>
        </div>
      </a>
      <a className="" href={linkedinLink}>
        <div className="flex items-center gap-2 mt-2 pl-2 py-2 hover:text-blue-600 hover:bg-blue-400 dark:hover:bg-slate-900/50 ">
          <ArrowTopRightOnSquareIcon className="h-6 w-6 dark:text-white" />
          <h1 className="dark:text-white">Linkedin</h1>
        </div>
      </a>
    </div>
  );
};

export default SocialLinks;
