import GlassBg from "../utill/GlassBg";
import UserHeader from "./UserHeader";
const UserLayout = ({ children }: any) => {
  return (
    <>
      <div className="isolate dark:bg-slate-800 overflow-hidden">
        <GlassBg />
        <UserHeader />
        <main
          className=" p-4 overflow-auto max-w-7xl mx-auto"
          style={{
            height: "calc(100vh - 100px)",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default UserLayout;
