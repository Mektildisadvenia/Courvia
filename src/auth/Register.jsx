import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { supabase } from "../lib/supabaseClient";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    // ================= VALIDATION =================

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Semua data wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setIsSubmitting(true);
    const normalizedEmail = email.trim().toLowerCase();
    const fullName = name.trim();

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        console.error("Pendaftaran Supabase gagal:", signUpError);
        return;
      }

      if (data.user?.identities?.length === 0) {
        setError("Email tersebut sudah terdaftar.");
        return;
      }

      if (!data.user) {
        setError("Pendaftaran gagal. Silakan coba lagi.");
        return;
      }

      if (data.session) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(
            { id: data.user.id, full_name: fullName },
            { onConflict: "id" }
          );

        if (profileError) {
          console.error("Gagal menyimpan profile:", profileError);
          setError(`Akun berhasil dibuat, tetapi profile gagal disimpan: ${profileError.message}`);
          return;
        }

        navigate("/dashboard");
        return;
      }

      setSuccessMessage(
        "Akun berhasil dibuat. Periksa email kamu untuk konfirmasi sebelum login."
      );
    } catch (signUpError) {
      console.error("Pendaftaran Supabase gagal:", signUpError);
      setError(
        signUpError instanceof Error
          ? signUpError.message
          : String(signUpError)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">

      {/* ================= LEFT CONTENT ================= */}

      <section className="register-intro">
        <div className="register-intro-content">
          <span>START YOUR JOURNEY</span>

          <h2>
            Learn.
            <br />
            Practice.
            <br />
            Grow.
          </h2>

          <p>
            Bangun skill, ikuti course, dan berkembang
            bersama komunitas belajar Courvia.
          </p>
        </div>
      </section>

      {/* ================= REGISTER CARD ================= */}

      <section className="register-card">

        <Link to="/" className="register-logo">
          Courvia
        </Link>

        <div className="register-heading">

          <span>CREATE ACCOUNT</span>

          <h1>
            Welcome to
            <br />
            <em>Courvia.</em>
          </h1>

          <p>
            Buat akun untuk memulai perjalanan
            belajar kamu.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="register-row">

            <div className="input-group">
              <label htmlFor="name">
                FULL NAME
              </label>

              <input
                id="name"
                type="text"
                placeholder="Nama lengkap"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />
            </div>

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

          </div>

          <div className="input-group">
            <label htmlFor="password">
              PASSWORD
            </label>

            <input
              id="password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </div>

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              style={{ marginBottom: "15px", color: "#2f6b47", fontSize: "13px" }}
            >
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="register-submit"
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </span>

            <ArrowRight size={20} />
          </button>

        </form>

        {/* ================= BENEFITS ================= */}

        <div className="register-benefits">
          <div>✓ Personalized learning</div>
          <div>✓ Earn XP & certificates</div>
          <div>✓ Track your progress</div>
        </div>

        {/* ================= LOGIN ================= */}

        <div className="register-switch">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </div>

      </section>

    </div>
  );
}

export default Register;