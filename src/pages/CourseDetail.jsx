import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./CourseDetail.css";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourseDetail() {
      setLoading(true);
      setError("");

      const {
        data: courseData,
        error: courseError,
      } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (courseError) {
        console.error(
          "Gagal mengambil detail course:",
          courseError
        );

        setError("Course tidak ditemukan.");
        setLoading(false);
        return;
      }

      setCourse(courseData);

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser();

      if (user) {
        const {
          data: progressData,
          error: progressError,
        } = await supabase
          .from("course_progress")
          .select("progress")
          .eq("user_id", user.id)
          .eq("course_id", id)
          .maybeSingle();

        if (progressError) {
          console.error(
            "Gagal mengambil progress:",
            progressError
          );
        }

        if (progressData) {
          setProgress(progressData.progress || 0);
        } else {
          setProgress(0);
        }
      }

      setLoading(false);
    }

    fetchCourseDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="course-detail-page">

        <nav className="detail-navbar">

          <button
            className="detail-logo"
            onClick={() => navigate("/course")}
          >
            Courvia
          </button>

          <button
            className="back-course-button"
            onClick={() => navigate("/course")}
          >
            ← Kembali ke Course
          </button>

        </nav>

        <main>

          <section className="detail-hero">

            <div className="detail-hero-content">

              <h1>
                Memuat course...
              </h1>

              <p>
                Courvia sedang mengambil
                data course.
              </p>

            </div>

          </section>

        </main>

      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-detail-page">

        <nav className="detail-navbar">

          <button
            className="detail-logo"
            onClick={() => navigate("/course")}
          >
            Courvia
          </button>

        </nav>

        <main>

          <section className="detail-hero">

            <div className="detail-hero-content">

              <h1>
                Course tidak ditemukan.
              </h1>

              <p>
                Course yang kamu pilih
                tidak tersedia.
              </p>

              <button
                className="start-learning-button"
                onClick={() => navigate("/course")}
              >
                Kembali ke Course
                <span>→</span>
              </button>

            </div>

          </section>

        </main>

      </div>
    );
  }

  const courseNumber = String(course.id).padStart(2, "0");

  return (
    <div className="course-detail-page">

      <nav className="detail-navbar">

        <button
          className="detail-logo"
          onClick={() => navigate("/course")}
        >
          Courvia
        </button>

        <button
          className="back-course-button"
          onClick={() => navigate("/course")}
        >
          ← Kembali ke Course
        </button>

      </nav>

      <main>

        {/* ================= HERO ================= */}

        <section className="detail-hero">

          <div className="detail-hero-content">

            <div className="detail-category">
              {course.category}
            </div>

            <div className="detail-number">
              {courseNumber}
            </div>

            <h1>
              {course.title}
            </h1>

            <p>
              {course.description}
            </p>

            <button
              className="start-learning-button"
              onClick={() =>
                navigate(`/course/${id}/learn`)
              }
            >
              {progress > 0
                ? "Lanjutkan Belajar"
                : "Mulai Belajar"}

              <span>
                →
              </span>
            </button>

          </div>

          {/* ================= PROGRESS ================= */}

          <div className="detail-progress-card">

            <span className="progress-card-label">
              YOUR PROGRESS
            </span>

            <strong>
              {progress}%
            </strong>

            <div className="detail-progress">

              <div
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <p>
              {progress === 0
                ? "Belum dimulai"
                : progress === 100
                ? "Course selesai"
                : "Teruskan perjalanan belajarmu"}
            </p>

          </div>

        </section>

        {/* ================= INFORMATION ================= */}

        <section className="course-information">

          <div className="information-heading">

            <span>
              COURSE INFORMATION
            </span>

            <h2>
              Apa yang akan
              <br />
              <em>
                kamu pelajari?
              </em>
            </h2>

          </div>

          <div className="information-grid">

            <div className="information-item">

              <span>
                INSTRUCTOR
              </span>

              <strong>
                {course.instructor}
              </strong>

            </div>

            <div className="information-item">

              <span>
                LEVEL
              </span>

              <strong>
                {course.level}
              </strong>

            </div>

            <div className="information-item">

              <span>
                DURASI
              </span>

              <strong>
                {course.duration}
              </strong>

            </div>

            <div className="information-item">

              <span>
                MATERI
              </span>

              <strong>
                {course.lessons} Materi
              </strong>

            </div>

          </div>

          {/* ================= ROADMAP ================= */}

          <div className="learning-roadmap">

            <div className="roadmap-item active">

              <div className="roadmap-number">
                01
              </div>

              <div>

                <span>
                  STEP 01
                </span>

                <h3>
                  Materi Pembelajaran
                </h3>

                <p>
                  Pelajari materi yang telah
                  disusun secara bertahap.
                </p>

              </div>

            </div>

            <div className="roadmap-item">

              <div className="roadmap-number">
                02
              </div>

              <div>

                <span>
                  STEP 02
                </span>

                <h3>
                  Latihan
                </h3>

                <p>
                  Terapkan materi melalui
                  latihan yang tersedia.
                </p>

              </div>

            </div>

            <div className="roadmap-item">

              <div className="roadmap-number">
                03
              </div>

              <div>

                <span>
                  STEP 03
                </span>

                <h3>
                  Evaluasi Akhir
                </h3>

                <p>
                  Uji kemampuanmu melalui
                  evaluasi akhir course.
                </p>

              </div>

            </div>

            <div className="roadmap-item">

              <div className="roadmap-number">
                04
              </div>

              <div>

                <span>
                  STEP 04
                </span>

                <h3>
                  Sertifikat Kompetensi
                </h3>

                <p>
                  Dapatkan sertifikat setelah
                  menyelesaikan evaluasi.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CourseDetail;