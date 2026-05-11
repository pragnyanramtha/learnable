import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownReaderProps {
  content: string;
}

const markdownComponents: Components = {
  pre(props) {
    return (
      <div className="my-6 overflow-hidden rounded-[1.5rem] border border-[color:rgba(244,200,81,0.18)] bg-[rgba(2,11,24,0.62)]">
        <div className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-action-primary)]">
          Code block
        </div>
        <pre
          {...props}
          tabIndex={0}
          aria-label="Code example"
          className="overflow-x-auto p-4 text-sm leading-7 text-[var(--color-text-primary)]"
        />
      </div>
    );
  },
  code(props) {
    const { className, children, ...rest } = props;
    const isBlock = Boolean(className?.includes('language-'));

    if (isBlock) {
      return (
        <code {...rest} className={className}>
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
      <div className="prose prose-invert max-w-none w-full prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-[var(--color-text-secondary)] prose-li:text-[var(--color-text-secondary)] prose-strong:text-[var(--color-text-primary)] prose-code:rounded prose-code:bg-white/[0.08] prose-code:px-1.5 prose-code:py-1 prose-a:text-[var(--color-action-primary)]">
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
