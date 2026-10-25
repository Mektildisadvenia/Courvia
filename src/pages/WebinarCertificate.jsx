import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Download,
  Home,
  ShieldCheck,
} from "lucide-react";
import "./WebinarCertificate.css";

const webinarData = {
  1: {
    title: "Build Your First Modern Website",
    category: "PROGRAMMING",
    instructor: "Park Jeongwoo",
    points: 100,
  },

  2: {
    title: "UI/UX Design: From Idea to Interface",
    category: "UI/UX DESIGN",
    instructor: "Lalisa Manoban",
    points: 100,
  },

  3: {
    title: "Preparing Your Digital Career",
    category: "CAREER",
    instructor: "Kim Jisoo",
    points: 120,
  },
};

function WebinarCertificate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState(null);

  const webinar = webinarData[id];

  useEffect(() => {
    if (!webinar) return;

    const savedCertificate = localStorage.getItem(
      `courvia_webinar_certificate_${id}`
    );

    if (savedCertificate) {
      try {
        setCertificate(JSON.parse(savedCertificate));
      } catch (error) {
        console.error(
          "Gagal membaca sertifikat:",
          error
        );
      }
    }
  }, [id, webinar]);

  if (!webinar) {
    return (
      <div className="webinar-certificate-not-found">
        <Award size={48} />

        <h1>Sertifikat tidak ditemukan</h1>

        <Link to="/webinar">
          Kembali ke Webinar
        </Link>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="webinar-certificate-not-found">
        <ShieldCheck size={48} />

        <h1>Sertifikat belum tersedia</h1>

        <p>
          Kamu harus menyelesaikan webinar dan
          melakukan verifikasi kehadiran terlebih
          dahulu.
        </p>

        <button
          onClick={() =>
            navigate(`/webinar/${id}/session`)
          }
        >
          Kembali ke Webinar
        </button>
      </div>
    );
  }

  const verifiedDate = certificate.verifiedAt
    ? new Date(
        certificate.verifiedAt
      ).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <div className="webinar-certificate-page">
      {/* =========================
          NAVBAR
      ========================== */}
      <nav className="certificate-navbar">
        <Link
          to="/dashboard"
          className="certificate-logo"
        >
          Courvia
        </Link>

        <div className="certificate-nav">
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/course">
            Course
          </Link>

          <Link
            to="/webinar"
            className="active"
          >
            Webinar
          </Link>

          <Link to="/skill">
            Skill Development
          </Link>
        </div>

        <div className="certificate-avatar">
          NP
        </div>
      </nav>

      <main className="certificate-main">
        {/* =========================
            BACK
        ========================== */}
        <button
          className="certificate-back"
          onClick={() =>
            navigate("/my-webinar")
          }
        >
          <ArrowLeft size={17} />
          Kembali ke Webinar Saya
        </button>

        {/* =========================
            HEADER
        ========================== */}
        <section className="certificate-header">
          <div>
            <span className="certificate-eyebrow">
              WEBINAR ACHIEVEMENT
            </span>

            <h1>
              Your achievement,
              <br />
              <em>officially verified.</em>
            </h1>

            <p>
              Sertifikat ini diberikan sebagai bukti
              bahwa kamu telah mengikuti dan
              menyelesaikan webinar di Courvia.
            </p>
          </div>

          <div className="certificate-status">
            <CheckCircle2 size={17} />
            VERIFIED
          </div>
        </section>

        {/* =========================
            CERTIFICATE
        ========================== */}
        <section className="certificate-wrapper">
          <div className="certificate-paper">
            {/* Decorative */}
            <div className="certificate-corner top-left" />
            <div className="certificate-corner top-right" />
            <div className="certificate-corner bottom-left" />
            <div className="certificate-corner bottom-right" />

            <div className="certificate-paper-inner">
              <div className="certificate-mark">
                <Award size={27} />
              </div>

              <span className="certificate-small-title">
                CERTIFICATE OF PARTICIPATION
              </span>

              <h2>Certificate</h2>

              <p className="certificate-presented">
                This certificate is proudly presented to
              </p>

              <div className="certificate-name">
                Nanda Putri
              </div>

              <div className="certificate-line" />

              <p className="certificate-description">
                for successfully participating in
                the Courvia webinar
              </p>

              <h3 className="certificate-webinar-title">
                {webinar.title}
              </h3>

              <div className="certificate-meta">
                <div>
                  <span>INSTRUCTOR</span>

                  <strong>
                    {webinar.instructor}
                  </strong>
                </div>

                <div>
                  <span>DATE VERIFIED</span>

                  <strong>
                    {verifiedDate}
                  </strong>
                </div>

                <div>
                  <span>REWARD</span>

                  <strong>
                    +{webinar.points} XP
                  </strong>
                </div>
              </div>

              <div className="certificate-footer">
                <div className="certificate-brand">
                  <strong>Courvia</strong>

                  <span>
                    Learn · Practice · Grow
                  </span>
                </div>

                <div className="certificate-verification">
                  <ShieldCheck size={18} />

                  <span>
                    VERIFIED CERTIFICATE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            ACTIONS
        ========================== */}
        <section className="certificate-actions">
          <div className="certificate-action-info">
            <div className="action-icon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <strong>
                Certificate verified
              </strong>

              <p>
                Kehadiran webinar kamu telah
                berhasil diverifikasi.
              </p>
            </div>
          </div>

          <div className="certificate-buttons">
            <button
              className="download-certificate"
              onClick={() =>
                window.print()
              }
            >
              <Download size={17} />
              Download / Print
            </button>

            <button
              className="dashboard-certificate-button"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              <Home size={17} />
              Dashboard
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default WebinarCertificate;