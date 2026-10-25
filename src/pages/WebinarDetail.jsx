import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Users,
  Video,
  Award,
  Zap,
} from "lucide-react";
import "./WebinarDetail.css";

const webinarData = {
  1: {
    category: "PROGRAMMING",
    status: "UPCOMING",
    title: "Build Your First Modern Website",
    description:
      "Pelajari cara membangun website modern dari dasar hingga memahami struktur frontend yang baik.",
    instructor: "Park Jeongwoo",
    instructorRole: "Frontend Developer & Instructor",
    date: "24 Oktober 2026",
    time: "19:00 WIB",
    duration: "90 Menit",
    participants: 128,
    points: 100,
    level: "Beginner",
    topics: [
      "Memahami struktur website modern",
      "Mengenal HTML semantic",
      "Membangun layout menggunakan CSS",
      "Dasar responsive web design",
      "Best practice frontend development",
    ],
  },

  2: {
    category: "UI/UX DESIGN",
    status: "UPCOMING",
    title: "UI/UX Design: From Idea to Interface",
    description:
      "Belajar mengubah ide menjadi desain interface yang menarik dan mudah digunakan.",
    instructor: "Kim Jisoo",
    instructorRole: "UI/UX Designer & Design Mentor",
    date: "27 Oktober 2026",
    time: "19:30 WIB",
    duration: "90 Menit",
    participants: 96,
    points: 100,
    level: "Intermediate",
    topics: [
      "Mengenal user-centered design",
      "Membuat user flow",
      "Menyusun wireframe",
      "Membuat visual interface",
      "Prinsip usability dalam desain",
    ],
  },

  3: {
    category: "CAREER",
    status: "UPCOMING",
    title: "Preparing Your Digital Career",
    description:
      "Persiapkan skill, portfolio, dan personal branding untuk memulai karier di dunia digital.",
    instructor: "Lalisa Manoban",
    instructorRole: "Career Mentor & Digital Professional",
    date: "30 Oktober 2026",
    time: "19:00 WIB",
    duration: "120 Menit",
    participants: 74,
    points: 120,
    level: "All Level",
    topics: [
      "Menentukan career path",
      "Membangun portfolio",
      "Meningkatkan personal branding",
      "Persiapan interview",
      "Strategi memulai karier digital",
    ],
  },

  4: {
    category: "BUSINESS",
    status: "COMPLETED",
    title: "Digital Business Fundamentals",
    description:
      "Memahami dasar-dasar membangun dan mengembangkan bisnis di era digital.",
    instructor: "Hamada Asahi",
    instructorRole: "Digital Business Strategist",
    date: "15 Oktober 2026",
    time: "19:00 WIB",
    duration: "90 Menit",
    participants: 154,
    points: 100,
    level: "Beginner",
    topics: [
      "Digital business model",
      "Identifikasi target market",
      "Value proposition",
      "Strategi pemasaran digital",
      "Membangun customer experience",
    ],
  },

  5: {
    category: "PROGRAMMING",
    status: "COMPLETED",
    title: "Introduction to Web Development",
    description:
      "Mengenal HTML, CSS, JavaScript, dan bagaimana ketiganya digunakan untuk membuat website.",
    instructor: "Yeyen Sanusi",
    instructorRole: "Frontend Developer & Instructor",
    date: "10 Oktober 2026",
    time: "19:00 WIB",
    duration: "90 Menit",
    participants: 182,
    points: 100,
    level: "Beginner",
    topics: [
      "Pengenalan web development",
      "HTML fundamentals",
      "CSS fundamentals",
      "JavaScript fundamentals",
      "Cara kerja browser",
    ],
  },
};

function WebinarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const webinar = webinarData[id] || webinarData[1];

  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    setRegistered(true);

    localStorage.setItem(
      `courvia_webinar_${id}`,
      JSON.stringify({
        registered: true,
        webinarId: id,
        title: webinar.title,
      })
    );
  };

  return (
    <div className="webinar-detail-page">
      {/* NAVBAR */}
      <nav className="webinar-detail-navbar">
        <Link to="/dashboard" className="webinar-detail-logo">
          Courvia
        </Link>

        <div className="webinar-detail-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/course">Course</Link>
          <Link to="/webinar" className="active">
            Webinar
          </Link>
          <Link to="/skill">Skill Development</Link>
        </div>

        <div className="webinar-detail-avatar">NP</div>
      </nav>

      {/* BACK */}
      <main className="webinar-detail-container">
        <button
          className="webinar-back-button"
          onClick={() => navigate("/webinar")}
        >
          <ArrowLeft size={17} />
          Kembali ke Webinar
        </button>

        {/* HERO */}
        <section className="webinar-detail-hero">
          <div className="webinar-detail-hero-main">
            <div className="detail-category-row">
              <span>{webinar.category}</span>

              <span
                className={
                  webinar.status === "UPCOMING"
                    ? "detail-status upcoming"
                    : "detail-status completed"
                }
              >
                {webinar.status === "UPCOMING"
                  ? "Akan Datang"
                  : "Selesai"}
              </span>
            </div>

            <h1>{webinar.title}</h1>

            <p className="detail-description">
              {webinar.description}
            </p>

            <div className="detail-instructor">
              <div className="detail-instructor-avatar">
                {webinar.instructor
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>

              <div>
                <span>INSTRUCTOR</span>
                <strong>{webinar.instructor}</strong>
                <small>{webinar.instructorRole}</small>
              </div>
            </div>
          </div>

          <div className="webinar-detail-visual">
            <div className="detail-visual-icon">
              <Video size={48} strokeWidth={1.4} />
            </div>

            <span>LIVE LEARNING</span>

            <strong>Interactive Webinar</strong>

            <p>
              Belajar langsung dan berinteraksi bersama instructor
            </p>
          </div>
        </section>

        {/* INFO */}
        <section className="detail-info-grid">
          <div className="detail-info-card">
            <CalendarDays size={20} />
            <div>
              <span>DATE</span>
              <strong>{webinar.date}</strong>
            </div>
          </div>

          <div className="detail-info-card">
            <Clock3 size={20} />
            <div>
              <span>TIME</span>
              <strong>{webinar.time}</strong>
            </div>
          </div>

          <div className="detail-info-card">
            <Users size={20} />
            <div>
              <span>PARTICIPANTS</span>
              <strong>{webinar.participants} peserta</strong>
            </div>
          </div>

          <div className="detail-info-card">
            <Zap size={20} />
            <div>
              <span>REWARD</span>
              <strong>+{webinar.points} XP</strong>
            </div>
          </div>
        </section>

        {/* BODY */}
        <section className="webinar-detail-body">
          <div className="detail-main-content">
            <p className="eyebrow">WHAT YOU'LL LEARN</p>

            <h2>Materi yang akan kamu dapatkan</h2>

            <div className="topic-list">
              {webinar.topics.map((topic, index) => (
                <div className="topic-item" key={index}>
                  <CheckCircle2 size={19} />
                  <span>{topic}</span>
                </div>
              ))}
            </div>

            <div className="certificate-info">
              <div className="certificate-icon">
                <Award size={25} />
              </div>

              <div>
                <h3>Verified Attendance Certificate</h3>
                <p>
                  Peserta yang mengikuti webinar dan menyelesaikan
                  verifikasi kehadiran akan mendapatkan sertifikat
                  kehadiran resmi dari Courvia
                </p>
              </div>
            </div>
          </div>

          {/* REGISTRATION CARD */}
          <aside className="webinar-register-card">
            <div className="register-card-top">
              <span>WEBINAR ACCESS</span>

              <strong>
                {webinar.status === "UPCOMING"
                  ? "FREE"
                  : "COMPLETED"}
              </strong>
            </div>

            <h3>{webinar.title}</h3>

            <div className="register-detail">
              <div>
                <Clock3 size={16} />
                <span>{webinar.duration}</span>
              </div>

              <div>
                <Users size={16} />
                <span>{webinar.participants} peserta</span>
              </div>

              <div>
                <Award size={16} />
                <span>Certificate tersedia</span>
              </div>
            </div>

            {webinar.status === "UPCOMING" ? (
              registered ? (
                <div className="registered-state">
                  <CheckCircle2 size={21} />

                  <div>
                    <strong>Kamu sudah terdaftar</strong>
                    <span>
                      Jangan lupa hadir pada {webinar.date}.
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  className="register-button"
                  onClick={handleRegister}
                >
                  Daftar Webinar
                  <ArrowRight size={18} />
                </button>
              )
            ) : (
              <button
                className="completed-button"
                onClick={() => navigate(`/webinar/${id}/certificate`)}
              >
                Lihat Sertifikat
                <ArrowRight size={18} />
              </button>
            )}

            <p className="register-note">
              Dengan mendaftar, kamu akan mendapatkan akses ke
              informasi dan jadwal webinar
            </p>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default WebinarDetail;