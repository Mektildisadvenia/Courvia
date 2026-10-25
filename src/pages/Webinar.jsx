import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Users,
  Video,
  CheckCircle2,
} from "lucide-react";
import "./Webinar.css";

const webinarData = [
  {
    id: 1,
    category: "PROGRAMMING",
    status: "UPCOMING",
    title: "Build Your First Modern Website",
    description:
      "Pelajari cara membangun website modern dari dasar hingga memahami struktur frontend yang baik.",
    instructor: "Park Jeongwoo",
    date: "24 Oktober 2026",
    time: "19:00 WIB",
    duration: "90 Menit",
    participants: 128,
    points: 100,
    color: "blue",
  },
  {
    id: 2,
    category: "UI/UX DESIGN",
    status: "UPCOMING",
    title: "UI/UX Design: From Idea to Interface",
    description:
      "Belajar mengubah ide menjadi desain interface yang menarik dan mudah digunakan.",
    instructor: "Lalisa Manoban",
    date: "27 Oktober 2026",
    time: "19:30 WIB",
    duration: "90 Menit",
    participants: 96,
    points: 100,
    color: "coral",
  },
  {
    id: 3,
    category: "CAREER",
    status: "UPCOMING",
    title: "Preparing Your Digital Career",
    description:
      "Persiapkan skill, portfolio, dan personal branding untuk memulai karier di dunia digital.",
    instructor: "Kim Jisoo",
    date: "30 Oktober 2026",
    time: "19:00 WIB",
    duration: "120 Menit",
    participants: 74,
    points: 120,
    color: "green",
  },
  {
    id: 4,
    category: "BUSINESS",
    status: "COMPLETED",
    title: "Digital Business Fundamentals",
    description:
      "Memahami dasar-dasar membangun dan mengembangkan bisnis di era digital.",
    instructor: "Yeyen Sanusi",
    date: "15 Oktober 2026",
    time: "19:00 WIB",
    duration: "90 Menit",
    participants: 154,
    points: 100,
    color: "blue",
  },
  {
    id: 5,
    category: "PROGRAMMING",
    status: "COMPLETED",
    title: "Introduction to Web Development",
    description:
      "Mengenal HTML, CSS, JavaScript, dan bagaimana ketiganya digunakan untuk membuat website.",
    instructor: "Hamada Asahi",
    date: "10 Oktober 2026",
    time: "19:00 WIB",
    duration: "90 Menit",
    participants: 182,
    points: 100,
    color: "coral",
  },
];

function Webinar() {
  const [filter, setFilter] = useState("ALL");

  const filteredWebinars =
    filter === "ALL"
      ? webinarData
      : webinarData.filter((webinar) => webinar.status === filter);

  return (
    <div className="webinar-page">
      {/* NAVBAR */}
      <nav className="webinar-navbar">
        <Link to="/dashboard" className="webinar-logo">
          Courvia
        </Link>

        <div className="webinar-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/course">Course</Link>
          <Link to="/webinar" className="active">
            Webinar
          </Link>
          <Link to="/skill">Skill Development</Link>
        </div>

        <div className="webinar-profile">
          <div className="webinar-avatar">NP</div>
          <span>Yeyen Sanusi</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="webinar-hero">
        <div className="webinar-hero-content">
          <p className="eyebrow">LIVE LEARNING EXPERIENCE</p>

          <h1>
            Belajar langsung
            <br />
            <em>Berkembang bersama</em>
          </h1>

          <p className="webinar-hero-description">
            Ikuti webinar interaktif bersama instructor pilihan, dapatkan
            insight baru, dan kumpulkan poin untuk perkembanganmu di Courvia
          </p>

          {/* HERO ACTIONS */}
          <div className="webinar-hero-actions">
            <a href="#webinar-list" className="primary-webinar-button">
              Explore Webinar
              <ArrowRight size={18} />
            </a>

            {/* WEBINAR SAYA */}
            <Link to="/my-webinar" className="my-webinar-button">
              Webinar Saya
              <ArrowRight size={17} />
            </Link>

            <div className="webinar-trust">
              <CheckCircle2 size={18} />
              <span>Verified attendance certificate</span>
            </div>
          </div>
        </div>

        <div className="webinar-hero-card">
          <div className="hero-card-top">
            <span className="live-badge">
              <span></span>
              LIVE SESSION
            </span>

            <Video size={22} />
          </div>

          <div className="hero-card-icon">
            <Video size={38} strokeWidth={1.5} />
          </div>

          <p className="hero-card-label">NEXT WEBINAR</p>

          <h3>Build Your First Modern Website</h3>

          <div className="hero-card-info">
            <span>
              <CalendarDays size={15} />
              24 Oct 2026
            </span>

            <span>
              <Clock3 size={15} />
              19:00 WIB
            </span>
          </div>

          <Link to="/webinar/1" className="hero-card-link">
            View session
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <main className="webinar-content" id="webinar-list">
        <div className="webinar-section-heading">
          <div>
            <p className="eyebrow">DISCOVER</p>

            <h2>Webinar untukmu</h2>

            <p>
              Pilih sesi yang sesuai dengan tujuan belajar dan perkembangan
              skill kamu
            </p>
          </div>

          <div className="webinar-filter">
            <button
              className={filter === "ALL" ? "active" : ""}
              onClick={() => setFilter("ALL")}
            >
              Semua
            </button>

            <button
              className={filter === "UPCOMING" ? "active" : ""}
              onClick={() => setFilter("UPCOMING")}
            >
              Akan Datang
            </button>

            <button
              className={filter === "COMPLETED" ? "active" : ""}
              onClick={() => setFilter("COMPLETED")}
            >
              Selesai
            </button>
          </div>
        </div>

        <div className="webinar-grid">
          {filteredWebinars.map((webinar) => (
            <article
              className={`webinar-card ${webinar.color}`}
              key={webinar.id}
            >
              <div className="webinar-card-visual">
                <div className="webinar-category">
                  {webinar.category}
                </div>

                <div className="webinar-visual-icon">
                  <Video size={32} strokeWidth={1.5} />
                </div>

                <span
                  className={`webinar-status ${webinar.status.toLowerCase()}`}
                >
                  {webinar.status === "UPCOMING"
                    ? "Akan Datang"
                    : "Selesai"}
                </span>
              </div>

              <div className="webinar-card-body">
                <p className="webinar-instructor">
                  WITH {webinar.instructor.toUpperCase()}
                </p>

                <h3>{webinar.title}</h3>

                <p className="webinar-description">
                  {webinar.description}
                </p>

                <div className="webinar-meta">
                  <span>
                    <CalendarDays size={16} />
                    {webinar.date}
                  </span>

                  <span>
                    <Clock3 size={16} />
                    {webinar.time}
                  </span>

                  <span>
                    <Users size={16} />
                    {webinar.participants} peserta
                  </span>
                </div>

                <div className="webinar-card-footer">
                  <div className="webinar-points">
                    <strong>+{webinar.points}</strong>
                    <span>XP Points</span>
                  </div>

                  <Link
                    to={`/webinar/${webinar.id}`}
                    className="webinar-detail-button"
                  >
                    Lihat Detail
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredWebinars.length === 0 && (
          <div className="empty-webinar">
            <Video size={36} />

            <h3>Belum ada webinar</h3>

            <p>
              Belum ada webinar dengan kategori yang kamu pilih
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Webinar;