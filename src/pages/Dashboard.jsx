import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { supabase } from "../lib/supabaseClient";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [evaluationData, setEvaluationData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);

    try {
      // ==============================
      // USER
      // ==============================

      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);

      // ==============================
      // COURSES
      // ==============================

      const { data: courseData, error: courseError } =
        await supabase
          .from("courses")
          .select("*")
          .order("id");

      if (courseError) {
        console.error(courseError);
      } else {
        setCourses(courseData || []);
      }

      // ==============================
      // COURSE PROGRESS
      // ==============================

      const {
        data: progress,
        error: progressError,
      } = await supabase
        .from("course_progress")
        .select(
          "course_id, progress, completed_lessons"
        )
        .eq("user_id", currentUser.id);

      if (progressError) {
        console.error(progressError);
      } else {
        setProgressData(progress || []);
      }

      // ==============================
      // EVALUATIONS
      // ==============================

      const {
        data: evaluations,
        error: evaluationError,
      } = await supabase
        .from("course_evaluations")
        .select(
          "course_id, score, passed, completed_at"
        )
        .eq("user_id", currentUser.id);

      if (evaluationError) {
        console.error(evaluationError);
      } else {
        setEvaluationData(evaluations || []);
      }

    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // HELPERS
  // ==============================

  const getProgress = (courseId) => {
    const item = progressData.find(
      (progress) =>
        progress.course_id === courseId
    );

    return item?.progress || 0;
  };

  const getEvaluation = (courseId) => {
    return evaluationData.find(
      (evaluation) =>
        evaluation.course_id === courseId
    );
  };

  const completedCourses = evaluationData.filter(
    (evaluation) => evaluation.passed
  ).length;

  const averageScore =
    evaluationData.length > 0
      ? Math.round(
          evaluationData.reduce(
            (total, evaluation) =>
              total + evaluation.score,
            0
          ) / evaluationData.length
        )
      : 0;

  const totalProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (total, course) =>
              total + getProgress(course.id),
            0
          ) / courses.length
        )
      : 0;

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          Memuat dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* ==============================
          HEADER
      ============================== */}

      <header className="dashboard-header">

        <button
          className="dashboard-logo"
          onClick={() => navigate("/dashboard")}
        >
          Courvia
        </button>

        <nav className="dashboard-nav">

          <button
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/course")}
          >
            Course
          </button>

          <button
            onClick={() => navigate("/webinar")}
          >
            Webinar
          </button>

          <button
            onClick={() => navigate("/skill")}
          >
            Skill
          </button>

        </nav>

        <button
          className="dashboard-profile-button"
          onClick={() => navigate("/profile")}
        >
          {userName}
        </button>

      </header>

      {/* ==============================
          MAIN
      ============================== */}

      <main className="dashboard-main">

        <section className="dashboard-welcome">

          <div>
            <span className="dashboard-eyebrow">
              YOUR LEARNING SPACE
            </span>

            <h1>
              Halo, {userName}
            </h1>

            <p>
              Lanjutkan perjalanan belajarmu
              bersama Courvia.
            </p>
          </div>

          <button
            className="dashboard-explore"
            onClick={() => navigate("/course")}
          >
            Jelajahi Course
            <span>→</span>
          </button>

        </section>

        {/* ==============================
            STATISTICS
        ============================== */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <span>
              TOTAL PROGRESS
            </span>

            <strong>
              {totalProgress}%
            </strong>

            <small>
              Progress pembelajaran
            </small>

          </div>

          <div className="dashboard-stat-card">

            <span>
              COURSE SELESAI
            </span>

            <strong>
              {completedCourses}
            </strong>

            <small>
              Course berhasil diselesaikan
            </small>

          </div>

          <div className="dashboard-stat-card">

            <span>
              RATA-RATA NILAI
            </span>

            <strong>
              {averageScore}
            </strong>

            <small>
              Dari evaluasi yang dikerjakan
            </small>

          </div>

        </section>

        {/* ==============================
            COURSE
        ============================== */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <span>
                MY LEARNING
              </span>

              <h2>
                Course Saya
              </h2>
            </div>

            <button
              onClick={() => navigate("/course")}
            >
              Lihat Semua →
            </button>

          </div>

          {courses.length === 0 ? (

            <div className="dashboard-empty">
              <p>
                Belum ada course tersedia.
              </p>
            </div>

          ) : (

            <div className="dashboard-course-grid">

              {courses.map((course) => {

                const progress =
                  getProgress(course.id);

                const evaluation =
                  getEvaluation(course.id);

                return (
                  <article
                    className="dashboard-course-card"
                    key={course.id}
                  >

                    <div className="dashboard-course-top">

                      <span>
                        {course.category}
                      </span>

                      {evaluation?.passed && (
                        <span className="course-completed">
                          ✓ Selesai
                        </span>
                      )}

                    </div>

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.description}
                    </p>

                    <div className="dashboard-course-progress">

                      <div className="progress-info">

                        <span>
                          Progress
                        </span>

                        <strong>
                          {progress}%
                        </strong>

                      </div>

                      <div className="progress-track">

                        <div
                          className="progress-fill"
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {evaluation && (
                      <div className="dashboard-course-score">

                        <span>
                          Nilai evaluasi
                        </span>

                        <strong>
                          {evaluation.score}/100
                        </strong>

                      </div>
                    )}

                    <button
                      onClick={() =>
                        navigate(
                          `/course/${course.id}`
                        )
                      }
                    >
                      {progress > 0
                        ? "Lanjutkan Belajar"
                        : "Mulai Belajar"}

                      <span>
                        →
                      </span>

                    </button>

                  </article>
                );
              })}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;