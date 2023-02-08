import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/home/Sidebar";
import Layout from "../components/layout/Layout";
import BasicInfo from "./BasicInfo";

const Home = () => {
  const location = useLocation();
  return (
    <Layout>
      <div className="flex gap-2 h-full">
        <Sidebar />
        <div className="flex-[6]">
          {location?.pathname === "/admin" && <BasicInfo />}
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
