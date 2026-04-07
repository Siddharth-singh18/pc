import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchContestBySlug } from "../../api/contests";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ContestEditorialPage({ isMember }) {
  const { slug } = useParams();
  const [contest, setContest] = useState(null);
  const [editorials, setEditorials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadContest() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchContestBySlug(slug);
        if (isMounted) {
          setContest(data.contest || null);
          setEditorials(data.editorials || []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Unable to load contest.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadContest();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#05070d] px-4 pb-12 pt-32 sm:px-6">
        <div className="mx-auto max-w-4xl border border-slate-700 bg-[#0b101b] p-8 shadow-panel">
          <p className="text-sm text-slate-300">Loading contest editorials...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#05070d] px-4 pb-12 pt-32 sm:px-6">
        <div className="mx-auto max-w-4xl border border-slate-700 bg-[#0b101b] p-8 shadow-panel">
          <h1 className="text-3xl font-bold text-white">Unable to load contest</h1>
          <p className="mt-3 text-sm leading-6 text-[#ef334c]">{error}</p>
          <Link
            to="/editorials"
            className="mt-6 inline-flex border border-[#ef334c] px-4 py-2 text-sm font-bold text-white hover:bg-[#ef334c]"
          >
            Back to archive
          </Link>
        </div>
      </main>
    );
  }

  if (!contest) {
    return (
      <main className="min-h-screen bg-[#05070d] px-4 pb-12 pt-32 sm:px-6">
        <div className="mx-auto max-w-4xl border border-slate-700 bg-[#0b101b] p-8 shadow-panel">
          <h1 className="text-3xl font-bold text-white">Contest not found</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The requested contest editorial pack does not exist in the demo archive.
          </p>
          <Link
            to="/editorials"
            className="mt-6 inline-flex border border-[#ef334c] px-4 py-2 text-sm font-bold text-white hover:bg-[#ef334c]"
          >
            Back to archive
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070d] px-4 pb-12 pt-32 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link to="/editorials" className="font-bold text-slate-300 hover:text-white">
            {"<-"} Back to editorials
          </Link>
          <Link
            to={isMember ? "/editorials/dashboard" : "/editorials/login"}
            className="border border-slate-600 px-3 py-2 font-bold text-slate-200 hover:border-[#ef334c] hover:text-white"
          >
            {isMember ? "Open dashboard" : "Member login"}
          </Link>
        </div>

        <article className="border border-slate-700 bg-[#0b101b] px-5 py-8 shadow-panel sm:px-10">
          <header className="border-b border-slate-700 pb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Contest Pack
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
              {contest.contestName}
            </h1>
            <p className="mt-3 text-base text-slate-300">{contest.summary}</p>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              <span>
                <span className="font-bold text-white">Platform:</span> {contest.platform}
              </span>
              <span>
                <span className="font-bold text-white">Curator:</span> {contest.curator}
              </span>
              <span>
                <span className="font-bold text-white">Date:</span> {contest.date}
              </span>
            </div>
          </header>

          <section className="mt-8 space-y-8">
            {editorials.length === 0 ? (
              <div className="border border-slate-700 bg-white px-5 py-6">
                <p className="text-sm text-slate-700">
                  No published editorials found for this contest yet.
                </p>
              </div>
            ) : null}
            {editorials.map((problem) => (
              <div
                key={problem.id || `${problem.problemLetter}-${problem.problemName}`}
                className="border border-slate-700 bg-white px-5 py-6"
              >
                <div className="border-b border-slate-300 pb-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
                    Problem {problem.problemLetter}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">
                    {problem.problemLetter}. {problem.problemName}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                    <span>
                      <span className="font-bold text-slate-950">Author:</span> {problem.author}
                    </span>
                    <span>
                      <span className="font-bold text-slate-950">Difficulty:</span> {problem.difficulty}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(problem.tags || []).map((tag) => (
                      <span
                        key={`${problem.problemLetter}-${tag}`}
                        className="border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <section className="cf-article mt-6">
                  <MarkdownRenderer markdown={problem.markdown} />
                </section>
              </div>
            ))}
          </section>
        </article>
      </div>
    </main>
  );
}
