import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Learning.css";

const learningData = {
  1: [
    {
      title: "Introduction to Web Development",
      type: "VIDEO",
      duration: "12 min",
      description:
        "Kenali dasar-dasar web development dan bagaimana sebuah website bekerja dari sisi frontend.",
    },
    {
      title: "Mengenal HTML",
      type: "VIDEO",
      duration: "18 min",
      description:
        "Pelajari HTML sebagai bahasa markup yang digunakan untuk membangun struktur sebuah halaman website.",
    },
    {
      title: "HTML Structure & Elements",
      type: "MATERI",
      duration: "20 min",
      description:
        "Pelajari struktur HTML, elemen, tag, heading, paragraph, link, image, dan elemen dasar lainnya.",
    },
    {
      title: "Mengenal CSS",
      type: "VIDEO",
      duration: "16 min",
      description:
        "Pelajari bagaimana CSS digunakan untuk mengatur warna, ukuran, layout, dan tampilan sebuah website.",
    },
    {
      title: "CSS Layout & Styling",
      type: "MATERI",
      duration: "22 min",
      description:
        "Pelajari konsep layout menggunakan CSS serta cara membuat tampilan website menjadi lebih terstruktur.",
    },
    {
      title: "Introduction to JavaScript",
      type: "VIDEO",
      duration: "20 min",
      description:
        "Kenali JavaScript dan bagaimana bahasa pemrograman ini membuat sebuah website menjadi lebih interaktif.",
    },
  ],

  2: [
    {
      title: "Introduction to UI/UX",
      type: "VIDEO",
      duration: "15 min",
      description:
        "Kenali konsep dasar UI dan UX serta perbedaannya dalam proses pengembangan produk digital.",
    },
    {
      title: "User Research",
      type: "MATERI",
      duration: "20 min",
      description:
        "Pelajari bagaimana melakukan riset untuk memahami kebutuhan, masalah, dan perilaku pengguna.",
    },
    {
      title: "User Persona",
      type: "MATERI",
      duration: "18 min",
      description:
        "Pelajari cara membuat representasi pengguna berdasarkan hasil riset dan karakteristik target pengguna.",
    },
    {
      title: "Wireframe",
      type: "VIDEO",
      duration: "22 min",
      description:
        "Pelajari fungsi wireframe sebagai rancangan awal struktur dan tata letak sebuah produk digital.",
    },
    {
      title: "Design System",
      type: "MATERI",
      duration: "25 min",
      description:
        "Pelajari komponen dan aturan visual yang digunakan agar desain produk tetap konsisten.",
    },
  ],

  3: [
    {
      title: "Introduction to Digital Business",
      type: "VIDEO",
      duration: "15 min",
      description:
        "Pelajari konsep dasar bisnis digital dan bagaimana teknologi mengubah cara sebuah bisnis beroperasi.",
    },
    {
      title: "Business Model",
      type: "MATERI",
      duration: "20 min",
      description:
        "Pelajari bagaimana sebuah bisnis menciptakan, memberikan, dan mendapatkan nilai.",
    },
    {
      title: "Digital Marketing Strategy",
      type: "VIDEO",
      duration: "18 min",
      description:
        "Pelajari strategi pemasaran melalui berbagai kanal digital untuk menjangkau target pelanggan.",
    },
    {
      title: "Customer Journey",
      type: "MATERI",
      duration: "22 min",
      description:
        "Pelajari tahapan pengalaman pelanggan ketika berinteraksi dengan sebuah bisnis atau produk.",
    },
  ],

  4: [
    {
      title: "Membangun Personal Branding",
      type: "VIDEO",
      duration: "15 min",
      description:
        "Pelajari cara membangun personal branding yang profesional dan sesuai dengan kemampuan serta tujuan kariermu.",
    },
    {
      title: "Membuat CV yang Profesional",
      type: "MATERI",
      duration: "20 min",
      description:
        "Pelajari cara menyusun CV yang jelas, relevan, dan mampu menunjukkan kemampuan serta pengalamanmu.",
    },
    {
      title: "Membangun Portfolio",
      type: "VIDEO",
      duration: "18 min",
      description:
        "Pelajari cara menyusun portfolio yang dapat menunjukkan hasil karya dan kemampuan profesionalmu.",
    },
    {
      title: "Persiapan Interview",
      type: "MATERI",
      duration: "22 min",
      description:
        "Pelajari cara mempersiapkan diri menghadapi interview, mulai dari riset perusahaan hingga menjawab pertanyaan.",
    },
    {
      title: "Komunikasi Profesional",
      type: "VIDEO",
      duration: "17 min",
      description:
        "Pelajari cara berkomunikasi secara jelas, sopan, dan profesional di lingkungan kerja.",
    },
  ],

  5: [
    {
      title: "Introduction to AI",
      type: "VIDEO",
      duration: "15 min",
      description:
        "Kenali konsep dasar artificial intelligence dan bagaimana AI dapat membantu aktivitas sehari-hari.",
    },
    {
      title: "AI untuk Belajar",
      type: "MATERI",
      duration: "20 min",
      description:
        "Pelajari bagaimana AI dapat digunakan sebagai alat bantu dalam proses belajar dan mencari informasi.",
    },
    {
      title: "AI untuk Produktivitas",
      type: "VIDEO",
      duration: "18 min",
      description:
        "Pelajari cara memanfaatkan AI untuk membantu pekerjaan dan meningkatkan produktivitas.",
    },
    {
      title: "Prompt Engineering Basic",
      type: "MATERI",
      duration: "25 min",
      description:
        "Pelajari dasar membuat instruksi yang jelas dan efektif ketika berinteraksi dengan AI.",
    },
  ],

  6: [
    {
      title: "Introduction to Data Analysis",
      type: "VIDEO",
      duration: "15 min",
      description:
        "Kenali konsep dasar analisis data dan bagaimana data dapat digunakan untuk menghasilkan insight.",
    },
    {
      title: "Data Collection",
      type: "MATERI",
      duration: "18 min",
      description:
        "Pelajari proses pengumpulan data dan hal-hal yang perlu diperhatikan agar data dapat digunakan dengan baik.",
    },
    {
      title: "Data Cleaning",
      type: "VIDEO",
      duration: "20 min",
      description:
        "Pelajari proses membersihkan data dari kesalahan, duplikasi, dan nilai yang tidak sesuai.",
    },
    {
      title: "Data Visualization",
      type: "MATERI",
      duration: "22 min",
      description:
        "Pelajari cara menyajikan data dalam bentuk visual agar informasi dan pola lebih mudah dipahami.",
    },
  ],
};

function Learning() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLearningData() {
      setLoading(true);
      setError("");

      const {
        data: courseData,
        error: courseError,
      } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (courseError) {
        console.error(
          "Gagal mengambil course:",
          courseError
        );
        setError("Course gagal dimuat.");
        setLoading(false);
        return;
      }

      const lessons = learningData[id] || [];

      setCourse({
        ...courseData,
        lessons,
      });

      const {
        data: progressData,
        error: progressError,
      } = await supabase
        .from("course_progress")
        .select("completed_lessons, progress")
        .eq("course_id", id)
        .maybeSingle();

      if (progressError) {
        console.error(
          "Gagal mengambil progress:",
          progressError
        );
      }

      if (progressData) {
        const savedLessons =
          Array.isArray(progressData.completed_lessons)
            ? progressData.completed_lessons
            : [];

        setCompletedLessons(savedLessons);

        if (savedLessons.length > 0) {
          const firstIncomplete = lessons.findIndex(
            (_, index) => !savedLessons.includes(index)
          );

          if (firstIncomplete !== -1) {
            setCurrentLesson(firstIncomplete);
          } else {
            setCurrentLesson(lessons.length - 1);
          }
        }
      }

      setLoading(false);
    }

    loadLearningData();
  }, [id]);

  const saveProgress = async (updatedLessons) => {
    setSaving(true);

    const progress = Math.round(
      (updatedLessons.length / course.lessons.length) * 100
    );

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User belum login.");
      setSaving(false);
      return;
    }

    const { error: saveError } = await supabase
      .from("course_progress")
      .upsert(
        {
          user_id: user.id,
          course_id: Number(id),
          completed_lessons: updatedLessons,
          progress,
        },
        {
          onConflict: "user_id,course_id",
        }
      );

    if (saveError) {
      console.error(
        "Gagal menyimpan progress:",
        saveError
      );
    }

    setSaving(false);
  };

  const handleComplete = async () => {
    if (completedLessons.includes(currentLesson)) {
      return;
    }

    const updatedLessons = [
      ...completedLessons,
      currentLesson,
    ];

    setCompletedLessons(updatedLessons);

    await saveProgress(updatedLessons);
  };

  const handleNext = async () => {
    let updatedLessons = completedLessons;

    if (!completedLessons.includes(currentLesson)) {
      updatedLessons = [
        ...completedLessons,
        currentLesson,
      ];

      setCompletedLessons(updatedLessons);

      await saveProgress(updatedLessons);
    }

    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson((previous) => previous + 1);
    } else {
      navigate(`/course/${id}/evaluation`);
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson((previous) => previous - 1);
    }
  };

  const handleLessonClick = (index) => {
    setCurrentLesson(index);
  };

  if (loading) {
    return (
      <div className="learning-page">
        <main className="learning-main">
          <div className="lesson-description">
            <h2>Memuat course...</h2>
            <p>
              Courvia sedang mengambil materi pembelajaran.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="learning-page">
        <main className="learning-main">
          <div className="lesson-description">
            <h2>Course tidak ditemukan.</h2>
            <p>
              Course yang kamu pilih tidak dapat dimuat.
            </p>

            <button
              className="complete-button"
              onClick={() => navigate("/course")}
            >
              ← Kembali ke Course
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!course.lessons.length) {
    return (
      <div className="learning-page">
        <main className="learning-main">
          <div className="lesson-description">
            <h2>Materi belum tersedia.</h2>
            <p>
              Materi untuk course ini belum ditambahkan.
            </p>

            <button
              className="complete-button"
              onClick={() => navigate(`/course/${id}`)}
            >
              ← Kembali ke Detail Course
            </button>
          </div>
        </main>
      </div>
    );
  }

  const lesson = course.lessons[currentLesson];

  const progress = Math.round(
    (completedLessons.length / course.lessons.length) * 100
  );

  return (
    <div className="learning-page">

      <aside className="learning-sidebar">

        <div className="learning-logo">
          Courvia
        </div>

        <button
          className="learning-back"
          onClick={() =>
            navigate(`/course/${id}`)
          }
        >
          ← Course Detail
        </button>

        <div className="learning-course-info">

          <span>
            {course.category}
          </span>

          <h2>
            {course.title}
          </h2>

        </div>

        <div className="learning-progress">

          <div className="learning-progress-header">

            <span>
              YOUR PROGRESS
            </span>

            <strong>
              {progress}%
            </strong>

          </div>

          <div className="learning-progress-bar">

            <div
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <small>
            {completedLessons.length} dari{" "}
            {course.lessons.length} materi selesai
          </small>

        </div>

        <div className="learning-lessons">

          <span className="lesson-heading">
            COURSE CONTENT
          </span>

          {course.lessons.map((item, index) => {

            const isActive =
              currentLesson === index;

            const isCompleted =
              completedLessons.includes(index);

            return (
              <button
                key={index}
                className={`lesson-item ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  handleLessonClick(index)
                }
              >

                <div className="lesson-number">

                  {isCompleted
                    ? "✓"
                    : String(index + 1).padStart(2, "0")}

                </div>

                <div className="lesson-content">

                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.type} · {item.duration}
                  </small>

                </div>

              </button>
            );
          })}

        </div>

      </aside>

      <main className="learning-main">

        <header className="learning-topbar">

          <div>

            <span>
              {course.category}
            </span>

            <h1>
              {lesson.title}
            </h1>

          </div>

          <button
            className="learning-exit"
            onClick={() => navigate("/course")}
          >
            Keluar
          </button>

        </header>

        <section className="lesson-area">

          <div className="lesson-video">

            <div className="video-decoration">
              <span>
                COURVIA LEARNING
              </span>
            </div>

            <div className="play-button">
              ▶
            </div>

            <p>
              {lesson.type === "VIDEO"
                ? "Video pembelajaran"
                : "Materi pembelajaran"}
            </p>

          </div>

          <div className="lesson-description">

            <span>
              LESSON{" "}
              {String(currentLesson + 1).padStart(2, "0")}
            </span>

            <h2>
              {lesson.title}
            </h2>

            <p>
              {lesson.description}
            </p>

            <div className="learning-note">

              <strong>
                ✦ Learning Note
              </strong>

              <p>
                Pastikan kamu memahami materi ini
                sebelum melanjutkan ke materi
                berikutnya.
              </p>

            </div>

          </div>

        </section>

        <section className="lesson-navigation">

          <button
            className="previous-button"
            onClick={handlePrevious}
            disabled={currentLesson === 0}
          >
            ←
            <span>
              Sebelumnya
            </span>
          </button>

          <button
            className="complete-button"
            onClick={handleComplete}
            disabled={saving}
          >
            {saving
              ? "Menyimpan..."
              : completedLessons.includes(currentLesson)
              ? "✓ Materi Selesai"
              : "Tandai Selesai"}
          </button>

          <button
            className="next-button"
            onClick={handleNext}
            disabled={saving}
          >
            <span>
              {currentLesson ===
              course.lessons.length - 1
                ? "Mulai Evaluasi"
                : "Materi Berikutnya"}
            </span>

            →
          </button>

        </section>

      </main>

    </div>
  );
}

export default Learning;