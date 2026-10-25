import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Course.css";

function Course() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      setError("");

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("User belum login.");
        setLoading(false);
        return;
      }

      const {
        data: courseData,
        error: courseError,
      } = await supabase
        .from("courses")
        .select("*")
        .order("id", { ascending: true });

      if (courseError) {
        console.error(
          "Gagal mengambil course:",
          courseError
        );
        setError("Course gagal dimuat.");
        setLoading(false);
        return;
      }

      const {
        data: progressData,
        error: progressError,
      } = await supabase
        .from("course_progress")
        .select("course_id, progress")
        .eq("user_id", user.id);

      if (progressError) {
        console.error(
          "Gagal mengambil progress:",
          progressError
        );
      }

      const progressMap = {};

      (progressData || []).forEach((item) => {
        progressMap[item.course_id] = item.progress;
      });

      const coursesWithProgress = (courseData || []).map(
        (course) => ({
          ...course,
          progress:
            progressMap[course.id] !== undefined
              ? progressMap[course.id]
              : 0,
        })
      );

      setCourses(coursesWithProgress);
      setLoading(false);
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      course.title
        ?.toLowerCase()
        .includes(searchValue) ||
      course.instructor
        ?.toLowerCase()
        .includes(searchValue);

    const matchesCategory =
      category === "ALL" ||
      course.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="course-page">

      <nav className="course-navbar">

        <Link
          to="/"
          className="course-logo"
        >
          Courvia
        </Link>

        <div className="course-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/webinar">
            Webinar
          </Link>

          <Link
            to="/course"
            className="active"
          >
            Course
          </Link>

          <Link to="/skill">
            Pengembangan Skill
          </Link>

        </div>

        <Link
          to="/dashboard"
          className="course-back"
        >
          ← Dashboard
        </Link>

      </nav>

      <header className="course-hero">

        <div className="course-hero-content">

          <span className="course-eyebrow">
            STRUCTURED LEARNING
          </span>

          <h1>
            Belajar lebih
            <br />
            <em>terarah.</em>
          </h1>

          <p>
            Ikuti course terstruktur, selesaikan
            evaluasi, dan buktikan kompetensimu
            melalui sertifikat Courvia.
          </p>

        </div>

        <div className="course-hero-stat">

          <strong>
            {String(courses.length).padStart(2, "0")}
          </strong>

          <span>
            COURSES
            <br />
            AVAILABLE
          </span>

        </div>

      </header>

      <section className="course-filter-section">

        <div className="course-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Cari course atau instruktur..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="course-categories">

          {[
            "ALL",
            "PROGRAMMING",
            "DESIGN",
            "BUSINESS",
            "CAREER",
            "AI",
            "DATA",
          ].map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "course-filter-active"
                  : ""
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </section>

      <main className="course-content">

        <div className="course-heading">

          <div>

            <span>
              BUILD YOUR KNOWLEDGE
            </span>

            <h2>
              Pilih course untuk
              <br />
              <em>
                mengembangkan skill.
              </em>
            </h2>

          </div>

          <p>
            {filteredCourses.length} course tersedia
          </p>

        </div>

        {loading && (
          <div className="course-empty">

            <strong>
              Memuat course...
            </strong>

            <p>
              Courvia sedang mengambil
              data course.
            </p>

          </div>
        )}

        {error && !loading && (
          <div className="course-empty">

            <strong>
              {error}
            </strong>

            <p>
              Silakan coba refresh halaman.
            </p>

          </div>
        )}

        {!loading && !error && (
          <div className="course-grid">

            {filteredCourses.map(
              (course, index) => (

                <article
                  className="course-card"
                  key={course.id}
                >

                  <div className="course-card-top">

                    <span className="course-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="course-category">
                      {course.category}
                    </span>

                  </div>

                  <div className="course-card-main">

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.description}
                    </p>

                  </div>

                  <div className="course-progress-area">

                    <div className="course-progress-label">

                      <span>
                        PROGRESS
                      </span>

                      <strong>
                        {course.progress}%
                      </strong>

                    </div>

                    <div className="course-progress">

                      <div
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="course-card-info">

                    <div>

                      <small>
                        INSTRUCTOR
                      </small>

                      <strong>
                        {course.instructor}
                      </strong>

                    </div>

                    <div>

                      <small>
                        LEVEL
                      </small>

                      <strong>
                        {course.level}
                      </strong>

                    </div>

                  </div>

                  <div className="course-card-bottom">

                    <span>
                      {course.lessons} materi
                    </span>

                    <span>
                      {course.duration}
                    </span>

                    <Link
                      to={`/course/${course.id}`}
                      className="course-detail-link"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      Detail ↗
                    </Link>

                  </div>

                </article>

              )
            )}

          </div>
        )}

        {!loading &&
          !error &&
          filteredCourses.length === 0 && (

            <div className="course-empty">

              <strong>
                Course tidak ditemukan.
              </strong>

              <p>
                Coba gunakan kata kunci atau
                kategori yang berbeda.
              </p>

            </div>

          )}

      </main>

    </div>
  );
}

export default Course;