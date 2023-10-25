import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "../firebase";
import { WrapperProvider } from "./context/DataWrapper";
import ActivityManagement from "./pages/ActivityManagement";
import BatchPage from "./pages/BatchPage";
import ClassPage from "./pages/ClassPage";
import EditShitResult from "./pages/EditShitResult";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import OnlineAdmit from "./pages/OnlineAdmit";
import Result from "./pages/Result";
import SliderPage from "./pages/SliderPage";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import AboutOurSelf from "./pages/user-page/AboutOurself";
import AttendanceReport from "./pages/user-page/AttendanceReport";
import ContactUs from "./pages/user-page/ContactUs";
import OnlineAdminPage from "./pages/user-page/OnlineAdmitPage";
import ResultPage from "./pages/user-page/ResultPage";
import UserActivity from "./pages/user-page/UserActivity";
import UserHome from "./pages/user-page/UserHome";
import UserNoticePage from "./pages/user-page/UserNoticePage";
import UserStudentResult from "./pages/user-page/UserStudentResult";
import UserTeachersPage from "./pages/user-page/UserTeachersPage";
function App() {
  console.log("App");
  return (
    <WrapperProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<Home />}>
            <Route path="notice" element={<Notice />} />
            <Route path="result" element={<Result />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="batch" element={<BatchPage />} />
            <Route path="class" element={<ClassPage />} />
            <Route path="slider" element={<SliderPage />} />
            <Route path="online-admit" element={<OnlineAdmit />} />
            <Route
              path="activity-management"
              element={<ActivityManagement />}
            />
            <Route path="result/shit/:shitId" element={<EditShitResult />} />
          </Route>
          <Route path="/" element={<UserHome />}>
            <Route path="notice" element={<UserNoticePage />} />
            <Route path="online-admin" element={<OnlineAdminPage />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="about-us" element={<AboutOurSelf />} />
            <Route path="teachers" element={<UserTeachersPage />} />
            <Route path="activity" element={<UserActivity />} />
            <Route path="attendance" element={<AttendanceReport />} />
            <Route path="result" element={<ResultPage />} />
            <Route path="result/shit/:shitId" element={<UserStudentResult />} />
          </Route>
        </Routes>
      </Router>
    </WrapperProvider>
  );
}

export default App;
