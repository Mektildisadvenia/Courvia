import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Video,
  BookOpen,
} from "lucide-react";
import "./Certificates.css";

const webinarData = {
  1: {
    title: "Build Your First Modern Website",
    instructor: "Park Jeongwoo",
    points: 100,
  },
  2: {
    title: "UI/UX Design: From Idea to Interface",
    instructor: "Lalisa Manoban",
    points: 100,
  },
  3: {
    title: "Preparing Your Digital Career",
    instructor: "Kim Jisoo",
    points: 120,
  },
};

function Certificates() {
  const navigate = useNavigate();

  const [webinarCertificates, setWebinarCertificates] =
    useState([]);

  useEffect(() => {
    const certificates = [];

    Object.keys(webinarData).forEach((id) => {
      const saved = localStorage.getItem(
        `courvia_webinar_certificate_${id}`
      );

      if (saved) {
        try {
          const certificate = JSON.parse(saved);

          certificates.push({
            ...certificate,
            type: "Webinar",
            icon: "webinar",
          });
        } catch (error) {
          console.error(
            "Gagal membaca sertifikat:",
            error
          );
        }
      }
    });

    setWebinarCertificates(certificates);
  }, []);

  const totalCertificates =
    webinarCertificates.length + 1;

  return (
    <div className="certificates-page">

      {/* NAVBAR */}

      <nav className="certificates-navbar">

        <button
          className="certificates-logo"
          onClick={() => navigate("/")}
        >
          Courvia
        </button>

        <div className="certificates-nav-links">

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

        <div className="certificates-avatar">
          NP
        </div>

      </nav>

      {/* MAIN */}

      <main className="certificates-main">

        <button
          className="certificates-back"
          onClick={() =>
            navigate("/profile")
          }
        >
          <ArrowLeft size={17} />
          Back to Profile
        </button>

        {/* HEADER */}

        <section className="certificates-header">

          <div>

            <span>
              YOUR ACHIEVEMENTS
            </span>

            <h1>
              Certificates
              <br />
              <em>you've earned.</em>
            </h1>

            <p>
              Semua sertifikat yang berhasil
              kamu dapatkan selama belajar
              di Courvia tersimpan di sini.
            </p>

          </div>

          <div className="certificate-count">

            <Award size={25} />

            <span>
              TOTAL CERTIFICATES
            </span>

            <strong>
              {totalCertificates}
            </strong>

          </div>

        </section>

        {/* CERTIFICATES */}

        <section className="certificates-section">

          <div className="certificates-section-title">

            <span>
              01 · COMPLETED LEARNING
            </span>

            <h2>
              Your
              <br />
              <em>certificates.</em>
            </h2>

          </div>

          {/* COURSE CERTIFICATE */}

          <div className="certificate-list">

            <div className="certificate-card">

              <div className="certificate-card-visual course">

                <BookOpen size={28} />

                <span>
                  COURSE
                </span>

                <strong>
                  WEB
                  <br />
                  DEV
                </strong>

              </div>

              <div className="certificate-card-content">

                <div className="certificate-card-top">

                  <span>
                    COURSE CERTIFICATE
                  </span>

                  <div className="verified-label">
                    <CheckCircle2 size={14} />
                    VERIFIED
                  </div>

                </div>

                <h3>
                  Web Development
                  Fundamentals
                </h3>

                <p>
                  Certificate of competency
                  after completing the course
                  evaluation.
                </p>

                <div className="certificate-card-meta">

                  <div>
                    <span>
                      INSTRUCTOR
                    </span>

                    <strong>
                      Dimas Saputra
                    </strong>
                  </div>

                  <div>
                    <span>
                      PROGRESS
                    </span>

                    <strong>
                      Completed
                    </strong>
                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      "/course/1/certificate"
                    )
                  }
                >
                  View Certificate
                  <ExternalLink size={15} />
                </button>

              </div>

            </div>

            {/* WEBINAR CERTIFICATES */}

            {webinarCertificates.map(
              (certificate) => (
                <div
                  className="certificate-card"
                  key={certificate.webinarId}
                >

                  <div className="certificate-card-visual webinar">

                    <Video size={28} />

                    <span>
                      WEBINAR
                    </span>

                    <strong>
                      LIVE
                      <br />
                      LEARN
                    </strong>

                  </div>

                  <div className="certificate-card-content">

                    <div className="certificate-card-top">

                      <span>
                        PARTICIPATION
                        CERTIFICATE
                      </span>

                      <div className="verified-label">
                        <CheckCircle2
                          size={14}
                        />
                        VERIFIED
                      </div>

                    </div>

                    <h3>
                      {certificate.title}
                    </h3>

                    <p>
                      Certificate of verified
                      participation in a Courvia
                      live webinar.
                    </p>

                    <div className="certificate-card-meta">

                      <div>
                        <span>
                          INSTRUCTOR
                        </span>

                        <strong>
                          {certificate.instructor}
                        </strong>
                      </div>

                      <div>
                        <span>
                          REWARD
                        </span>

                        <strong>
                          +{certificate.points} XP
                        </strong>
                      </div>

                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/webinar/${certificate.webinarId}/certificate`
                        )
                      }
                    >
                      View Certificate
                      <ExternalLink
                        size={15}
                      />
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        </section>

        {/* EMPTY WEBINAR */}

        {webinarCertificates.length === 0 && (
          <section className="certificate-empty">

            <div className="certificate-empty-icon">
              <ShieldCheck size={25} />
            </div>

            <div>

              <strong>
                No webinar certificates yet
              </strong>

              <p>
                Selesaikan webinar dan verifikasi
                kehadiran untuk mendapatkan
                sertifikat.
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/webinar")
              }
            >
              Explore Webinar
              <span>→</span>
            </button>

          </section>
        )}

        {/* BOTTOM CTA */}

        <section className="certificates-cta">

          <div>

            <span>
              KEEP GOING
            </span>

            <h2>
              More learning,
              <br />
              <em>more achievements.</em>
            </h2>

          </div>

          <div className="certificates-cta-actions">

            <button
              onClick={() =>
                navigate("/course")
              }
            >
              <BookOpen size={17} />
              Explore Courses
            </button>

            <button
              onClick={() =>
                navigate("/webinar")
              }
            >
              <Video size={17} />
              Explore Webinars
            </button>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Certificates;
