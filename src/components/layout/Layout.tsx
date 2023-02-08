import GlassBg from "../utill/GlassBg";
import Header from "./Header";
const Layout = ({ children }: any) => {
  return (
    <>
      <div className="isolate dark:bg-slate-800 overflow-hidden">
        <GlassBg />
        <Header />
        <main
          className=" p-4 overflow-hidden"
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

export default Layout;
