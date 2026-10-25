import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SkillPractice.css";

const practiceData = {
  "coding-1": {
    category: "WEB DEVELOPMENT",
    type: "CHALLENGE",
    title: "Build a Responsive Navbar",
    description:
      "Latihan ini membantu kamu memahami bagaimana membuat navigation bar yang dapat menyesuaikan tampilan pada berbagai ukuran layar.",
    duration: "30 min",
    xp: 70,
    difficulty: "Medium",
    objective: [
      "Memahami struktur dasar navigation bar",
      "Menggunakan Flexbox untuk layout",
      "Membuat tampilan responsive",
    ],
    instruction:
      "Buat sebuah navigation bar sederhana menggunakan HTML dan CSS. Navigation bar harus memiliki logo di sebelah kiri dan tiga menu di sebelah kanan.",
    question:
      "Teknik CSS apa yang paling tepat digunakan untuk membuat item navigation tersusun secara horizontal dan mudah disesuaikan?",
    options: [
      "CSS Flexbox",
      "CSS Animation",
      "CSS Filter",
      "CSS Shadow",
    ],
    answer: 0,
  },

  "coding-2": {
    category: "WEB DEVELOPMENT",
    type: "PRACTICE",
    title: "JavaScript Array Methods",
    description:
      "Latihan untuk memahami penggunaan method array yang sering digunakan dalam pengembangan aplikasi JavaScript.",
    duration: "25 min",
    xp: 50,
    difficulty: "Medium",
    objective: [
      "Memahami konsep array",
      "Mengenal method map dan filter",
      "Mengolah data menggunakan JavaScript",
    ],
    instruction:
      "Perhatikan sebuah array berisi daftar angka. Gunakan method JavaScript yang sesuai untuk menghasilkan data baru dari array tersebut.",
    question:
      "Method JavaScript mana yang digunakan untuk menghasilkan array baru dari setiap elemen array?",
    options: ["map()", "push()", "pop()", "shift()"],
    answer: 0,
  },

  "design-1": {
    category: "UI/UX DESIGN",
    type: "PRACTICE",
    title: "Create a Mobile Wireframe",
    description:
      "Latihan membuat wireframe sederhana untuk memahami struktur dan hierarki sebuah interface mobile.",
    duration: "35 min",
    xp: 80,
    difficulty: "Medium",
    objective: [
      "Memahami fungsi wireframe",
      "Menyusun hierarchy interface",
      "Menentukan posisi elemen utama",
    ],
    instruction:
      "Buat wireframe halaman utama aplikasi mobile dengan fokus pada struktur layout, bukan visual atau warna.",
    question:
      "Apa tujuan utama dari wireframe dalam proses desain UI/UX?",
    options: [
      "Menentukan struktur dan layout interface",
      "Menentukan warna brand",
      "Membuat animasi",
      "Menulis kode aplikasi",
    ],
    answer: 0,
  },

  "design-2": {
    category: "UI/UX DESIGN",
    type: "PRACTICE",
    title: "Analyze User Flow",
    description:
      "Latihan untuk memahami bagaimana pengguna berpindah dari satu tahap ke tahap lainnya ketika menggunakan sebuah aplikasi.",
    duration: "25 min",
    xp: 50,
    difficulty: "Medium",
    objective: [
      "Memahami konsep user flow",
      "Mengidentifikasi langkah pengguna",
      "Mengevaluasi pengalaman pengguna",
    ],
    instruction:
      "Analisis alur pengguna ketika melakukan sebuah aktivitas dalam aplikasi, mulai dari halaman awal sampai tujuan pengguna tercapai.",
    question:
      "Apa fungsi utama user flow dalam proses desain UI/UX?",
    options: [
      "Memahami langkah pengguna dalam mencapai tujuan",
      "Menentukan warna utama aplikasi",
      "Membuat logo aplikasi",
      "Menentukan ukuran database",
    ],
    answer: 0,
  },

  "english-1": {
    category: "ENGLISH SPEAKING",
    type: "CHALLENGE",
    title: "Job Interview Practice",
    description:
      "Latihan simulasi interview untuk membantu meningkatkan kemampuan komunikasi profesional dalam bahasa Inggris.",
    duration: "30 min",
    xp: 70,
    difficulty: "Medium",
    objective: [
      "Melatih komunikasi profesional",
      "Meningkatkan confidence",
      "Menggunakan vocabulary interview",
    ],
    instruction:
      "Bayangkan kamu sedang mengikuti interview kerja. Jawab pertanyaan dengan struktur yang jelas dan gunakan bahasa Inggris yang natural.",
    question:
      "Which opening is most appropriate for a professional job interview?",
    options: [
      "Hey, what's up?",
      "Good morning, thank you for having me.",
      "Yo, nice to meet you.",
      "What's going on?",
    ],
    answer: 1,
  },

  "english-2": {
    category: "ENGLISH SPEAKING",
    type: "PRACTICE",
    title: "Vocabulary Sprint",
    description:
      "Latihan singkat untuk memperluas vocabulary bahasa Inggris yang sering digunakan dalam komunikasi sehari-hari.",
    duration: "15 min",
    xp: 30,
    difficulty: "Easy",
    objective: [
      "Menambah vocabulary",
      "Memahami penggunaan kata",
      "Meningkatkan kemampuan komunikasi",
    ],
    instruction:
      "Pilih kata yang paling tepat untuk melengkapi kalimat bahasa Inggris berikut.",
    question:
      "Which word best completes the sentence: 'I am very ___ to meet you.'?",
    options: [
      "happy",
      "quickly",
      "yesterday",
      "running",
    ],
    answer: 0,
  },

  "music-1": {
    category: "GUITAR",
    type: "CHALLENGE",
    title: "Chord Transition Challenge",
    description:
      "Latihan untuk meningkatkan kecepatan dan ketepatan perpindahan antar chord dasar.",
    duration: "25 min",
    xp: 60,
    difficulty: "Medium",
    objective: [
      "Melatih perpindahan chord",
      "Meningkatkan koordinasi tangan",
      "Menjaga rhythm tetap stabil",
    ],
    instruction:
      "Latih perpindahan antara chord C, G, Am, dan F secara berulang dengan tempo yang stabil.",
    question:
      "Apa hal terpenting ketika berlatih chord transition?",
    options: [
      "Kecepatan tanpa memperhatikan suara",
      "Konsistensi dan ketepatan perpindahan",
      "Menghafal sebanyak mungkin chord",
      "Menggunakan tempo secepat mungkin",
    ],
    answer: 1,
  },

  "music-2": {
    category: "GUITAR",
    type: "PRACTICE",
    title: "Practice Song: Perfect",
    description:
      "Latihan memainkan lagu Perfect untuk mengembangkan kemampuan chord transition, rhythm, dan konsistensi bermain gitar.",
    duration: "30 min",
    xp: 70,
    difficulty: "Medium",
    objective: [
      "Melatih chord progression",
      "Menjaga rhythm lagu",
      "Meningkatkan konsistensi bermain",
    ],
    instruction:
      "Latih bagian lagu secara perlahan. Fokus pada perpindahan chord yang bersih dan pertahankan tempo sebelum meningkatkan kecepatan.",
    question:
      "Apa pendekatan terbaik ketika mempelajari sebuah lagu baru menggunakan gitar?",
    options: [
      "Langsung memainkan lagu dengan tempo penuh",
      "Menghafal semua chord tanpa berlatih",
      "Berlatih perlahan lalu meningkatkan tempo secara bertahap",
      "Mengabaikan rhythm selama chord benar",
    ],
    answer: 2,
  },
};

function SkillPractice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const practice = practiceData[id] || practiceData["coding-1"];

  const skillKey = id ? id.split("-")[0] : "coding";

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setSubmitted(true);
  };

  const handleComplete = () => {
    const taskStorageKey = `courvia_tasks_${skillKey}`;
    const xpStorageKey = `courvia_xp_${skillKey}`;

    let savedTasks = [];

    try {
      const storedTasks = localStorage.getItem(taskStorageKey);

      if (storedTasks) {
        savedTasks = JSON.parse(storedTasks);
      }
    } catch (error) {
      console.error("Gagal membaca data practice:", error);
    }

    /*
      Jika data task belum tersedia di localStorage,
      buat fallback berdasarkan practice yang sedang dikerjakan.
    */
    if (!Array.isArray(savedTasks) || savedTasks.length === 0) {
      savedTasks = [
        {
          title: practice.title,
          type: practice.type,
          duration: practice.duration,
          xp: practice.xp,
          difficulty: practice.difficulty,
          completed: false,
          practiceId: id,
        },
      ];
    }

    /*
      Cari practice berdasarkan practiceId.
    */
    const taskIndex = savedTasks.findIndex(
      (task) => task.practiceId === id
    );

    let updatedTasks = [...savedTasks];
    let alreadyCompleted = false;

    if (taskIndex !== -1) {
      alreadyCompleted = Boolean(
        updatedTasks[taskIndex].completed
      );

      if (!alreadyCompleted) {
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          completed: true,
        };
      }
    } else {
      /*
        Kalau task belum ada di localStorage,
        tambahkan sebagai task baru.
      */
      updatedTasks.push({
        title: practice.title,
        type: practice.type,
        duration: practice.duration,
        xp: practice.xp,
        difficulty: practice.difficulty,
        completed: true,
        practiceId: id,
      });
    }

    /*
      Simpan status task terbaru.
    */
    localStorage.setItem(
      taskStorageKey,
      JSON.stringify(updatedTasks)
    );

    /*
      XP hanya ditambahkan jika practice
      belum pernah diselesaikan sebelumnya.
    */
    if (!alreadyCompleted) {
      const storedXP = localStorage.getItem(xpStorageKey);

      const currentXP =
        storedXP !== null
          ? Number(storedXP)
          : 0;

      const newXP = currentXP + practice.xp;

      localStorage.setItem(
        xpStorageKey,
        newXP.toString()
      );
    }

    /*
      Simpan jumlah practice yang sudah selesai.
    */
    const completedCount = updatedTasks.filter(
      (task) => task.completed
    ).length;

    localStorage.setItem(
      `courvia_completed_${skillKey}`,
      completedCount.toString()
    );

    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="practice-success-page">
        <div className="practice-success-card">
          <div className="success-icon">
            ✓
          </div>

          <span>MISSION COMPLETED</span>

          <h1>
            Nice work.
            <br />
            <em>Keep going.</em>
          </h1>

          <p>
            Kamu berhasil menyelesaikan latihan
            dan mendapatkan XP untuk skill-mu.
          </p>

          <div className="earned-xp">
            <small>XP EARNED</small>
            <strong>+{practice.xp}</strong>
          </div>

          <button
            onClick={() => navigate("/skill")}
          >
            Back to Skill Development
            <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-practice-page">
      {/* NAVBAR */}
      <nav className="practice-navbar">
        <button
          className="practice-logo"
          onClick={() => navigate("/skill")}
        >
          Courvia
        </button>

        <button
          className="practice-back"
          onClick={() => navigate("/skill")}
        >
          ← Back to Skill Development
        </button>
      </nav>

      <main className="practice-main">
        {/* HEADER */}
        <section className="practice-detail-header">
          <div>
            <span className="practice-category">
              {practice.category}
            </span>

            <div className="practice-badges">
              <span>{practice.type}</span>
              <span>{practice.difficulty}</span>
              <span>{practice.duration}</span>
            </div>

            <h1>{practice.title}</h1>

            <p>
              {practice.description}
            </p>
          </div>

          <div className="practice-xp-card">
            <span>REWARD</span>

            <strong>
              +{practice.xp}
            </strong>

            <small>XP</small>
          </div>
        </section>

        {/* CONTENT */}
        <section className="practice-content-layout">
          {/* LEFT */}
          <div className="practice-instructions">
            <div className="instruction-section">
              <span>01 · OBJECTIVE</span>

              <h2>
                What you'll
                <br />
                <em>practice</em>
              </h2>

              <div className="objective-list">
                {practice.objective.map(
                  (item, index) => (
                    <div
                      key={item}
                      className="objective-item"
                    >
                      <strong>
                        0{index + 1}
                      </strong>

                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="instruction-section">
              <span>02 · INSTRUCTION</span>

              <h2>
                Your
                <br />
                <em>challenge</em>
              </h2>

              <div className="instruction-box">
                <div className="instruction-icon">
                  →
                </div>

                <p>
                  {practice.instruction}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="practice-challenge">
            <div className="challenge-top">
              <span>
                03 · KNOWLEDGE CHECK
              </span>

              <div>
                {submitted ? "1/1" : "0/1"}
              </div>
            </div>

            <h2>
              {practice.question}
            </h2>

            <div className="answer-options">
              {practice.options.map(
                (option, index) => {
                  let className =
                    "answer-option";

                  if (
                    selectedAnswer === index
                  ) {
                    className += " selected";
                  }

                  if (
                    submitted &&
                    index === practice.answer
                  ) {
                    className += " correct";
                  }

                  if (
                    submitted &&
                    selectedAnswer === index &&
                    index !== practice.answer
                  ) {
                    className += " wrong";
                  }

                  return (
                    <button
                      key={option}
                      className={className}
                      onClick={() =>
                        !submitted &&
                        setSelectedAnswer(index)
                      }
                    >
                      <span>
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      <p>{option}</p>

                      {submitted &&
                        index ===
                          practice.answer && (
                          <strong>
                            ✓
                          </strong>
                        )}
                    </button>
                  );
                }
              )}
            </div>

            {!submitted && (
              <button
                className="submit-practice"
                disabled={
                  selectedAnswer === null
                }
                onClick={handleSubmit}
              >
                Submit Answer
                <span>→</span>
              </button>
            )}

            {submitted && (
              <div
                className={
                  selectedAnswer ===
                  practice.answer
                    ? "answer-feedback success"
                    : "answer-feedback error"
                }
              >
                <div>
                  {selectedAnswer ===
                  practice.answer
                    ? "✓"
                    : "!"}
                </div>

                <section>
                  <strong>
                    {selectedAnswer ===
                    practice.answer
                      ? "Correct answer"
                      : "Not quite"}
                  </strong>

                  <p>
                    {selectedAnswer ===
                    practice.answer
                      ? `Great job You earned ${practice.xp} XP from this practice.`
                      : "Review the instruction and try to understand the concept before continuing."}
                  </p>
                </section>
              </div>
            )}

            {submitted &&
              selectedAnswer ===
                practice.answer && (
                <button
                  className="complete-practice"
                  onClick={handleComplete}
                >
                  Complete Practice
                  <span>✓</span>
                </button>
              )}
          </div>
        </section>

        {/* FOOTER TIP */}
        <section className="practice-tip">
          <div className="tip-icon">
            ✦
          </div>

          <div>
            <span>COURVIA TIP</span>

            <p>
              Konsistensi lebih penting daripada
              menyelesaikan banyak latihan sekaligus.
              Luangkan waktu sedikit setiap hari
              untuk membangun skill secara bertahap.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SkillPractice;