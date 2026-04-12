import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownReaderProps {
  content: string;
}

export default function MarkdownReader({ content }: MarkdownReaderProps) {
  return (
    <div className="prose prose-invert max-w-none w-full prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-neutral-300 prose-li:text-neutral-300 prose-li:marker:text-neutral-500 prose-strong:text-white prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-white/10 prose-code:text-white prose-a:text-blue-300 prose-a:decoration-blue-400/60 hover:prose-a:text-blue-200">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]} 
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
