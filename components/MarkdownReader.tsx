import { isValidElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownReaderProps {
  content: string;
}

function getCodeLanguage(children: ReactNode) {
  const child = Array.isArray(children)
    ? children.find(isValidElement)
    : children;

  if (!isValidElement<{ className?: string }>(child)) {
    return null;
  }

  const match = child.props.className?.match(/language-(\w+)/);
  return match?.[1] ?? null;
}

const markdownComponents: Components = {
  pre(props) {
    const { children, ...rest } = props;
    const language = getCodeLanguage(children);

    return (
      <div className="not-prose my-6 overflow-hidden rounded-lg border border-[color:rgba(237,224,196,0.24)] bg-[#071321] shadow-[0_18px_42px_-32px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-action-primary)]">
            Code
          </span>
          {language && (
            <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              {language}
            </span>
          )}
        </div>
        <pre
          {...rest}
          tabIndex={0}
          aria-label="Code example"
          className="overflow-x-auto bg-transparent p-4 text-[0.94rem] leading-7 text-[#e5edf7]"
        >
          {children}
        </pre>
      </div>
    );
  },
  code(props) {
    const { className, children, ...rest } = props;
    const isBlock = Boolean(className?.includes('language-') || String(children).includes('\n'));

    if (isBlock) {
      return (
        <code
          {...rest}
          className={`${className ?? ''} block min-w-max whitespace-pre bg-transparent p-0 font-mono text-[inherit]`}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        {...rest}
        className="rounded bg-white/[0.08] px-1.5 py-1 text-[0.95em] text-[var(--color-text-primary)]"
      >
        {children}
      </code>
    );
  },
};

export default function MarkdownReader({ content }: MarkdownReaderProps) {
  return (
    <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
      <div className="prose prose-invert max-w-none w-full prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-[var(--color-text-secondary)] prose-li:text-[var(--color-text-secondary)] prose-strong:text-[var(--color-text-primary)] prose-a:text-[var(--color-action-primary)]">
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
      </div>
    </div>
  );
}
