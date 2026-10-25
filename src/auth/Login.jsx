import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { supabase } from "../lib/supabaseClient";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

      if (loginError) {
        if (loginError.message === "Email not confirmed") {
          setError("Konfirmasi email kamu terlebih dahulu sebelum login.");
        } else if (loginError.message === "Invalid login credentials") {
          setError("Email atau password tidak sesuai.");
        } else {
          setError("Login gagal. Periksa koneksi dan coba lagi.");
          console.error("Login Supabase gagal:", loginError);
        }
        return;
      }

      navigate("/dashboard");
    } catch (loginError) {
      console.error("Login Supabase gagal:", loginError);
      setError("Login gagal. Periksa koneksi dan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ================= LEFT DECORATION ================= */}

      <section className="auth-decoration">

        <div className="auth-orbit"></div>

        <span>WELCOME BACK</span>

        <strong>
          Keep
          <br />
          learning.
        </strong>

        <small>LEARN · PRACTICE · GROW</small>

      </section>

      {/* ================= LOGIN CARD ================= */}

      <section className="auth-card">

        <Link to="/" className="auth-logo">
          Courvia
        </Link>

        <div className="auth-heading">

          <span>LOGIN</span>

          <h1>
            Welcome
            <br />
            <em>back.</em>
          </h1>

          <p>
            Masuk ke akun Courvia kamu dan
            lanjutkan perjalanan belajarmu.
          </p>

        </div>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">
              EMAIL
            </label>

            <input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              PASSWORD
            </label>

            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "15px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "rgba(255, 111, 82, 0.10)",
                color: "#c34e38",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            <span style={{ fontSize: "15px" }}>
              {isSubmitting ? "Logging in..." : "Login"}
            </span>

            <ArrowRight size={20} />
          </button>

        </form>

        {/* ================= LOGIN BENEFITS ================= */}

        <div
          style={{
            marginTop: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "9px",
            color: "#81746e",
            fontSize: "13px",
          }}
        >
          <div>◉ Continue your learning</div>
          <div>◉ Track your XP</div>
          <div>◉ Access your certificates</div>
        </div>

        {/* ================= REGISTER ================= */}

        <div className="auth-switch">
          Don't have an account?

          <Link to="/register">
            Create account
          </Link>
        </div>

      </section>

    </div>
  );
}

export default Login;