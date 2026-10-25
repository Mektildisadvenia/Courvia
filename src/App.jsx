import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";

import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import GuestRoute from "./auth/GuestRoute";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Certificates from "./pages/Certificates";

import Webinar from "./pages/Webinar";
import WebinarDetail from "./pages/WebinarDetail";
import WebinarRoom from "./pages/WebinarRoom";
import WebinarCertificate from "./pages/WebinarCertificate";
import WebinarSession from "./pages/WebinarSession";
import MyWebinar from "./pages/MyWebinar";

import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import Learning from "./pages/Learning";
import Evaluation from "./pages/Evaluation";
import Certificate from "./pages/Certificate";

import SkillDevelopment from "./pages/SkillDevelopment";
import SkillPractice from "./pages/SkillPractice";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LANDING ================= */}

        <Route
          path="/"
          element={<Landing />}
        />

        {/* ================= AUTH ================= */}

        <Route element={<GuestRoute />}>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        {/* =================================================
            PROTECTED PAGES
        ================================================= */}

        <Route element={<ProtectedRoute />}>

          {/* ================= DASHBOARD ================= */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* ================= PROFILE ================= */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/certificates"
            element={<Certificates />}
          />

          {/* ================= WEBINAR ================= */}

          <Route
            path="/webinar"
            element={<Webinar />}
          />

          <Route
            path="/webinar/:id"
            element={<WebinarDetail />}
          />

          <Route
            path="/webinar/:id/join"
            element={<WebinarRoom />}
          />

          <Route
            path="/webinar/:id/session"
            element={<WebinarSession />}
          />

          <Route
            path="/webinar/:id/certificate"
            element={<WebinarCertificate />}
          />

          <Route
            path="/my-webinar"
            element={<MyWebinar />}
          />

          {/* ================= COURSE ================= */}

          <Route
            path="/course"
            element={<Course />}
          />

          <Route
            path="/course/:id"
            element={<CourseDetail />}
          />

          <Route
            path="/course/:id/learn"
            element={<Learning />}
          />

          <Route
            path="/course/:id/evaluation"
            element={<Evaluation />}
          />

          <Route
            path="/course/:id/certificate"
            element={<Certificate />}
          />

          {/* ================= SKILL DEVELOPMENT ================= */}

          <Route
            path="/skill"
            element={<SkillDevelopment />}
          />

          <Route
            path="/skill/practice/:id"
            element={<SkillPractice />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;