import { useEffect, useState } from "react";
import { BsMoon, BsFillSunFill } from "react-icons/bs";
import { useWrapper } from "../../context/DataWrapper";
const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { basicInfo } = useWrapper();
  const toggleDarkMode = () => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  return (
    <div className="dark:bg-slate-700 flex py-2 xs:px-5 px-20 justify-between items-center bg-white shadow-lg">
      <div>
        <h2 className="text-lg font-medium dark:text-white">
          Admin Panel Of {basicInfo?.instituteName}
        </h2>
      </div>
      <div>
        <button
          onClick={toggleDarkMode}
          className="p-4 rounded-full ring-2 ring-slate-800 dark:hover:bg-slate-600"
        >
          {theme === "dark" ? (
            <BsFillSunFill
              size={20}
              color={theme === "dark" ? "white" : "black"}
            />
          ) : (
            <BsMoon size={20} color={theme === "dark" ? "white" : "black"} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
