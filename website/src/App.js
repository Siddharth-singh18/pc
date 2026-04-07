import React, { useEffect, useState } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Footer from "./components/Footer";
import Members from "./components/Members/Members";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ContestEditorialPage from "./components/editorials/ContestEditorialPage";
import EditorialListPage from "./components/editorials/EditorialListPage";
import MemberDashboardDark from "./components/editorials/MemberDashboardDark";
import { useAuth } from "./context/AuthContext";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ProtectedRoute({ isAuthenticated, isCheckingAuth, children }) {
  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-[#05070d] px-4 pb-12 pt-32 text-slate-100 sm:px-6">
        <div className="mx-auto max-w-3xl border border-slate-700 bg-[#0b101b] p-8">
          <p className="text-sm text-slate-300">Checking member access...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/editorials/login" replace />;
  }

  return children;
}

function MemberLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/editorials/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(form);
      navigate("/editorials/dashboard", { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Sign in failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#05070d] px-4 pb-12 pt-32 text-slate-100 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header className="border-b border-slate-700 pb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
            Competitive Programming Editorials
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Member Dashboard Access
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            This route is protected and expects a real backend session before allowing access to
            the editorial workspace.
          </p>
        </header>

        <section className="grid gap-8 border border-slate-700 bg-[#0b101b] p-6 shadow-panel sm:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Club Member Sign In</h2>
            <p className="text-sm leading-6 text-slate-300">
              This frontend is now backend-ready. Connect `/api/auth/login` and `/api/auth/me` to
              enable real member access.
            </p>
            <div className="space-y-2 border-l-2 border-[#ef334c] pl-4 text-sm text-slate-300">
              <p>
                <span className="font-bold text-white">Role:</span> Editorial Team Member
              </p>
              <p>
                <span className="font-bold text-white">Permission:</span> Write, preview, and
                revise markdown editorials
              </p>
              <p>
                <span className="font-bold text-white">Preview:</span> Live markdown + math
                rendering
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border border-slate-700 bg-[#101827] p-5"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Authorized Access
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Sign in with an approved member account to access the writing dashboard.
              </p>
            </div>

            <label className="text-sm font-bold text-white">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                className="mt-2 w-full border border-slate-600 bg-[#0b101b] px-3 py-3 text-sm text-white outline-none"
                placeholder="member@club.com"
                required
              />
            </label>

            <label className="text-sm font-bold text-white">
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
                className="mt-2 w-full border border-slate-600 bg-[#0b101b] px-3 py-3 text-sm text-white outline-none"
                placeholder="Enter password"
                required
              />
            </label>

            {error ? <p className="text-sm text-[#ef334c]">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center border border-[#ef334c] bg-[#ef334c] px-4 py-3 text-sm font-bold text-white transition hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function App() {
  const [load, updateLoad] = useState(true);
  const { isAuthenticated, isCheckingAuth, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/members" element={<Members />} />
          <Route
            path="/editorials"
            element={<EditorialListPage isMember={isAuthenticated} />}
          />
          <Route path="/editorials/:slug" element={<ContestEditorialPage isMember={isAuthenticated} />} />
          <Route path="/editorials/login" element={<MemberLogin />} />
          <Route
            path="/editorials/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isCheckingAuth={isCheckingAuth}
              >
                <MemberDashboardDark onSignOut={logout} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
