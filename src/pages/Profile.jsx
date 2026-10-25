import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  LogOut,
  Trophy,
  Video,
  Zap,
} from "lucide-react";

import {
  logoutUser,
  useAuthSession,
} from "../auth/userSession";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  // ================= USER =================

  const { user } = useAuthSession();

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Learner";

  const userEmail =
    user?.email || "No email available";

  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // ================= STATE =================

  const [skillXP, setSkillXP] = useState(0);
  const [webinarXP, setWebinarXP] = useState(0);
  const [practiceCount, setPracticeCount] =
    useState(0);
  const [webinarCount, setWebinarCount] =
    useState(0);
  const [logoutError, setLogoutError] = useState("");

  // ================= LOAD DATA =================

  useEffect(() => {
    const savedSkillXP =
      Number(
        localStorage.getItem(
          "courvia_xp_coding"
        )
      ) || 0;

    const savedWebinarXP =
      Number(
        localStorage.getItem(
          "courvia_xp_webinar"
        )
      ) || 0;

    const savedTasks =
      localStorage.getItem(
        "courvia_tasks_coding"
      );

    setSkillXP(savedSkillXP);
    setWebinarXP(savedWebinarXP);

    // ================= PRACTICE =================

    if (savedTasks) {
      try {
        const tasks =
          JSON.parse(savedTasks);

        setPracticeCount(
          tasks.filter(
            (task) => task.completed
          ).length
        );
      } catch (error) {
        console.error(
          "Gagal membaca practice:",
          error
        );
      }
    }

    // ================= WEBINAR =================

    let completed = 0;

    [1, 2, 3].forEach((id) => {
      const certificate =
        localStorage.getItem(
          `courvia_webinar_certificate_${id}`
        );

      if (certificate) {
        completed++;
      }
    });

    setWebinarCount(completed);
  }, []);

  // ================= CALCULATION =================

  const totalXP =
    skillXP + webinarXP;

  // ================= LOGOUT =================

  const handleLogout = async () => {
    setLogoutError("");

    try {
      const { error } = await logoutUser();

      if (error) {
        throw error;
      }

      navigate("/login");
    } catch (error) {
      console.error("Gagal logout dari Supabase:", error);
      setLogoutError("Logout gagal. Silakan coba lagi.");
    }
  };

  // ================= RENDER =================

  return (
    <div className="profile-page">

      {/* ================= NAVBAR ================= */}

      <nav className="profile-navbar">

        <button
          className="profile-logo"
          onClick={() => navigate("/")}
        >
          Courvia
        </button>

        <div className="profile-nav-links">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/course")
            }
          >
            Course
          </button>

          <button
            onClick={() =>
              navigate("/webinar")
            }
          >
            Webinar
          </button>

          <button
            onClick={() =>
              navigate("/skill")
            }
          >
            Skill Development
          </button>

        </div>

        {/* USER AVATAR */}

        <button
          className="profile-avatar"
          onClick={() =>
            navigate("/profile")
          }
          title={`Profile ${userName}`}
        >
          {userInitials}
        </button>

      </nav>

      {/* ================= MAIN ================= */}

      <main className="profile-main">

        {/* ================= BACK ================= */}

        <button
          className="profile-back"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        {/* ================= PROFILE HEADER ================= */}

        <section className="profile-header">

          <div className="profile-avatar-large">
            {userInitials}
          </div>

          <div className="profile-header-content">

            <span>
              COURVIA LEARNER
            </span>

            <h1>
              {userName}
              <br />
              <em>learner.</em>
            </h1>

            <p>
              Keep learning, keep practicing,
              and keep growing.
            </p>

            {/* USER EMAIL */}

            <div className="profile-email">
              {userEmail}
            </div>

          </div>

          <div className="profile-level">

            <Zap size={18} />

            <span>
              CURRENT XP
            </span>

            <strong>
              {totalXP}
            </strong>

            <small>
              XP collected
            </small>

          </div>

        </section>

        {/* ================= STATISTICS ================= */}

        <section className="profile-stats">

          {/* TOTAL XP */}

          <div className="profile-stat">

            <div className="profile-stat-icon">
              <Trophy size={20} />
            </div>

            <span>
              TOTAL XP
            </span>

            <strong>
              {totalXP}
            </strong>

            <small>
              All activities
            </small>

          </div>

          {/* SKILL XP */}

          <div className="profile-stat">

            <div className="profile-stat-icon">
              <BookOpen size={20} />
            </div>

            <span>
              SKILL XP
            </span>

            <strong>
              {skillXP}
            </strong>

            <small>
              Skill practice
            </small>

          </div>

          {/* WEBINAR XP */}

          <div className="profile-stat">

            <div className="profile-stat-icon">
              <Video size={20} />
            </div>

            <span>
              WEBINAR XP
            </span>

            <strong>
              {webinarXP}
            </strong>

            <small>
              Webinar participation
            </small>

          </div>

          {/* PRACTICE */}

          <div className="profile-stat">

            <div className="profile-stat-icon">
              <CheckCircle2 size={20} />
            </div>

            <span>
              PRACTICE
            </span>

            <strong>
              {practiceCount}
            </strong>

            <small>
              Completed practice
            </small>

          </div>

        </section>

        {/* ================= LEARNING OVERVIEW ================= */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <span>
                01 · LEARNING OVERVIEW
              </span>

              <h2>
                Your learning
                <br />
                <em>journey.</em>
              </h2>

            </div>

          </div>

          <div className="learning-overview-grid">

            {/* COURSE */}

            <div className="overview-card">

              <div className="overview-card-top">

                <div className="overview-icon">
                  <BookOpen size={21} />
                </div>

                <span>
                  COURSE
                </span>

              </div>

              <h3>
                Web Development
                Fundamentals
              </h3>

              <p>
                Progress belajar kamu
                saat ini.
              </p>

              <div className="overview-progress">

                <div>

                  <span>
                    PROGRESS
                  </span>

                  <strong>
                    35%
                  </strong>

                </div>

                <div className="overview-progress-bar">

                  <div
                    style={{
                      width: "35%",
                    }}
                  />

                </div>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/course/1/learn"
                  )
                }
              >
                Continue Learning
                <span>
                  →
                </span>
              </button>

            </div>

            {/* WEBINAR */}

            <div className="overview-card">

              <div className="overview-card-top">

                <div className="overview-icon coral">
                  <Video size={21} />
                </div>

                <span>
                  WEBINAR
                </span>

              </div>

              <h3>
                {webinarCount} Webinar
                Completed
              </h3>

              <p>
                Webinar yang sudah
                berhasil kamu selesaikan.
              </p>

              <div className="overview-number">

                <strong>
                  {webinarXP}
                </strong>

                <span>
                  XP earned
                </span>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/my-webinar"
                  )
                }
              >
                View My Webinars
                <span>
                  →
                </span>
              </button>

            </div>

          </div>

        </section>

        {/* ================= ACHIEVEMENTS ================= */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <span>
                02 · ACHIEVEMENTS
              </span>

              <h2>
                What you've
                <br />
                <em>earned.</em>
              </h2>

            </div>

          </div>

          <div className="achievement-grid">

            {/* WEBINAR ACHIEVEMENT */}

            <div
              className={
                webinarCount > 0
                  ? "achievement-card unlocked"
                  : "achievement-card"
              }
            >

              <div className="achievement-icon">
                <Award size={23} />
              </div>

              <div>

                <span>
                  WEBINAR ACHIEVEMENT
                </span>

                <h3>
                  Verified Learner
                </h3>

                <p>
                  {webinarCount > 0
                    ? "Kamu sudah mendapatkan sertifikat webinar."
                    : "Selesaikan webinar untuk membuka achievement ini."}
                </p>

              </div>

              {webinarCount > 0 && (
                <CheckCircle2
                  className="achievement-check"
                  size={20}
                />
              )}

            </div>

            {/* SKILL ACHIEVEMENT */}

            <div
              className={
                practiceCount > 0
                  ? "achievement-card unlocked"
                  : "achievement-card"
              }
            >

              <div className="achievement-icon blue">
                <Zap size={23} />
              </div>

              <div>

                <span>
                  SKILL ACHIEVEMENT
                </span>

                <h3>
                  Practice Starter
                </h3>

                <p>
                  {practiceCount > 0
                    ? "Kamu sudah menyelesaikan practice pertamamu."
                    : "Selesaikan skill practice untuk membuka achievement ini."}
                </p>

              </div>

              {practiceCount > 0 && (
                <CheckCircle2
                  className="achievement-check"
                  size={20}
                />
              )}

            </div>

          </div>

        </section>

        {/* ================= ACCOUNT ================= */}

        <section className="profile-account">

          <div>

            <span>
              ACCOUNT
            </span>

            <h2>
              Keep your
              <br />
              <em>momentum</em>
            </h2>

            <p>
              Setiap course, webinar, dan
              practice yang kamu selesaikan
              akan membantu membangun
              progress belajar di Courvia.
            </p>

            {/* ACCOUNT INFORMATION */}

            <div className="profile-account-info">

              <div>
                <span>
                  NAME
                </span>

                <strong>
                  {userName}
                </strong>
              </div>

              <div>
                <span>
                  EMAIL
                </span>

                <strong>
                  {userEmail}
                </strong>
              </div>

            </div>

          </div>

          <div className="profile-account-actions">

            {/* CERTIFICATES */}

            <button
              onClick={() =>
                navigate(
                  "/certificates"
                )
              }
            >
              <Award size={17} />
              My Certificates
            </button>

            {/* LOGOUT */}

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
            {logoutError && (
              <p role="alert" style={{ color: "#c34e38", fontSize: "13px" }}>
                {logoutError}
              </p>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;
