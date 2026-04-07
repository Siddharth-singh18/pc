import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMyEditorials } from "../../api/editorials";
import { useAuth } from "../../context/AuthContext";
import MarkdownRenderer from "./MarkdownRenderer";

const starterDraft = `# New Editorial Draft

## Problem Restatement

Write the core idea in one or two plain sentences.

## Key Insight

Try expressing the complexity as $O(N \\log N)$ and mention why the transition is valid.

$$
\\sum_{i=1}^{n} a_i
$$

## Reference Code

\`\`\`cpp
void solve() {
    // Write the final implementation here.
}
\`\`\`
`;

export default function MemberDashboardDark({ onSignOut }) {
  const { token } = useAuth();
  const [draft, setDraft] = useState(starterDraft);
  const [editorials, setEditorials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadMyEditorials() {
      try {
        const data = await fetchMyEditorials(token);
        if (isMounted) {
          setEditorials(data.editorials || []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Unable to fetch your editorial queue.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMyEditorials();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <main className="min-h-screen bg-[#05070d] px-4 pb-12 pt-32 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-700 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
              Protected Member Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Editorial drafting workspace
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Left side is the raw markdown editor and right side is the live rendered preview, so
              you can see how a contest editorial pack will look before publishing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              to="/editorials"
              className="border border-slate-600 px-4 py-2 font-bold text-slate-200 hover:border-[#ef334c] hover:text-white"
            >
              View archive
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              className="border border-[#ef334c] px-4 py-2 font-bold text-white hover:bg-[#ef334c]"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border border-slate-700 bg-[#0b101b] p-4 shadow-panel">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
              Editorial Queue
            </p>
            <div className="mt-3 space-y-3">
              {isLoading ? (
                <div className="border border-slate-700 bg-[#101827] px-4 py-3 text-sm text-slate-300">
                  Loading your editorial queue...
                </div>
              ) : null}
              {!isLoading && error ? (
                <div className="border border-slate-700 bg-[#101827] px-4 py-3 text-sm text-[#ef334c]">
                  {error}
                </div>
              ) : null}
              {!isLoading && !error && editorials.length === 0 ? (
                <div className="border border-slate-700 bg-[#101827] px-4 py-3 text-sm text-slate-300">
                  No assigned editorials yet. Connect `/api/editorials/mine` to populate this list.
                </div>
              ) : null}
              {!isLoading && !error
                ? editorials.map((editorial) => (
                <div
                  key={editorial.id || editorial.slug || `${editorial.problemLetter}-${editorial.problemName}`}
                  className="flex items-start justify-between gap-3 border border-slate-700 bg-[#101827] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{editorial.problemName}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {editorial.contestName} | {editorial.author}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {editorial.platform || editorial.status}
                  </span>
                </div>
                  ))
                : null}
            </div>
          </div>

          <div className="border border-slate-700 bg-[#0b101b] p-4 shadow-panel">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
              Writing Notes
            </p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              <p>Use `#`, `##`, and `###` for hierarchy.</p>
              <p>Inline math: `$O(N \\log N)$`.</p>
              <p>Display math: wrap equations between `$$` blocks.</p>
              <p>Use fenced code blocks with `cpp` or `javascript` for syntax highlighting.</p>
            </div>
          </div>
        </section>

        <section className="grid min-h-[70vh] gap-0 border border-slate-700 bg-[#0b101b] shadow-panel xl:grid-cols-2">
          <div className="border-b border-slate-700 xl:border-b-0 xl:border-r">
            <div className="border-b border-slate-700 bg-[#101827] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
              Markdown Input
            </div>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              spellCheck={false}
              className="min-h-[70vh] w-full resize-none border-0 bg-[#0b101b] px-4 py-4 font-mono text-sm leading-7 text-slate-100 outline-none"
            />
          </div>

          <div>
            <div className="border-b border-slate-700 bg-[#101827] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
              Live Preview
            </div>
            <div className="min-h-[70vh] overflow-y-auto bg-white px-5 py-4">
              <div className="border border-slate-300 px-5 py-5">
                <MarkdownRenderer markdown={draft} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
