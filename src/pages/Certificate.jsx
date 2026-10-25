import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Certificate.css";

import { supabase } from "../lib/supabaseClient";

function Certificate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCertificate = async () => {
      setLoading(true);
      setError("");

      try {
        // Ambil user yang sedang login
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !currentUser) {
          setError("Kamu harus login terlebih dahulu.");
          return;
        }

        setUser(currentUser);

        // Ambil data course
        const { data: courseData, error: courseError } =
          await supabase
            .from("courses")
            .select("*")
            .eq("id", Number(id))
            .single();

        if (courseError) {
          console.error(courseError);
          setError("Data course tidak ditemukan.");
          return;
        }

        setCourse(courseData);

        // Ambil hasil evaluasi user
        const {
          data: evaluationData,
          error: evaluationError,
        } = await supabase
          .from("course_evaluations")
          .select("score, passed, completed_at")
          .eq("user_id", currentUser.id)
          .eq("course_id", Number(id))
          .maybeSingle();

        if (evaluationError) {
          console.error(evaluationError);
          setError("Hasil evaluasi tidak dapat dimuat.");
          return;
        }

        // Belum pernah mengikuti evaluasi
        if (!evaluationData) {
          setError(
            "Kamu belum menyelesaikan evaluasi course ini."
          );
          return;
        }

        // Tidak lulus
        if (!evaluationData.passed) {
          setError(
            "Sertifikat belum tersedia karena kamu belum lulus evaluasi."
          );
          return;
        }

        setEvaluation(evaluationData);
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan saat memuat sertifikat.");
      } finally {
        setLoading(false);
      }
    };

    loadCertificate();
  }, [id]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="certificate-page">
        <div className="certificate-loading">
          Memuat sertifikat...
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <div className="certificate-page">
        <div className="certificate-error">

          <div className="certificate-error-icon">
            ×
          </div>

          <h1>Sertifikat Belum Tersedia</h1>

          <p>{error}</p>

          <button
            onClick={() =>
              navigate(`/course/${id}/evaluation`)
            }
          >
            Kembali ke Evaluasi
          </button>

        </div>
      </div>
    );
  }

  // ==============================
  // USER NAME
  // ==============================

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Peserta";

  // ==============================
  // CERTIFICATE NUMBER
  // ==============================

  const certificateNumber =
    `CV-${Number(id)
      .toString()
      .padStart(3, "0")}-${user?.id
      ?.replace(/-/g, "")
      .slice(0, 8)
      .toUpperCase()}`;

  // ==============================
  // DATE
  // ==============================

  const certificateDate = evaluation?.completed_at
    ? new Date(
        evaluation.completed_at
      ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  // ==============================
  // CERTIFICATE
  // ==============================

  return (
    <div className="certificate-page">

      <div className="certificate-topbar">

        <button
          className="certificate-back"
          onClick={() =>
            navigate(`/course/${id}/learn`)
          }
        >
          ← Kembali
        </button>

        <button
          className="certificate-print"
          onClick={() => window.print()}
        >
          Cetak Sertifikat
        </button>

      </div>

      <main className="certificate-container">

        <div className="certificate">

          <div className="certificate-border">

            <div className="certificate-content">

              <div className="certificate-brand">
                Courvia
              </div>

              <span className="certificate-label">
                CERTIFICATE OF COMPLETION
              </span>

              <h1>
                Sertifikat Kelulusan
              </h1>

              <p className="certificate-intro">
                Dengan ini menyatakan bahwa
              </p>

              <h2 className="certificate-name">
                {userName}
              </h2>

              <p className="certificate-description">
                telah berhasil menyelesaikan course
              </p>

              <h3 className="certificate-course">
                {course.title}
              </h3>

              <p className="certificate-description">
                dan dinyatakan <strong>lulus</strong> berdasarkan
                hasil evaluasi kompetensi dengan nilai
              </p>

              <div className="certificate-score">
                {evaluation.score}
                <span>/100</span>
              </div>

              <div className="certificate-divider" />

              <div className="certificate-footer">

                <div>
                  <span>
                    Tanggal Kelulusan
                  </span>

                  <strong>
                    {certificateDate}
                  </strong>
                </div>

                <div className="certificate-seal">
                  <span>✓</span>
                  <small>
                    VERIFIED
                  </small>
                </div>

                <div>
                  <span>
                    Certificate ID
                  </span>

                  <strong>
                    {certificateNumber}
                  </strong>
                </div>

              </div>

              <div className="certificate-signature">
                Courvia Learning Platform
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Certificate;