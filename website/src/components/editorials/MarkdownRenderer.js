import React from "react";

const languageKeywordMap = {
  cpp: ["const", "for", "if", "int", "max", "min", "return", "sort", "vector"],
  javascript: ["Array", "const", "fill", "for", "function", "if", "let", "Math", "return"],
};

function splitByRegex(text, regex) {
  const output = [];
  let lastIndex = 0;
  let match = regex.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      output.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }

    output.push({ type: "match", value: match[0], groups: match });
    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    output.push({ type: "text", value: text.slice(lastIndex) });
  }

  regex.lastIndex = 0;
  return output;
}

function renderInline(text, keyPrefix = "inline") {
  const mathAndCodeRegex = /(`[^`]+`|\$[^$\n]+\$)/g;

  return splitByRegex(text, mathAndCodeRegex).map((segment, index) => {
    if (segment.type === "text") {
      const boldRegex = /\*\*([^*]+)\*\*/g;
      return splitByRegex(segment.value, boldRegex).map((piece, pieceIndex) => {
        if (piece.type === "text") {
          return piece.value;
        }

        return (
          <strong key={`${keyPrefix}-${index}-${pieceIndex}`} className="font-bold text-slate-950">
            {piece.groups[1]}
          </strong>
        );
      });
    }

    if (segment.value.startsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-${index}`}
          className="rounded-none bg-slate-100 px-1.5 py-0.5 font-mono text-[0.92em] text-slate-950"
        >
          {segment.value.slice(1, -1)}
        </code>
      );
    }

    return (
      <span
        key={`${keyPrefix}-${index}`}
        className="font-math text-[0.98em] italic text-slate-950"
      >
        {segment.value.slice(1, -1)}
      </span>
    );
  });
}

function highlightCode(code, language) {
  const keywords = languageKeywordMap[language] || [];
  const tokens = code.split(/(\s+|[(){}[\],;.+\-*/=<>])/);

  return tokens.map((token, index) => {
    if (/^\s+$/.test(token) || token === "") {
      return token;
    }

    if (/^".*"$/.test(token) || /^'.*'$/.test(token)) {
      return (
        <span key={`${language}-${index}`} className="text-emerald-300">
          {token}
        </span>
      );
    }

    if (/^\d+$/.test(token)) {
      return (
        <span key={`${language}-${index}`} className="text-amber-300">
          {token}
        </span>
      );
    }

    if (keywords.includes(token)) {
      return (
        <span key={`${language}-${index}`} className="font-semibold text-sky-300">
          {token}
        </span>
      );
    }

    return (
      <span key={`${language}-${index}`} className="text-slate-100">
        {token}
      </span>
    );
  });
}

function CodeBlock({ language, code }) {
  return (
    <div className="my-6 border border-slate-300 bg-code text-sm">
      <div className="border-b border-slate-700 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">
        {language || "text"}
      </div>
      <pre className="overflow-x-auto px-4 py-4 leading-6">
        <code className="font-mono">{highlightCode(code, language)}</code>
      </pre>
    </div>
  );
}

function MarkdownParagraph({ children }) {
  return <p className="my-4 text-[15px] leading-7 text-slate-800">{children}</p>;
}

export default function MarkdownRenderer({ markdown }) {
  const lines = markdown.split("\n");
  const elements = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const codeFence = line.match(/^```(\w+)?/);
    if (codeFence) {
      const language = codeFence[1] || "text";
      const buffer = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith("```")) {
        buffer.push(lines[index]);
        index += 1;
      }

      elements.push(
        <CodeBlock key={`code-${index}`} language={language} code={buffer.join("\n")} />
      );
      index += 1;
      continue;
    }

    if (line.trim() === "$$") {
      const buffer = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== "$$") {
        buffer.push(lines[index]);
        index += 1;
      }

      elements.push(
        <div
          key={`math-${index}`}
          className="my-6 overflow-x-auto border-y border-slate-300 bg-slate-50 px-4 py-5 text-center font-math text-lg italic text-slate-950"
        >
          {buffer.join(" ")}
        </div>
      );
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)/);
    if (heading) {
      const level = heading[1].length;
      const HeadingTag = `h${level}`;
      const headingClasses = {
        1: "mt-8 border-b border-slate-300 pb-3 text-3xl font-bold tracking-tight text-slate-950",
        2: "mt-8 text-2xl font-bold text-slate-950",
        3: "mt-6 text-xl font-bold text-slate-950",
      };

      elements.push(
        <HeadingTag key={`heading-${index}`} className={headingClasses[level]}>
          {renderInline(heading[2], `heading-${index}`)}
        </HeadingTag>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quotes = [];

      while (index < lines.length && lines[index].startsWith("> ")) {
        quotes.push(lines[index].slice(2));
        index += 1;
      }

      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="my-5 border-l-4 border-slate-900 bg-slate-50 px-4 py-3 text-[15px] leading-7 text-slate-700"
        >
          {quotes.map((quote, quoteIndex) => (
            <p key={`quote-line-${quoteIndex}`}>{renderInline(quote, `quote-${quoteIndex}`)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];

      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].slice(2));
        index += 1;
      }

      elements.push(
        <ul key={`list-${index}`} className="my-5 list-disc space-y-2 pl-6 text-[15px] leading-7 text-slate-800">
          {items.map((item, itemIndex) => (
            <li key={`list-item-${itemIndex}`}>{renderInline(item, `list-${itemIndex}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("```") &&
      lines[index].trim() !== "$$" &&
      !lines[index].startsWith("> ") &&
      !lines[index].startsWith("- ") &&
      !lines[index].match(/^(#{1,3})\s+/)
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    elements.push(
      <MarkdownParagraph key={`paragraph-${index}`}>
        {renderInline(paragraphLines.join(" "), `paragraph-${index}`)}
      </MarkdownParagraph>
    );
  }

  return <div>{elements}</div>;
}
