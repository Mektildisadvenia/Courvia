import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Video,
  Award,
  MapPin,
} from "lucide-react";
import "./MyWebinar.css";

const webinarData = {
  1: {
    title: "Build Your First Modern Website",
    category: "PROGRAMMING",
    instructor: "Park Jeongwoo",
    date: "24 Oktober 2026",
    time: "19:00 WIB",
    duration: "90 Menit",
    points: 100,
    status: "UPCOMING",
  },

  2: {
    title: "UI/UX Design: From Idea to Interface",
    category: "UI/UX DESIGN",
    instructor: "Lalisa Manoban",
    date: "27 Oktober 2026",
    time: "19:30 WIB",
    duration: "90 Menit",
    points: 100,
    status: "UPCOMING",
  },

  3: {
    title: "Preparing Your Digital Career",
    category: "CAREER",
    instructor: "Kim Jisoo",
    date: "30 Oktober 2026",
    time: "19:00 WIB",
    duration: "120 Menit",
    points: 120,
    status: "UPCOMING",
  },
};

function MyWebinar() {
  const navigate = useNavigate();

  const [registeredWebinars, setRegisteredWebinars] = useState([]);

  useEffect(() => {
    const registered = [];

    Object.keys(webinarData).forEach((id) => {
      const saved = localStorage.getItem(`courvia_webinar_${id}`);

      if (saved) {
        try {
          const data = JSON.parse(saved);

          if (data.registered) {
            registered.push({
              id,
              ...webinarData[id],
            });
          }
        } catch (error) {
          console.error("Gagal membaca data webinar:", error);
        }
      }
    });

    setRegisteredWebinars(registered);
  }, []);

  return (
    <div className="my-webinar-page">
      {/* NAVBAR */}
      <nav className="my-webinar-navbar">
        <Link to="/dashboard" className="my-webinar-logo">
          Courvia
        </Link>

        <div className="my-webinar-nav">
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/course">Course</Link>

          <Link to="/webinar" className="active">
            Webinar
          </Link>

          <Link to="/skill">Skill Development</Link>
        </div>

        <div className="my-webinar-avatar">NP</div>
      </nav>

      <main className="my-webinar-container">
        {/* BACK */}
        <button
          className="my-webinar-back"
          onClick={() => navigate("/webinar")}
        >
          <ArrowLeft size={17} />
          Kembali ke Webinar
        </button>

        {/* HEADER */}
        <section className="my-webinar-header">
          <div>
            <p className="eyebrow">YOUR LEARNING JOURNEY</p>

            <h1>
              Webinar
              <br />
              <em>yang kamu ikuti</em>
            </h1>

            <p>
              Semua webinar yang sudah kamu daftarkan akan muncul di sini.
              Jangan lupa hadir untuk mendapatkan XP dan sertifikat.
            </p>
          </div>

          <div className="my-webinar-summary">
            <div>
              <strong>{registeredWebinars.length}</strong>
              <span>Webinar Terdaftar</span>
            </div>

            <div>
              <strong>
                {registeredWebinars.reduce(
                  (total, webinar) => total + webinar.points,
                  0
                )}
              </strong>
              <span>Total XP</span>
            </div>
          </div>
        </section>

        {/* WEBINAR LIST */}
        {registeredWebinars.length > 0 ? (
          <section className="my-webinar-list">
            {registeredWebinars.map((webinar) => {
              const attendanceVerified =
                localStorage.getItem(
                  `courvia_webinar_attendance_${webinar.id}`
                ) === "true";

              return (
                <article
                  className="my-webinar-card"
                  key={webinar.id}
                >
                  <div className="my-webinar-card-visual">
                    <div className="my-webinar-icon">
                      <Video size={32} strokeWidth={1.5} />
                    </div>

                    <span className="registered-badge">
                      <CheckCircle2 size={14} />
                      TERDAFTAR
                    </span>
                  </div>

                  <div className="my-webinar-card-content">
                    <span className="webinar-category">
                      {webinar.category}
                    </span>

                    <h2>{webinar.title}</h2>

                    <p className="webinar-instructor">
                      bersama {webinar.instructor}
                    </p>

                    <div className="my-webinar-meta">
                      <div>
                        <CalendarDays size={16} />
                        <span>{webinar.date}</span>
                      </div>

                      <div>
                        <Clock3 size={16} />
                        <span>{webinar.time}</span>
                      </div>

                      <div>
                        <MapPin size={16} />
                        <span>Online</span>
                      </div>
                    </div>

                    <div className="my-webinar-bottom">
                      <div className="webinar-reward">
                        <Award size={17} />

                        <span>
                          <strong>+{webinar.points} XP</strong>
                          Setelah hadir
                        </span>
                      </div>

                      <div className="my-webinar-actions">
                        <Link
                          to={`/webinar/${webinar.id}`}
                          className="my-webinar-detail"
                        >
                          Lihat Detail
                          <ArrowRight size={16} />
                        </Link>

                        {!attendanceVerified ? (
                          <Link
                            to={`/webinar/${webinar.id}/session`}
                            className="join-webinar-button"
                          >
                            Join Webinar
                            <ArrowRight size={16} />
                          </Link>
                        ) : (
                          <Link
                            to={`/webinar/${webinar.id}/certificate`}
                            className="certificate-webinar-button"
                          >
                            Lihat Sertifikat
                            <Award size={16} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="empty-my-webinar">
            <div className="empty-webinar-icon">
              <Video size={38} />
            </div>

            <p className="eyebrow">NO WEBINAR YET</p>

            <h2>Belum ada webinar yang kamu ikuti</h2>

            <p>
              Yuk pilih webinar yang sesuai dengan tujuan belajar kamu
              dan mulai kumpulkan pengalaman serta XP.
            </p>

            <Link
              to="/webinar"
              className="explore-webinar-button"
            >
              Explore Webinar
              <ArrowRight size={17} />
            </Link>
          </section>
        )}

        {/* INFO */}
        <section className="webinar-process">
          <div className="process-heading">
            <p className="eyebrow">HOW IT WORKS</p>

            <h2>Perjalanan webinar kamu</h2>
          </div>

          <div className="process-grid">
            <div className="process-item">
              <span>01</span>

              <h3>Daftar</h3>

              <p>
                Pilih webinar yang sesuai dan daftarkan dirimu.
              </p>
            </div>

            <div className="process-item">
              <span>02</span>

              <h3>Hadir</h3>

              <p>
                Ikuti sesi webinar sesuai jadwal yang ditentukan.
              </p>
            </div>

            <div className="process-item">
              <span>03</span>

              <h3>Verify</h3>

              <p>
                Lakukan verifikasi kehadiran setelah sesi selesai.
              </p>
            </div>

            <div className="process-item">
              <span>04</span>

              <h3>Earn</h3>

              <p>
                Dapatkan XP dan sertifikat kehadiran dari Courvia.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyWebinar;
