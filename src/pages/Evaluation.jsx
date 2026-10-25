import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Evaluation.css";

import { supabase } from "../lib/supabaseClient";

const evaluationData = {
  1: {
    title: "Web Development Fundamentals",
    category: "PROGRAMMING",
    questions: [
      {
        question: "Apa fungsi utama HTML dalam pengembangan website?",
        options: [
          "Mengatur struktur halaman website",
          "Mengatur database",
          "Mengatur koneksi internet",
          "Mengatur server",
        ],
        answer: 0,
      },
      {
        question: "Apa fungsi utama CSS?",
        options: [
          "Menyimpan data pengguna",
          "Mengatur tampilan dan desain website",
          "Membuat database",
          "Menghubungkan website ke server",
        ],
        answer: 1,
      },
      {
        question: "JavaScript digunakan untuk?",
        options: [
          "Membuat website menjadi interaktif",
          "Membuat kabel jaringan",
          "Mengatur sistem operasi",
          "Membuat database fisik",
        ],
        answer: 0,
      },
      {
        question: "Tag HTML untuk membuat judul utama adalah?",
        options: [
          "<p>",
          "<div>",
          "<h1>",
          "<body>",
        ],
        answer: 2,
      },
      {
        question: "Manakah yang termasuk bahasa pemrograman?",
        options: [
          "HTML",
          "CSS",
          "JavaScript",
          "JPEG",
        ],
        answer: 2,
      },
    ],
  },

  2: {
    title: "UI/UX Design Fundamentals",
    category: "DESIGN",
    questions: [
      {
        question: "Apa kepanjangan dari UX?",
        options: [
          "User Experience",
          "User Extension",
          "User Example",
          "Universal Experience",
        ],
        answer: 0,
      },
      {
        question: "Tujuan utama UI Design adalah?",
        options: [
          "Membuat database",
          "Menciptakan tampilan antarmuka yang baik",
          "Mengatur server",
          "Mengelola jaringan",
        ],
        answer: 1,
      },
      {
        question: "Apa fungsi user persona?",
        options: [
          "Menggambarkan karakteristik pengguna target",
          "Menghitung biaya aplikasi",
          "Membuat database",
          "Mengatur kode program",
        ],
        answer: 0,
      },
      {
        question: "Wireframe digunakan untuk?",
        options: [
          "Membuat struktur awal sebuah interface",
          "Membuat server",
          "Mengatur database",
          "Mengukur kecepatan internet",
        ],
        answer: 0,
      },
      {
        question: "Apa yang menjadi fokus utama UX Design?",
        options: [
          "Pengalaman pengguna",
          "Ukuran server",
          "Bahasa pemrograman",
          "Jenis database",
        ],
        answer: 0,
      },
    ],
  },

  3: {
    title: "Digital Business Strategy",
    category: "BUSINESS",
    questions: [
      {
        question: "Apa tujuan utama strategi bisnis digital?",
        options: [
          "Mengembangkan bisnis dengan memanfaatkan teknologi digital",
          "Mengurangi penggunaan teknologi",
          "Menghapus seluruh proses bisnis",
          "Membatasi pelanggan",
        ],
        answer: 0,
      },
      {
        question: "Apa yang dimaksud dengan customer journey?",
        options: [
          "Perjalanan pengalaman pelanggan ketika berinteraksi dengan bisnis",
          "Perjalanan karyawan",
          "Perjalanan distribusi barang",
          "Perjalanan pemilik bisnis",
        ],
        answer: 0,
      },
      {
        question: "Digital marketing digunakan untuk?",
        options: [
          "Mempromosikan produk melalui kanal digital",
          "Mengelola gudang secara manual",
          "Menghapus data pelanggan",
          "Mengganti seluruh karyawan",
        ],
        answer: 0,
      },
      {
        question: "Contoh kanal digital marketing adalah?",
        options: [
          "Media sosial",
          "Buku tulis",
          "Papan tulis",
          "Surat pribadi",
        ],
        answer: 0,
      },
      {
        question: "Business model menjelaskan?",
        options: [
          "Bagaimana bisnis menciptakan dan menghasilkan nilai",
          "Warna logo perusahaan",
          "Ukuran kantor",
          "Jumlah meja kerja",
        ],
        answer: 0,
      },
    ],
  },

  4: {
    title: "Career Preparation",
    category: "CAREER",
    questions: [
      {
        question: "Apa tujuan utama personal branding?",
        options: [
          "Membangun citra profesional yang sesuai dengan kemampuan diri",
          "Menghapus pengalaman kerja",
          "Membuat CV lebih panjang",
          "Menghindari networking",
        ],
        answer: 0,
      },
      {
        question: "Apa yang sebaiknya dicantumkan dalam CV?",
        options: [
          "Informasi yang relevan dengan posisi yang dilamar",
          "Semua informasi pribadi",
          "Password akun",
          "Data yang tidak berhubungan dengan pekerjaan",
        ],
        answer: 0,
      },
      {
        question: "Apa tujuan portfolio?",
        options: [
          "Menunjukkan hasil karya dan kemampuan",
          "Menggantikan identitas",
          "Menyimpan password",
          "Menghapus pengalaman",
        ],
        answer: 0,
      },
      {
        question: "Apa yang sebaiknya dilakukan sebelum interview?",
        options: [
          "Mempelajari perusahaan dan posisi yang dilamar",
          "Tidak mencari informasi perusahaan",
          "Datang tanpa persiapan",
          "Menghindari latihan komunikasi",
        ],
        answer: 0,
      },
      {
        question: "Komunikasi profesional sebaiknya dilakukan dengan?",
        options: [
          "Jelas, sopan, dan sesuai konteks",
          "Tidak terstruktur",
          "Menggunakan bahasa yang kasar",
          "Mengabaikan lawan bicara",
        ],
        answer: 0,
      },
    ],
  },

  5: {
    title: "AI for Productivity",
    category: "AI",
    questions: [
      {
        question: "Apa manfaat AI dalam produktivitas?",
        options: [
          "Membantu menyelesaikan pekerjaan secara lebih efisien",
          "Menghapus seluruh pekerjaan manusia",
          "Menghilangkan kebutuhan belajar",
          "Menghapus semua data",
        ],
        answer: 0,
      },
      {
        question: "Apa yang dimaksud dengan prompt?",
        options: [
          "Instruksi yang diberikan kepada AI",
          "Database komputer",
          "Jenis perangkat keras",
          "Sistem operasi",
        ],
        answer: 0,
      },
      {
        question: "Prompt yang baik sebaiknya?",
        options: [
          "Jelas dan memiliki konteks",
          "Tidak memiliki tujuan",
          "Sangat ambigu",
          "Tidak memberikan informasi",
        ],
        answer: 0,
      },
      {
        question: "AI dapat digunakan untuk membantu?",
        options: [
          "Meringkas informasi",
          "Menggantikan semua keputusan manusia",
          "Menghilangkan kebutuhan verifikasi",
          "Menghapus internet",
        ],
        answer: 0,
      },
      {
        question: "Mengapa hasil AI perlu diperiksa?",
        options: [
          "Karena AI dapat menghasilkan informasi yang kurang tepat",
          "Karena AI selalu salah",
          "Karena AI tidak dapat menghasilkan teks",
          "Karena AI tidak dapat digunakan untuk belajar",
        ],
        answer: 0,
      },
    ],
  },

  6: {
    title: "Data Analysis Basic",
    category: "DATA",
    questions: [
      {
        question: "Apa tujuan utama analisis data?",
        options: [
          "Mendapatkan informasi dan insight dari data",
          "Menghapus semua data",
          "Mengubah data menjadi gambar saja",
          "Menyimpan data tanpa tujuan",
        ],
        answer: 0,
      },
      {
        question: "Apa yang dimaksud dengan data cleaning?",
        options: [
          "Membersihkan dan memperbaiki data yang bermasalah",
          "Menghapus seluruh dataset",
          "Mencetak data",
          "Mengubah komputer",
        ],
        answer: 0,
      },
      {
        question: "Apa fungsi visualisasi data?",
        options: [
          "Membantu memahami pola dan informasi dalam data",
          "Menghapus data",
          "Mengganti database",
          "Mengurangi jumlah pengguna",
        ],
        answer: 0,
      },
      {
        question: "Contoh visualisasi data adalah?",
        options: [
          "Bar chart",
          "Password",
          "Folder",
          "Keyboard",
        ],
        answer: 0,
      },
      {
        question: "Apa langkah penting sebelum melakukan analisis?",
        options: [
          "Memahami dan mempersiapkan data",
          "Menghapus semua data",
          "Mengabaikan kualitas data",
          "Mengubah semua nilai secara acak",
        ],
        answer: 0,
      },
    ],
  },
};

function Evaluation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const evaluation = evaluationData[id] || evaluationData[1];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // LOAD HASIL EVALUASI
  // ==============================

  useEffect(() => {
    const loadEvaluationResult = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        return;
      }

      const { data, error: evaluationError } = await supabase
        .from("course_evaluations")
        .select("score, passed")
        .eq("user_id", user.id)
        .eq("course_id", Number(id))
        .maybeSingle();

      if (evaluationError) {
        console.error(
          "Gagal mengambil hasil evaluasi:",
          evaluationError
        );

        setError("Hasil evaluasi belum dapat dimuat.");
      } else if (data) {
        const correct = Math.round(
          (data.score / 100) * evaluation.questions.length
        );

        setResult({
          score: data.score,
          correct,
          total: evaluation.questions.length,
          passed: data.passed,
        });
      }

      setLoading(false);
    };

    loadEvaluationResult();
  }, [id, evaluation.questions.length]);

  // ==============================
  // PILIH JAWABAN
  // ==============================

  const selectAnswer = (answerIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answerIndex,
    });
  };

  // ==============================
  // NEXT
  // ==============================

  const nextQuestion = () => {
    if (
      currentQuestion <
      evaluation.questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // ==============================
  // PREVIOUS
  // ==============================

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // ==============================
  // SUBMIT EVALUATION
  // ==============================

  const submitEvaluation = async () => {
    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Kamu harus login terlebih dahulu.");
        return;
      }

      let correct = 0;

      evaluation.questions.forEach((item, index) => {
        if (answers[index] === item.answer) {
          correct++;
        }
      });

      const score = Math.round(
        (correct / evaluation.questions.length) * 100
      );

      const passed = score >= 70;

      const { error: saveError } = await supabase
        .from("course_evaluations")
        .upsert(
          {
            user_id: user.id,
            course_id: Number(id),
            score,
            passed,
            completed_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,course_id",
          }
        );

      if (saveError) {
        console.error(
          "Gagal menyimpan evaluasi:",
          saveError
        );

        setError(
          "Hasil evaluasi gagal disimpan. Silakan coba lagi."
        );

        return;
      }

      setResult({
        score,
        correct,
        total: evaluation.questions.length,
        passed,
      });
    } catch (error) {
      console.error(error);

      setError(
        "Terjadi kesalahan saat menyimpan evaluasi."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="evaluation-page result-page">
        <div className="result-card">
          <p>Memuat evaluasi...</p>
        </div>
      </div>
    );
  }

  // ==============================
  // RESULT
  // ==============================

  if (result) {
    return (
      <div className="evaluation-page result-page">

        <div className="result-card">

          <span className="result-label">
            EVALUATION RESULT
          </span>

          <div
            className={`result-icon ${
              result.passed ? "passed" : "failed"
            }`}
          >
            {result.passed ? "✓" : "×"}
          </div>

          <h1>
            {result.passed
              ? "Selamat, kamu lulus!"
              : "Belum lulus"}
          </h1>

          <p>
            {result.passed
              ? "Kamu telah berhasil menunjukkan pemahaman terhadap materi course."
              : "Nilaimu belum mencapai batas kelulusan. Pelajari kembali materi dan coba evaluasi lagi."}
          </p>

          <div className="score-box">

            <span>
              YOUR SCORE
            </span>

            <strong>
              {result.score}
            </strong>

            <small>
              / 100
            </small>

          </div>

          <div className="result-summary">

            <div>
              <strong>
                {result.correct}
              </strong>
              <span>
                Jawaban benar
              </span>
            </div>

            <div>
              <strong>
                {result.total - result.correct}
              </strong>
              <span>
                Jawaban salah
              </span>
            </div>

            <div>
              <strong>
                70
              </strong>
              <span>
                Nilai minimum
              </span>
            </div>

          </div>

          {result.passed ? (
            <button
              className="certificate-button"
              onClick={() =>
                navigate(`/course/${id}/certificate`)
              }
            >
              Lihat Sertifikat
              <span>→</span>
            </button>
          ) : (
            <button
              className="retry-button"
              onClick={() => {
                setAnswers({});
                setCurrentQuestion(0);
                setResult(null);
              }}
            >
              Ulangi Evaluasi
              <span>↻</span>
            </button>
          )}

          <button
            className="back-course-button"
            onClick={() =>
              navigate(`/course/${id}/learn`)
            }
          >
            ← Kembali ke Pembelajaran
          </button>

        </div>

      </div>
    );
  }

  // ==============================
  // EVALUATION PAGE
  // ==============================

  const question = evaluation.questions[currentQuestion];

  return (
    <div className="evaluation-page">

      <header className="evaluation-header">

        <button
          className="evaluation-logo"
          onClick={() =>
            navigate(`/course/${id}/learn`)
          }
        >
          Courvia
        </button>

        <div className="evaluation-course">

          <span>
            {evaluation.category}
          </span>

          <strong>
            {evaluation.title}
          </strong>

        </div>

        <span className="evaluation-counter">
          {currentQuestion + 1} /{" "}
          {evaluation.questions.length}
        </span>

      </header>

      <main className="evaluation-main">

        {error && (
          <div className="evaluation-error">
            {error}
          </div>
        )}

        <div className="evaluation-progress">

          {evaluation.questions.map((_, index) => (

            <div
              key={index}
              className={`evaluation-progress-item ${
                index < currentQuestion
                  ? "completed"
                  : index === currentQuestion
                  ? "active"
                  : ""
              }`}
            />

          ))}

        </div>

        <section className="question-card">

          <span className="question-label">
            QUESTION{" "}
            {String(currentQuestion + 1).padStart(2, "0")}
          </span>

          <h1>
            {question.question}
          </h1>

          <div className="answer-list">

            {question.options.map(
              (option, index) => {

                const selected =
                  answers[currentQuestion] === index;

                return (
                  <button
                    key={index}
                    className={`answer-option ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      selectAnswer(index)
                    }
                  >

                    <span className="answer-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="answer-text">
                      {option}
                    </span>

                    <span className="answer-check">
                      {selected ? "✓" : ""}
                    </span>

                  </button>
                );
              }
            )}

          </div>

        </section>

        <div className="evaluation-navigation">

          <button
            className="evaluation-previous"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Sebelumnya
          </button>

          {currentQuestion ===
          evaluation.questions.length - 1 ? (
            <button
              className="evaluation-submit"
              onClick={submitEvaluation}
              disabled={
                saving ||
                answers[currentQuestion] === undefined
              }
            >
              {saving
                ? "Menyimpan..."
                : "Kirim Evaluasi"}
              <span>→</span>
            </button>
          ) : (
            <button
              className="evaluation-next"
              onClick={nextQuestion}
              disabled={
                answers[currentQuestion] === undefined
              }
            >
              Berikutnya
              <span>→</span>
            </button>
          )}

        </div>

      </main>

    </div>
  );
}

export default Evaluation;