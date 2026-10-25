import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <Link to="/" className="logo">
          Courvia
        </Link>

        <div className="nav-links">

          <a href="#beranda">
            Beranda
          </a>

          <a href="#webinar">
            Webinar
          </a>

          <a href="#course">
            Course
          </a>

          <a href="#skill">
            Pengembangan Skill
          </a>

        </div>

        <div className="nav-actions">

          <Link
            to="/login"
            className="login-link"
          >
            Masuk
          </Link>

          <Link
            to="/register"
            className="register-button"
          >
            Daftar
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <main>

        <section
          id="beranda"
          className="hero-section"
        >

          <div className="hero-content">

            <div className="eyebrow">
              PLATFORM PENGEMBANGAN SKILL
            </div>

            <h1>

              Belajar.
              <br />

              <span>Berkembang.</span>
              <br />

              <em>Dapatkan Pengakuan.</em>

            </h1>

            <p className="hero-description">
              Courvia membantu kamu membangun skill melalui
              webinar terverifikasi, course terstruktur,
              dan latihan personal berbasis AI.
            </p>

            <div className="hero-actions">

              <Link
                to="/register"
                className="primary-button"
              >
                Mulai Perjalanan
                <span>→</span>
              </Link>

              <a
                href="#program"
                className="secondary-button"
              >
                Eksplorasi Program
              </a>

            </div>

          </div>


          {/* ================= HERO CARD ================= */}

          <div className="hero-visual">

            <div className="floating-card card-top">

              <span>YOUR PROGRESS</span>

              <strong>
                2.450 XP
              </strong>

              <div className="progress-line">
                <div></div>
              </div>

              <small>
                70% menuju level berikutnya
              </small>

            </div>


            <div className="hero-orbit">

              <div className="orbit-circle circle-one"></div>

              <div className="orbit-circle circle-two"></div>

              <div className="orbit-content">

                <span>
                  KEEP
                </span>

                <strong>
                  LEARNING
                </strong>

                <small>
                  EVERY DAY
                </small>

              </div>

            </div>


            <div className="floating-card card-bottom">

              <span>LEARNING STREAK</span>

              <strong>
                07 DAYS
              </strong>

              <small>
                +50 XP today
              </small>

            </div>

          </div>

        </section>


        {/* ================= MARQUEE ================= */}

        <section className="marquee">

          <div className="marquee-track">

            <span>LEARN WITH PURPOSE</span>
            <span>✦</span>
            <span>BUILD YOUR SKILL</span>
            <span>✦</span>
            <span>EARN RECOGNITION</span>
            <span>✦</span>

          </div>

        </section>


        {/* ================= PROGRAM ================= */}

        <section
          id="program"
          className="program-section"
        >

          <div className="section-heading">

            <span>
              WHAT YOU CAN DO
            </span>

            <h2>
              Satu platform.
              <br />
              <em>Berbagai cara untuk berkembang.</em>
            </h2>

          </div>


          <div className="program-grid">


            {/* WEBINAR */}

            <a
              href="#webinar"
              id="webinar"
              className="program-card webinar-card"
            >

              <div className="program-number">
                01
              </div>

              <div>

                <span className="program-label">
                  LIVE LEARNING
                </span>

                <h3>
                  Webinar
                </h3>

                <p>
                  Sesi belajar langsung bersama instruktur
                  terstandar dan dapatkan sertifikat
                  kehadiran terverifikasi.
                </p>

              </div>

              <div className="program-arrow">
                ↗
              </div>

            </a>


            {/* COURSE */}

            <a
              href="#course"
              id="course"
              className="program-card course-card"
            >

              <div className="program-number">
                02
              </div>

              <div>

                <span className="program-label">
                  STRUCTURED LEARNING
                </span>

                <h3>
                  Course
                </h3>

                <p>
                  Materi terstruktur dengan evaluasi akhir
                  yang mengukur kompetensi kamu secara nyata.
                </p>

              </div>

              <div className="program-arrow">
                ↗
              </div>

            </a>


            {/* SKILL */}

            <a
              href="#skill"
              id="skill"
              className="program-card skill-card"
            >

              <div className="program-number">
                03
              </div>

              <div>

                <span className="program-label">
                  AI POWERED
                </span>

                <h3>
                  Pengembangan Skill
                </h3>

                <p>
                  Jadwal latihan yang menyesuaikan perkembanganmu.
                </p>11

              </div>

              <div className="program-arrow">
                ↗
              </div>

            </a>

          </div>

        </section>


        {/* ================= QUOTE ================= */}

        <section className="quote-section">

          <div className="quote-mark">
            “
          </div>

          <h2>
            Skill bukan sekadar
            <br />

            <em>apa yang kamu pelajari,</em>

            <br />

            tetapi apa yang bisa
            <br />

            <strong>kamu buktikan.</strong>
          </h2>

        </section>


        {/* ================= CTA ================= */}

        <section className="cta-section">

          <div>

            <span>
              YOUR JOURNEY STARTS HERE
            </span>

            <h2>
              Siap mulai
              <br />
              berkembang?
            </h2>

          </div>

          <Link
            to="/register"
            className="cta-button"
          >
            Mulai Sekarang
            <span>→</span>
          </Link>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-logo">
          Courvia
        </div>

        <p>
          Platform pengembangan skill
          untuk generasi yang terus belajar.
        </p>

        <div className="footer-copy">
          © 2026 Courvia
        </div>

      </footer>

    </div>
  );
}

export default Landing;