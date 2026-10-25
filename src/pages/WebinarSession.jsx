import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Trophy,
  Video,
  Users,
} from "lucide-react";
import "./WebinarSession.css";

const webinarData = {
  1: {
    category: "PROGRAMMING",
    title: "Build Your First Modern Website",
    description:
      "Pelajari cara membangun website modern dari dasar hingga memahami struktur frontend yang baik.",
    instructor: "Park Jeongwoo",
    date: "24 Oktober 2026",
    time: "19:00 WIB",
    duration: "90 Menit",
    participants: 128,
    points: 100,
  },
  2: {
    category: "UI/UX DESIGN",
    title: "UI/UX Design: From Idea to Interface",
    description:
      "Belajar mengubah ide menjadi desain interface yang menarik dan mudah digunakan.",
    instructor: "Lalisa Manoban",
    date: "27 Oktober 2026",
    time: "19:30 WIB",
    duration: "90 Menit",
    participants: 96,
    points: 100,
  },
  3: {
    category: "CAREER",
    title: "Preparing Your Digital Career",
    description:
      "Persiapkan skill, portfolio, dan personal branding untuk memulai karier di dunia digital.",
    instructor: "Kim Jisoo",
    date: "30 Oktober 2026",
    time: "19:00 WIB",
    duration: "120 Menit",
    participants: 74,
    points: 120,
  },
};

function WebinarSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const webinar = webinarData[id];

  useEffect(() => {
    if (!webinar) return;

    const savedAttendance = localStorage.getItem(
      `courvia_webinar_attendance_${id}`
    );

    const savedCertificate = localStorage.getItem(
      `courvia_webinar_certificate_${id}`
    );

    if (savedAttendance === "true") {
      setAttendanceMarked(true);
    }

    if (savedCertificate) {
      setVerified(true);
    }
  }, [id, webinar]);

  if (!webinar) {
    return (
      <div className="session-not-found">
        <Video size={48} />
        <h1>Webinar tidak ditemukan</h1>
        <p>Webinar yang kamu cari tidak tersedia.</p>
        <Link to="/webinar">Kembali ke Webinar</Link>
      </div>
    );
  }

  const handleMarkAttendance = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        `courvia_webinar_attendance_${id}`,
        "true"
      );

      setAttendanceMarked(true);
      setLoading(false);
    }, 800);
  };

  const handleVerifyAttendance = () => {
    setLoading(true);

    setTimeout(() => {
      const certificateData = {
        webinarId: Number(id),
        title: webinar.title,
        instructor: webinar.instructor,
        points: webinar.points,
        verifiedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        `courvia_webinar_certificate_${id}`,
        JSON.stringify(certificateData)
      );

      const currentWebinarXP =
        Number(localStorage.getItem("courvia_xp_webinar")) || 0;

      const alreadyRewarded =
        localStorage.getItem(
          `courvia_webinar_xp_${id}`
        ) === "true";

      if (!alreadyRewarded) {
        localStorage.setItem(
          "courvia_xp_webinar",
          String(currentWebinarXP + webinar.points)
        );

        localStorage.setItem(
          `courvia_webinar_xp_${id}`,
          "true"
        );
      }

      setVerified(true);
      setLoading(false);

      navigate(`/webinar/${id}/certificate`);
    }, 1000);
  };

  return (
    <div className="webinar-session-page">
      <nav className="session-navbar">
        <Link to="/dashboard" className="session-logo">
          Courvia
        </Link>

        <div className="session-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/course">Course</Link>
          <Link to="/webinar" className="active">
            Webinar
          </Link>
          <Link to="/skill">Skill Development</Link>
        </div>

        <div className="session-avatar">NP</div>
      </nav>

      <main className="session-main">
        <button
          className="session-back"
          onClick={() => navigate("/my-webinar")}
        >
          <ArrowLeft size={17} />
          Kembali ke Webinar Saya
        </button>

        <section className="session-header">
          <div>
            <span className="session-eyebrow">
              LIVE WEBINAR · {webinar.category}
            </span>

            <h1>
              {webinar.title}
              <br />
              <em>live session.</em>
            </h1>

            <p>{webinar.description}</p>
          </div>

          <div className="live-status">
            <span className="live-dot" />
            LIVE SESSION
          </div>
        </section>

        <section className="session-layout">
          <div className="session-video-area">
            <div className="session-video">
              <div className="video-background">
                <div className="video-grid" />

                <div className="video-center">
                  <div className="video-icon">
                    <Video size={30} />
                  </div>

                  <span>COURVIA LIVE</span>

                  <strong>
                    {webinar.title}
                  </strong>

                  <small>
                    Simulated webinar session
                  </small>
                </div>

                <div className="video-live-badge">
                  <span />
                  LIVE
                </div>

                <div className="video-participants">
                  <Users size={15} />
                  {webinar.participants} participants
                </div>
              </div>
            </div>

            <div className="session-info-row">
              <div>
                <span>INSTRUCTOR</span>
                <strong>{webinar.instructor}</strong>
              </div>

              <div>
                <span>DATE</span>
                <strong>{webinar.date}</strong>
              </div>

              <div>
                <span>DURATION</span>
                <strong>{webinar.duration}</strong>
              </div>
            </div>
          </div>

          <aside className="attendance-card">
            <div className="attendance-card-top">
              <span>YOUR ATTENDANCE</span>

              <div className="attendance-icon">
                {verified ? (
                  <ShieldCheck size={22} />
                ) : (
                  <Clock3 size={22} />
                )}
              </div>
            </div>

            <h2>
              {verified
                ? "Attendance verified."
                : attendanceMarked
                ? "You're checked in."
                : "Don't miss your attendance."}
            </h2>

            <p>
              {verified
                ? "Kehadiran kamu sudah diverifikasi. Sertifikat webinar sudah tersedia."
                : attendanceMarked
                ? "Kehadiran sudah tercatat. Sekarang lakukan verifikasi untuk mendapatkan XP dan sertifikat."
                : "Klik tombol di bawah untuk mencatat kehadiranmu pada webinar ini."}
            </p>

            <div className="attendance-steps">
              <div
                className={
                  attendanceMarked
                    ? "attendance-step completed"
                    : "attendance-step"
                }
              >
                <div className="step-number">
                  {attendanceMarked ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    "01"
                  )}
                </div>

                <div>
                  <strong>Mark Attendance</strong>
                  <span>
                    Catat kehadiran webinar
                  </span>
                </div>
              </div>

              <div
                className={
                  verified
                    ? "attendance-step completed"
                    : "attendance-step"
                }
              >
                <div className="step-number">
                  {verified ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    "02"
                  )}
                </div>

                <div>
                  <strong>Verify Attendance</strong>
                  <span>
                    Verifikasi untuk mendapatkan reward
                  </span>
                </div>
              </div>

              <div
                className={
                  verified
                    ? "attendance-step completed"
                    : "attendance-step"
                }
              >
                <div className="step-number">
                  {verified ? (
                    <Trophy size={17} />
                  ) : (
                    "03"
                  )}
                </div>

                <div>
                  <strong>Earn Reward</strong>
                  <span>
                    +{webinar.points} XP & certificate
                  </span>
                </div>
              </div>
            </div>

            {!attendanceMarked && !verified && (
              <button
                className="attendance-button"
                onClick={handleMarkAttendance}
                disabled={loading}
              >
                {loading
                  ? "Checking in..."
                  : "Mark My Attendance"}
              </button>
            )}

            {attendanceMarked && !verified && (
              <button
                className="attendance-button verify"
                onClick={handleVerifyAttendance}
                disabled={loading}
              >
                {loading
                  ? "Verifying..."
                  : "Verify Attendance →"}
              </button>
            )}

            {verified && (
              <button
                className="attendance-button verified"
                onClick={() =>
                  navigate(
                    `/webinar/${id}/certificate`
                  )
                }
              >
                <CheckCircle2 size={17} />
                View Certificate
              </button>
            )}

            <div className="attendance-reward">
              <div>
                <Trophy size={18} />
              </div>

              <span>
                Complete this webinar
                <strong>
                  +{webinar.points} XP
                </strong>
              </span>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default WebinarSession;
