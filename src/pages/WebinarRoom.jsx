import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WebinarRoom.css";

const webinarData = {
  1: {
    title: "Build Your Career in Digital Era",
    instructor: "Nadia Putri",
    role: "Career Coach",
    date: "12 Oktober 2026",
    time: "19:00 - 20:30 WIB",
    participants: 87,
  },

  2: {
    title: "The Future of AI & Technology",
    instructor: "Fajar Nugraha",
    role: "AI Specialist",
    date: "15 Oktober 2026",
    time: "19:30 - 21:00 WIB",
    participants: 112,
  },

  3: {
    title: "Design Thinking for Beginners",
    instructor: "Sarah Wijaya",
    role: "UI/UX Designer",
    date: "18 Oktober 2026",
    time: "20:00 - 21:30 WIB",
    participants: 64,
  },

  4: {
    title: "Start Your Digital Business",
    instructor: "Raka Mahendra",
    role: "Digital Entrepreneur",
    date: "21 Oktober 2026",
    time: "19:00 - 20:30 WIB",
    participants: 91,
  },

  5: {
    title: "From Student to Developer",
    instructor: "Dimas Saputra",
    role: "Software Developer",
    date: "25 Oktober 2026",
    time: "19:30 - 21:00 WIB",
    participants: 48,
  },

  6: {
    title: "Building Consistent Learning Habits",
    instructor: "Andi Pratama",
    role: "Learning Coach",
    date: "28 Oktober 2026",
    time: "19:00 - 20:30 WIB",
    participants: 32,
  },
};

function WebinarRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const webinar = webinarData[id] || webinarData[1];

  const [message, setMessage] = useState("");

  const [chatMessages, setChatMessages] = useState([
    {
      name: "Sarah",
      message:
        "Materinya sangat menarik, Kak Nadia",
    },
    {
      name: "Rizky",
      message:
        "Kak, bagaimana cara membangun portfolio untuk pemula?",
    },
    {
      name: "Dina",
      message:
        "Setuju banget dengan pembahasannya",
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setChatMessages((previous) => [
      ...previous,
      {
        name: "Kamu",
        message: message.trim(),
      },
    ]);

    setMessage("");
  };

  return (
    <div className="webinar-room-page">
      {/* TOP NAV */}
      <nav className="webinar-room-navbar">
        <button
          className="room-logo"
          onClick={() => navigate("/dashboard")}
        >
          Courvia
        </button>

        <div className="room-live-status">
          <span></span>
          LIVE SESSION
        </div>

        <button
          className="leave-room-button"
          onClick={() => navigate(`/webinar/${id}`)}
        >
          Keluar
        </button>
      </nav>

      <main className="webinar-room-main">
        {/* ROOM HEADER */}
        <section className="room-heading">
          <div>
            <span className="room-eyebrow">
              LIVE WEBINAR
            </span>

            <h1>{webinar.title}</h1>

            <p>
              {webinar.instructor} · {webinar.role}
            </p>
          </div>

          <div className="room-participants">
            <strong>
              {webinar.participants}
            </strong>

            <span>
              participants
            </span>
          </div>
        </section>

        {/* MAIN ROOM */}
        <section className="webinar-room-layout">
          {/* VIDEO */}
          <div className="video-area">
            <div className="video-background">
              <div className="video-overlay"></div>

              <div className="speaker-content">
                <div className="speaker-avatar">
                  {webinar.instructor.charAt(0)}
                </div>

                <strong>
                  {webinar.instructor}
                </strong>

                <span>
                  {webinar.role}
                </span>
              </div>

              <div className="video-live-label">
                <span></span>
                LIVE
              </div>

              <div className="video-title">
                <span>COURVIA LIVE SESSION</span>

                <h2>
                  {webinar.title}
                </h2>
              </div>

              <div className="video-controls">
                <button>◀</button>
                <button>◉</button>
                <button>◼</button>
                <button>⚙</button>
                <button>⛶</button>
              </div>
            </div>

            {/* VIDEO INFO */}
            <div className="video-info">
              <div>
                <span>SESSION</span>
                <strong>
                  Main Session
                </strong>
              </div>

              <div>
                <span>TIME</span>
                <strong>
                  {webinar.time}
                </strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong className="session-live">
                  ● LIVE
                </strong>
              </div>
            </div>
          </div>

          {/* CHAT */}
          <aside className="webinar-chat">
            <div className="chat-header">
              <div>
                <span>LIVE DISCUSSION</span>
                <h3>Chat & Q&A</h3>
              </div>

              <span className="chat-count">
                {chatMessages.length}
              </span>
            </div>

            <div className="chat-messages">
              {chatMessages.map(
                (chat, index) => (
                  <div
                    className="chat-message"
                    key={index}
                  >
                    <div className="chat-avatar">
                      {chat.name.charAt(0)}
                    </div>

                    <div>
                      <strong>
                        {chat.name}
                      </strong>

                      <p>
                        {chat.message}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Tulis pertanyaan..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />

              <button
                onClick={handleSendMessage}
              >
                ↑
              </button>
            </div>
          </aside>
        </section>

        {/* SESSION INFORMATION */}
        <section className="room-information">
          <div className="room-information-heading">
            <span>SESSION INFORMATION</span>

            <h2>
              Make the most
              <br />
              <em>of your session</em>
            </h2>
          </div>

          <div className="room-information-grid">
            <div className="room-info-card">
              <span>01</span>

              <strong>
                Ask Questions
              </strong>

              <p>
                Gunakan fitur chat untuk
                bertanya langsung kepada
                instructor selama sesi
                berlangsung.
              </p>
            </div>

            <div className="room-info-card">
              <span>02</span>

              <strong>
                Take Notes
              </strong>

              <p>
                Catat insight penting yang
                kamu dapatkan agar dapat
                diterapkan setelah webinar.
              </p>
            </div>

            <div className="room-info-card">
              <span>03</span>

              <strong>
                Stay Until The End
              </strong>

              <p>
                Pastikan mengikuti sesi
                hingga selesai untuk
                mendapatkan sertifikat.
              </p>
            </div>
          </div>
        </section>

        {/* FINISH BUTTON */}
        <section className="finish-webinar-section">
          <div>
            <span>AFTER THE SESSION</span>

            <h2>
              Ready to complete
              <br />
              <em>your learning journey?</em>
            </h2>
          </div>

          <button
            onClick={() =>
              navigate(
                `/webinar/${id}/certificate`
              )
            }
          >
            Selesai Webinar
            <span>→</span>
          </button>
        </section>
      </main>
    </div>
  );
}

export default WebinarRoom;