import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SkillDevelopment.css";

const skillData = {
  coding: {
    name: "Web Development",
    category: "TECHNOLOGY",
    level: "Beginner",
    progress: 68,
    xp: 1240,
    nextLevel: 1800,
    streak: 12,
    completed: 24,
    total: 36,
    icon: "</>",
    description:
      "Bangun kemampuan coding secara bertahap melalui latihan yang disesuaikan dengan kemampuanmu.",
    tasks: [
      {
        title: "HTML Semantic Structure",
        type: "Practice",
        duration: "20 min",
        xp: 40,
        difficulty: "Easy",
        completed: true,
        practiceId: null,
      },
      {
        title: "Build a Responsive Navbar",
        type: "Challenge",
        duration: "30 min",
        xp: 70,
        difficulty: "Medium",
        completed: false,
        practiceId: "coding-1",
      },
      {
        title: "JavaScript Array Methods",
        type: "Practice",
        duration: "25 min",
        xp: 50,
        difficulty: "Medium",
        completed: false,
        practiceId: "coding-2",
      },
    ],
  },

  design: {
    name: "UI/UX Design",
    category: "DESIGN",
    level: "Intermediate",
    progress: 52,
    xp: 980,
    nextLevel: 1500,
    streak: 8,
    completed: 18,
    total: 32,
    icon: "✦",
    description:
      "Kembangkan kemampuan merancang pengalaman digital yang lebih intuitif, menarik, dan berorientasi pada pengguna.",
    tasks: [
      {
        title: "User Persona Exercise",
        type: "Practice",
        duration: "20 min",
        xp: 40,
        difficulty: "Easy",
        completed: true,
        practiceId: null,
      },
      {
        title: "Create a Mobile Wireframe",
        type: "Challenge",
        duration: "35 min",
        xp: 80,
        difficulty: "Medium",
        completed: false,
        practiceId: "design-1",
      },
      {
        title: "Analyze User Flow",
        type: "Practice",
        duration: "25 min",
        xp: 50,
        difficulty: "Medium",
        completed: false,
        practiceId: "design-2",
      },
    ],
  },

  english: {
    name: "English Speaking",
    category: "LANGUAGE",
    level: "Intermediate",
    progress: 41,
    xp: 760,
    nextLevel: 1400,
    streak: 5,
    completed: 15,
    total: 36,
    icon: "Aa",
    description:
      "Latih kemampuan berbicara bahasa Inggris melalui conversation practice yang disesuaikan dengan kemampuanmu.",
    tasks: [
      {
        title: "Daily Conversation",
        type: "Practice",
        duration: "15 min",
        xp: 30,
        difficulty: "Easy",
        completed: true,
        practiceId: null,
      },
      {
        title: "Job Interview Practice",
        type: "Challenge",
        duration: "30 min",
        xp: 70,
        difficulty: "Medium",
        completed: false,
        practiceId: "english-1",
      },
      {
        title: "Vocabulary Sprint",
        type: "Practice",
        duration: "15 min",
        xp: 30,
        difficulty: "Easy",
        completed: false,
        practiceId: "english-2",
      },
    ],
  },

  music: {
    name: "Guitar",
    category: "MUSIC",
    level: "Beginner",
    progress: 34,
    xp: 520,
    nextLevel: 1000,
    streak: 4,
    completed: 11,
    total: 32,
    icon: "♫",
    description:
      "Bangun kemampuan bermain gitar melalui latihan chord, rhythm, dan lagu yang menyesuaikan progresmu.",
    tasks: [
      {
        title: "Basic Chord Practice",
        type: "Practice",
        duration: "15 min",
        xp: 30,
        difficulty: "Easy",
        completed: true,
        practiceId: null,
      },
      {
        title: "Chord Transition Challenge",
        type: "Challenge",
        duration: "25 min",
        xp: 60,
        difficulty: "Medium",
        completed: false,
        practiceId: "music-1",
      },
      {
        title: "Practice Song: Perfect",
        type: "Practice",
        duration: "30 min",
        xp: 70,
        difficulty: "Medium",
        completed: false,
        practiceId: "music-2",
      },
    ],
  },
};

function SkillDevelopment() {
  const navigate = useNavigate();

  const [selectedSkill, setSelectedSkill] = useState("coding");

  const [tasks, setTasks] = useState(
    skillData.coding.tasks
  );

  const [xp, setXp] = useState(
    skillData.coding.xp
  );

  const [practiceDone, setPracticeDone] = useState(
    skillData.coding.tasks.filter(
      (task) => task.completed
    ).length
  );

  useEffect(() => {
    const selected = skillData[selectedSkill];

    const savedXP = localStorage.getItem(
      `courvia_xp_${selectedSkill}`
    );

    const savedTasks = localStorage.getItem(
      `courvia_tasks_${selectedSkill}`
    );

    if (savedXP !== null) {
      setXp(Number(savedXP));
    } else {
      setXp(selected.xp);
    }

    if (savedTasks !== null) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        setTasks(parsedTasks);

        setPracticeDone(
          parsedTasks.filter(
            (task) => task.completed
          ).length
        );
      } catch (error) {
        console.error(
          "Gagal membaca data practice:",
          error
        );

        setTasks(selected.tasks);

        setPracticeDone(
          selected.tasks.filter(
            (task) => task.completed
          ).length
        );
      }
    } else {
      setTasks(selected.tasks);

      setPracticeDone(
        selected.tasks.filter(
          (task) => task.completed
        ).length
      );
    }
  }, [selectedSkill]);

  const skill = skillData[selectedSkill];

  const handleSkillChange = (skillKey) => {
    setSelectedSkill(skillKey);
  };

  /*
    RESET PROGRESS
    --------------------------------
    Menghapus data localStorage untuk
    skill yang sedang dipilih.
  */
  const handleResetProgress = () => {
    const confirmed = window.confirm(
      `Reset progress ${skill.name}?\n\nXP dan status practice untuk skill ini akan dikembalikan ke kondisi awal.`
    );

    if (!confirmed) return;

    localStorage.removeItem(
      `courvia_tasks_${selectedSkill}`
    );

    localStorage.removeItem(
      `courvia_xp_${selectedSkill}`
    );

    localStorage.removeItem(
      `courvia_completed_${selectedSkill}`
    );

    const initialTasks = skillData[selectedSkill].tasks;

    setTasks(initialTasks);

    setXp(skillData[selectedSkill].xp);

    setPracticeDone(
      initialTasks.filter(
        (task) => task.completed
      ).length
    );
  };

  const initialCompleted =
    skill.tasks.filter(
      (task) => task.completed
    ).length;

  const additionalCompleted = Math.max(
    0,
    practiceDone - initialCompleted
  );

  const overallProgress = Math.min(
    100,
    Math.round(
      (
        (skill.completed +
          additionalCompleted) /
        skill.total
      ) *
        100
    )
  );

  const completionPercentage =
    tasks.length > 0
      ? Math.round(
          (practiceDone / tasks.length) * 100
        )
      : 0;

  return (
    <div className="skill-page">
      {/* =========================
          NAVBAR
      ========================== */}
      <nav className="skill-navbar">
        <button
          className="skill-logo"
          onClick={() => navigate("/")}
        >
          Courvia
        </button>

        <div className="skill-nav-links">
          <button
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/course")}
          >
            Course
          </button>

          <button
            onClick={() => navigate("/webinar")}
          >
            Webinar
          </button>

          <button className="active">
            Skill Development
          </button>
        </div>

        <div className="skill-profile">
          <span>NP</span>
        </div>
      </nav>

      {/* =========================
          HERO
      ========================== */}
      <main className="skill-main">
        <section className="skill-hero">
          <div className="skill-hero-content">
            <span className="skill-eyebrow">
              PERSONALIZED LEARNING
            </span>

            <h1>
              Build skills
              <br />
              <em>One practice at a time</em>
            </h1>

            <p>
              Courvia menyesuaikan latihan dengan
              progresmu agar kamu bisa berkembang
              secara konsisten setiap hari
            </p>

            <button
              className="start-practice-button"
              onClick={() => {
                const nextTask = tasks.find(
                  (task) =>
                    !task.completed &&
                    task.practiceId
                );

                if (nextTask) {
                  navigate(
                    `/skill/practice/${nextTask.practiceId}`
                  );
                }
              }}
            >
              Start Today's Practice
              <span>→</span>
            </button>
          </div>

          <div className="skill-hero-visual">
            <div className="skill-floating-card">
              <span>YOUR STREAK</span>

              <strong>
                {skill.streak}
              </strong>

              <small>days 🔥</small>
            </div>

            <div className="skill-floating-card xp-floating">
              <span>TOTAL XP</span>

              <strong>
                {xp.toLocaleString()}
              </strong>

              <small>XP earned</small>
            </div>
          </div>
        </section>

        {/* =========================
            SKILL SELECTOR
        ========================== */}
        <section className="skill-selector-section">
          <div className="section-heading">
            <div>
              <span>01 · YOUR SKILLS</span>

              <h2>
                Choose your
                <br />
                <em>focus</em>
              </h2>
            </div>

            <p>
              Pilih skill yang ingin kamu
              kembangkan hari ini.
            </p>
          </div>

          <div className="skill-selector">
            {Object.entries(skillData).map(
              ([key, item]) => (
                <button
                  key={key}
                  className={
                    selectedSkill === key
                      ? "skill-option active"
                      : "skill-option"
                  }
                  onClick={() =>
                    handleSkillChange(key)
                  }
                >
                  <span className="skill-option-icon">
                    {item.icon}
                  </span>

                  <div>
                    <small>
                      {item.category}
                    </small>

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.level}
                    </span>
                  </div>

                  <span className="skill-option-arrow">
                    →
                  </span>
                </button>
              )
            )}
          </div>
        </section>

        {/* =========================
            CURRENT SKILL
        ========================== */}
        <section className="current-skill-section">
          <div className="current-skill-header">
            <div>
              <span className="section-label">
                02 · CURRENT SKILL
              </span>

              <div className="current-skill-title">
                <div className="current-skill-icon">
                  {skill.icon}
                </div>

                <div>
                  <span>
                    {skill.category}
                  </span>

                  <h2>{skill.name}</h2>

                  <p>
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>

            {/* RESET BUTTON */}
            <button
              className="reset-progress-button"
              onClick={handleResetProgress}
              style={{
                border: "1px solid #d8d1ca",
                background: "transparent",
                color: "#7f746d",
                padding: "12px 18px",
                borderRadius: "999px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "13px",
                letterSpacing: "0.04em",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background =
                  "#34211B";
                event.currentTarget.style.color =
                  "#F7F5F1";
                event.currentTarget.style.borderColor =
                  "#34211B";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background =
                  "transparent";
                event.currentTarget.style.color =
                  "#7f746d";
                event.currentTarget.style.borderColor =
                  "#d8d1ca";
              }}
            >
              Reset Progress ↻
            </button>
          </div>

          {/* PROGRESS */}
          <div className="skill-progress-wrapper">
            <div className="skill-progress-top">
              <div>
                <span>LEVEL</span>

                <strong>
                  {skill.level}
                </strong>
              </div>

              <div className="xp-progress-text">
                <strong>{xp}</strong>

                <span>
                  / {skill.nextLevel} XP
                </span>
              </div>
            </div>

            <div className="skill-progress-bar">
              <div
                className="skill-progress-fill"
                style={{
                  width: `${Math.min(
                    100,
                    (xp / skill.nextLevel) *
                      100
                  )}%`,
                }}
              />
            </div>

            <div className="skill-progress-bottom">
              <span>
                {Math.min(
                  100,
                  Math.round(
                    (xp / skill.nextLevel) *
                      100
                  )
                )}
                % to next level
              </span>

              <span>
                {skill.nextLevel - xp > 0
                  ? `${skill.nextLevel - xp} XP remaining`
                  : "Level up!"}
              </span>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="skill-stat-grid">
            <div className="skill-stat-card">
              <span>PROGRESS</span>

              <strong>
                {overallProgress}%
              </strong>

              <small>
                Overall skill progress
              </small>
            </div>

            <div className="skill-stat-card">
              <span>PRACTICE</span>

              <strong>
                {practiceDone}
                <small>
                  /{tasks.length}
                </small>
              </strong>

              <small>
                Today's completed practice
              </small>
            </div>

            <div className="skill-stat-card">
              <span>STREAK</span>

              <strong>
                {skill.streak}
                <small> days</small>
              </strong>

              <small>
                Keep the momentum going
              </small>
            </div>
          </div>
        </section>

        {/* =========================
            TODAY'S PRACTICE
        ========================== */}
        <section className="practice-section">
          <div className="practice-section-header">
            <div>
              <span className="section-label">
                03 · TODAY'S PRACTICE
              </span>

              <h2>
                Your practice
                <br />
                <em>for today</em>
              </h2>
            </div>

            <div className="practice-completion">
              <strong>
                {completionPercentage}%
              </strong>

              <span>
                completed
              </span>
            </div>
          </div>

          <div className="practice-list">
            {tasks.map((task, index) => (
              <div
                className={
                  task.completed
                    ? "practice-card completed"
                    : "practice-card"
                }
                key={task.title}
              >
                <div className="practice-number">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </div>

                <div className="practice-info">
                  <span className="practice-type">
                    {task.type}
                  </span>

                  <h3>{task.title}</h3>

                  <div className="practice-meta">
                    <span>
                      ◷ {task.duration}
                    </span>

                    <span>
                      +{task.xp} XP
                    </span>

                    <span>
                      {task.difficulty}
                    </span>
                  </div>
                </div>

                <button
                  className="practice-action"
                  disabled={
                    task.completed ||
                    !task.practiceId
                  }
                  onClick={() => {
                    if (
                      !task.completed &&
                      task.practiceId
                    ) {
                      navigate(
                        `/skill/practice/${task.practiceId}`
                      );
                    }
                  }}
                >
                  {task.completed
                    ? "Completed ✓"
                    : "Complete →"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* =========================
            AI COACH
        ========================== */}
        <section className="ai-coach-section">
          <div className="ai-coach-icon">
            ✦
          </div>

          <div className="ai-coach-content">
            <span>04 · AI COACH</span>

            <h2>
              A little practice
              <br />
              goes a <em>long way.</em>
            </h2>

            <p>
              Berdasarkan progresmu, latihan
              konsisten setiap hari akan membantu
              kamu mencapai level berikutnya lebih
              cepat.
            </p>
          </div>

          <div className="ai-coach-progress">
            <div>
              <span>
                NEXT LEVEL
              </span>

              <strong>
                {Math.max(
                  0,
                  skill.nextLevel - xp
                )}{" "}
                XP
              </strong>
            </div>

            <div className="coach-mini-bar">
              <div
                style={{
                  width: `${Math.min(
                    100,
                    (xp / skill.nextLevel) *
                      100
                  )}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* =========================
            STREAK
        ========================== */}
        <section className="streak-section">
          <div className="streak-main">
            <span>YOUR CURRENT STREAK</span>

            <strong>
              {skill.streak}
            </strong>

            <p>
              days of consistent practice
            </p>
          </div>

          <div className="streak-message">
            <span>KEEP GOING</span>

            <p>
              Setiap latihan kecil yang kamu
              selesaikan membawa kamu satu langkah
              lebih dekat ke skill yang kamu inginkan.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SkillDevelopment;