import { NavLink, useLocation, useMatch } from "react-router-dom";
const menues: any[] = [
  {
    name: "Home",
    link: "/admin",
  },
  {
    name: "Class",
    link: "/admin/class",
  },
  {
    name: "Batch",
    link: "/admin/batch",
  },
  {
    name: "Students",
    link: "/admin/students",
  },
  {
    name: "Teachers",
    link: "/admin/teachers",
  },
  {
    name: "Notice",
    link: "/admin/notice",
  },
  {
    name: "Manage Slider",
    link: "/admin/slider",
  },
  {
    name: "Result",
    link: "/admin/result",
  },
  {
    name: "Activity Management",
    link: "/admin/activity-management",
  },
];

const activeStyle = {
  background: "red",
};

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location?.pathname === path;
  };
  return (
    <div className="flex-[1] dark:bg-slate-800 bg-white  rounded-md shadow-lg">
      {menues?.map((menu, index) => (
        <NavLink to={menu?.link} key={index}>
          <div
            className={`p-4 hover:bg-slate-400 ${
              isActive(menu?.link) && "bg-slate-400"
            }`}
          >
            <h2 className="text-black dark:text-white">{menu?.name}</h2>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
