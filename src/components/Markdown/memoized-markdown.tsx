import React, { memo, useState, HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { FileText } from "lucide-react";  // icons for FileChip
import "highlight.js/styles/github.css";

/* ─────────────────── helpers ─────────────────── */

function FileChip({ fileName }: { fileName: string }) {
  return (
    <span
        className={`inline-flex items-center gap-2 bg-sky-100 border
              border-sky-100 text-sky-700 hover:bg-sky-200 transition-all
                px-2 py-1 rounded-md text-xs font-light cursor-pointer`}>

        <FileText className="w-4 h-4 text-sky-700" strokeWidth={1.5} />
      <span className="font-medium text-xs">Create file</span> {fileName}
    </span>
  );
}

function CodeBlock({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const langMatch = className?.match(/language-(\w+)/);
  const lang = langMatch?.[1];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(String(children).trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6">
      {lang && (
        <div className="absolute top-2 right-3 text-xs text-zinc-500 font-mono">
          {lang}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 left-3 text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-600 px-2 py-1 rounded"
      >
        {copied ? "Copied!" : "Copy 📋"}
      </button>
      <pre className="bg-white text-black rounded-md p-4 overflow-auto text-sm font-mono border border-gray-300">
        <code className={`${className} bg-transparent`} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

/* ─────────────────── memoised Markdown ─────────────────── */

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-5 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-medium mb-2">{children}</h3>
        ),
        p: ({ children }) => {
          /* If this paragraph already contains a block element
             (pre, table, our CodeBlock wrapper, etc.), return the
             children directly instead of wrapping them in <p>. */
          const hasBlockChild = React.Children.toArray(children).some(child => {
            if (!React.isValidElement(child)) return false;

            const name =
              typeof child.type === "string" ? child.type : child.type?.name;

            return [
              "pre",
              "code",
              "table",
              "blockquote",
              "hr",
              "CodeBlock", // our custom wrapper
            ].includes(name as string);
          });

          return hasBlockChild ? <>{children}</> : (
            <p className="text-base leading-relaxed mb-4">{children}</p>
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-black">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-black">{children}</em>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-600 pl-4 text-zinc-700 italic my-4">
            {children}
          </blockquote>
        ),
        br: () => <div className="my-6 h-px w-full bg-zinc-300" />,
        code({
          inline,
          className,
          children,
          ...props
        }: HTMLAttributes<HTMLElement> & {
          inline?: boolean;
          children?: React.ReactNode;
        }) {
          const text   = String(children).trim();
          const isFile = /^[\w/.-]+\.(md|txt|csv|tsv|json|py)$/.test(text);

          /* ─────────────── filenames → chips ─────────────── */

          /* inline back-ticks (`file.md`) */
          if (inline && isFile) {
            return <FileChip fileName={text} />;
          }

          /* indented/fenced block that still contains a filename */
          if (!inline && isFile) {
            /* wrap in a normal paragraph so it’s valid HTML */
            return (
              <p className="text-base leading-relaxed my-4">
                <FileChip fileName={text} />
              </p>
            );
          }

          /* ─────────────── normal code paths ─────────────── */

          if (inline) {
            return (
              <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          }

          return (
            <CodeBlock className={className} {...props}>
              {children}
            </CodeBlock>
          );
        },

        hr: () => (
          <div className="mt-8 h-[0.5px] w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="table-auto border-collapse w-full text-sm">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-zinc-300 px-4 py-2 bg-zinc-100 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-zinc-300 px-4 py-2">{children}</td>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4">{children}</ol>
        ),
        li: ({
          children,
          checked,
          ...props
        }: HTMLAttributes<HTMLLIElement> & { checked?: boolean }) => {
          // ✔️ Task list item
          if (typeof checked === "boolean") {
            return (
              <li className="flex items-start gap-2 mb-2 list-none" {...props}>
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mt-1 accent-blue-600 cursor-default"
                />
                <span className="text-base leading-relaxed">{children}</span>
              </li>
            );
          }

          return (
            <li className="mb-2 list-disc list-inside" {...props}>
              {children}
            </li>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  ),
  (prev, next) => prev.content === next.content
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(({ content }: { content: string }) => (
  <MemoizedMarkdownBlock content={content} />
));

MemoizedMarkdown.displayName = "MemoizedMarkdown";
