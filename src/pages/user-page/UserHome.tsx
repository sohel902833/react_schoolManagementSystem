import { Outlet, useLocation } from "react-router-dom";
import UserLayout from "../../components/layout/UserLayout";
import LandingPage from "../../components/user-home/LandingPage";

const UserHome = () => {
  const location = useLocation();
  return (
    <>
      <UserLayout>
        {location?.pathname === "/" && <LandingPage />}
        <Outlet />
      </UserLayout>
    </>
  );
};

export default UserHome;
