import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchContests } from "../../api/contests";

function platformClass(platform) {
  if (platform === "Codeforces") {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  if (platform === "CodeChef") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

export default function EditorialListPage({ isMember }) {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadContests() {
      try {
        const data = await fetchContests();
        if (isMounted) {
          setContests(data.contests || []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Unable to load contests.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadContests();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#05070d] px-4 pb-12 pt-32 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-slate-700 pb-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-slate-400">
                Competitive Programming Editorials
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white">
                Contest-wise archive with all round problems grouped together.
              </h1>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                to={isMember ? "/editorials/dashboard" : "/editorials/login"}
                className="border border-[#ef334c] px-4 py-2 font-bold text-white transition hover:bg-[#ef334c]"
              >
                {isMember ? "Open Dashboard" : "Member Login"}
              </Link>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300">
            Ab contest kholne par us round ke saare problems ek hi page par milenge, for example
            A, B, C, D, E editorials together.
          </p>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_0.8fr]">
          <div className="overflow-hidden border border-slate-700 bg-[#0b101b] shadow-panel">
            <div className="grid grid-cols-[1.3fr_0.85fr_0.85fr_1fr_0.8fr] gap-4 border-b border-slate-700 bg-[#0f1726] px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span>Contest</span>
              <span>Problems</span>
              <span>Platform</span>
              <span>Curator</span>
              <span>Date</span>
            </div>

            <div>
              {isLoading ? (
                <div className="px-4 py-6 text-sm text-slate-300">Loading contests...</div>
              ) : null}
              {!isLoading && error ? (
                <div className="px-4 py-6 text-sm text-[#ef334c]">{error}</div>
              ) : null}
              {!isLoading && !error && contests.length === 0 ? (
                <div className="px-4 py-6 text-sm text-slate-300">
                  No contests yet. Connect the backend `/api/contests` endpoint to populate this
                  archive.
                </div>
              ) : null}
              {!isLoading && !error
                ? contests.map((contest) => (
                <Link
                  key={contest.slug}
                  to={`/editorials/${contest.slug}`}
                  className="grid grid-cols-1 gap-3 border-b border-slate-800 px-4 py-4 transition hover:bg-[#111827] sm:grid-cols-[1.3fr_0.85fr_0.85fr_1fr_0.8fr]"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{contest.contestName}</p>
                    <p className="mt-1 text-xs text-slate-400">{contest.summary}</p>
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    {contest.problems.map((problem) => problem.letter).join(", ")}
                  </div>
                  <div>
                    <span
                      className={`inline-flex border px-2 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${platformClass(
                        contest.platform
                      )}`}
                    >
                      {contest.platform}
                    </span>
                  </div>
                  <div className="text-sm text-slate-300">{contest.curator}</div>
                  <div className="text-sm text-slate-400">{contest.date}</div>
                </Link>
                  ))
                : null}
            </div>
          </div>

          <aside className="space-y-4 border border-slate-700 bg-[#0b101b] p-5 shadow-panel">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Notes
              </p>
              <h2 className="mt-2 text-xl font-bold text-white">Format</h2>
            </div>

            <div className="space-y-3 text-sm leading-6 text-slate-300">
              <p>Contest-first browsing with every problem editorial grouped under one round.</p>
              <p>Codeforces-style black shell with a readable navbar and tutorial container.</p>
              <p>Protected member workspace for drafting and previewing tutorials.</p>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Example Round
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["A", "B", "C", "D", "E"].map((tag) => (
                  <span
                    key={tag}
                    className="border border-slate-600 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
