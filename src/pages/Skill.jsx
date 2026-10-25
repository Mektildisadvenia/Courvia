import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

function Skill() {
  return (
    <div className="page-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        Kembali ke Beranda
      </Link>

      <div className="page-header">
        <span className="page-label">PENGEMBANGAN SKILL</span>

        <h1>
          Latihan Sesuai Kamu.
          <br />
          <span>Berkembang Setiap Hari.</span>
        </h1>

        <p>
          Dapatkan jadwal latihan personal berbasis AI yang menyesuaikan
          dengan perkembangan skill kamu.
        </p>
      </div>

      <div className="feature-card">
        <div className="icon-box">
          <Sparkles size={28} />
        </div>

        <div>
          <h2>AI Skill Development</h2>
          <p>
            Courvia membantu menyusun latihan personal untuk berbagai
            skill seperti coding, desain, alat musik, bahasa, dan lainnya.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Skill;