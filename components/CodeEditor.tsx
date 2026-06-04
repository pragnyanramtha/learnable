'use client';

import { KeyboardEvent, useMemo, useRef, useState } from 'react';
import { AlignLeft, CornerDownLeft, Hash, IndentDecrease, IndentIncrease, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

interface CodeEditorProps {
  helperText?: string;
  id: string;
  label: string;
  minHeightClassName?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

const INDENT = '    ';

function getLineAndColumn(value: string, cursor: number) {
  const beforeCursor = value.slice(0, cursor);
  const lines = beforeCursor.split('\n');

  return {
    column: lines[lines.length - 1].length + 1,
    line: lines.length,
  };
}

function getLineRange(value: string, selectionStart: number, selectionEnd: number) {
  const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
  const nextLineBreak = value.indexOf('\n', Math.max(selectionEnd - 1, selectionStart));
  const lineEnd = nextLineBreak === -1 ? value.length : nextLineBreak;

  return { lineEnd, lineStart };
}

function replaceRange(value: string, start: number, end: number, replacement: string) {
  return `${value.slice(0, start)}${replacement}${value.slice(end)}`;
}

function indentLines(value: string, selectionStart: number, selectionEnd: number) {
  if (selectionStart === selectionEnd) {
    return {
      nextSelectionEnd: selectionEnd + INDENT.length,
      nextSelectionStart: selectionStart + INDENT.length,
      nextValue: replaceRange(value, selectionStart, selectionEnd, INDENT),
    };
  }

  const { lineEnd, lineStart } = getLineRange(value, selectionStart, selectionEnd);
  const block = value.slice(lineStart, lineEnd);
  const nextBlock = block
    .split('\n')
    .map((line) => `${INDENT}${line}`)
    .join('\n');
  const added = nextBlock.length - block.length;

  return {
    nextSelectionEnd: selectionEnd + added,
    nextSelectionStart: selectionStart + (selectionStart === lineStart ? INDENT.length : 0),
    nextValue: replaceRange(value, lineStart, lineEnd, nextBlock),
  };
}

function outdentLine(line: string) {
  if (line.startsWith(INDENT)) return line.slice(INDENT.length);
  if (line.startsWith('\t')) return line.slice(1);

  const leadingSpaces = line.match(/^ {1,3}/)?.[0].length ?? 0;
  return leadingSpaces > 0 ? line.slice(leadingSpaces) : line;
}

function outdentLines(value: string, selectionStart: number, selectionEnd: number) {
  const { lineEnd, lineStart } = getLineRange(value, selectionStart, selectionEnd);
  const block = value.slice(lineStart, lineEnd);
  const nextBlock = block.split('\n').map(outdentLine).join('\n');
  const removed = block.length - nextBlock.length;

  return {
    nextSelectionEnd: Math.max(lineStart, selectionEnd - removed),
    nextSelectionStart: Math.max(lineStart, selectionStart - Math.min(INDENT.length, selectionStart - lineStart)),
    nextValue: replaceRange(value, lineStart, lineEnd, nextBlock),
  };
}

function toggleCommentLines(value: string, selectionStart: number, selectionEnd: number) {
  const { lineEnd, lineStart } = getLineRange(value, selectionStart, selectionEnd);
  const block = value.slice(lineStart, lineEnd);
  const lines = block.split('\n');
  const shouldUncomment = lines.every((line) => /^\s*# ?/.test(line) || line.trim() === '');
  const nextBlock = lines
    .map((line) => {
      if (!line.trim()) return line;
      if (shouldUncomment) return line.replace(/^(\s*)# ?/, '$1');
      return line.replace(/^(\s*)/, '$1# ');
    })
    .join('\n');
  const delta = nextBlock.length - block.length;

  return {
    nextSelectionEnd: Math.max(lineStart, selectionEnd + delta),
    nextSelectionStart: selectionStart,
    nextValue: replaceRange(value, lineStart, lineEnd, nextBlock),
  };
}

export default function CodeEditor({
  helperText,
  id,
  label,
  minHeightClassName = 'min-h-80',
  onChange,
  placeholder = 'Write your Python code here.',
  value,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(() => getLineAndColumn(value, 0));
  const [status, setStatus] = useState('Python editor ready.');
  const helperId = `${id}-help`;
  const statusId = `${id}-status`;
  const lineCount = useMemo(() => Math.max(value.split('\n').length, 1), [value]);
  const lineNumbers = useMemo(
    () => Array.from({ length: lineCount }, (_, index) => index + 1),
    [lineCount]
  );

  const updateCursor = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    setCursor(getLineAndColumn(textarea.value, textarea.selectionStart));
  };

  const applyEdit = (
    nextValue: string,
    nextSelectionStart: number,
    nextSelectionEnd = nextSelectionStart,
    nextStatus = 'Editor updated.'
  ) => {
    onChange(nextValue);
    setStatus(nextStatus);
    window.requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.focus();
      textarea.setSelectionRange(nextSelectionStart, nextSelectionEnd);
      setCursor(getLineAndColumn(nextValue, nextSelectionStart));
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    const { selectionEnd, selectionStart } = textarea;

    if (event.key === 'Tab') {
      event.preventDefault();
      const edit = event.shiftKey
        ? outdentLines(value, selectionStart, selectionEnd)
        : indentLines(value, selectionStart, selectionEnd);
      applyEdit(
        edit.nextValue,
        edit.nextSelectionStart,
        edit.nextSelectionEnd,
        event.shiftKey ? 'Outdented selected code.' : 'Indented selected code.'
      );
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault();
      const edit = toggleCommentLines(value, selectionStart, selectionEnd);
      applyEdit(edit.nextValue, edit.nextSelectionStart, edit.nextSelectionEnd, 'Toggled comment on selected code.');
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const currentLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const currentLine = value.slice(currentLineStart, selectionStart);
      const baseIndent = currentLine.match(/^\s*/)?.[0] ?? '';
      const extraIndent = currentLine.trimEnd().endsWith(':') ? INDENT : '';
      const insertion = `\n${baseIndent}${extraIndent}`;
      applyEdit(
        replaceRange(value, selectionStart, selectionEnd, insertion),
        selectionStart + insertion.length,
        selectionStart + insertion.length,
        extraIndent ? 'Inserted new indented Python block line.' : 'Inserted new line with matching indentation.'
      );
    }
  };

  const insertAtCursor = (text: string, nextStatus: string) => {
    const textarea = textareaRef.current;
    const selectionStart = textarea?.selectionStart ?? value.length;
    const selectionEnd = textarea?.selectionEnd ?? value.length;
    applyEdit(
      replaceRange(value, selectionStart, selectionEnd, text),
      selectionStart + text.length,
      selectionStart + text.length,
      nextStatus
    );
  };

  return (
    <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#071321] shadow-[0_18px_42px_-32px_rgba(0,0,0,0.85)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <label htmlFor={id} className="text-sm font-semibold text-[var(--color-text-primary)]">
            {label}
          </label>
          {helperText && (
            <p id={helperId} className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
              {helperText}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => insertAtCursor(INDENT, 'Inserted four spaces.')}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-white/[0.08]"
          >
            <IndentIncrease aria-hidden="true" className="h-3.5 w-3.5" />
            Indent
          </button>
          <button
            type="button"
            onClick={() => {
              const textarea = textareaRef.current;
              const edit = outdentLines(value, textarea?.selectionStart ?? 0, textarea?.selectionEnd ?? 0);
              applyEdit(edit.nextValue, edit.nextSelectionStart, edit.nextSelectionEnd, 'Outdented selected code.');
            }}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-white/[0.08]"
          >
            <IndentDecrease aria-hidden="true" className="h-3.5 w-3.5" />
            Outdent
          </button>
          <button
            type="button"
            onClick={() => {
              const textarea = textareaRef.current;
              const edit = toggleCommentLines(value, textarea?.selectionStart ?? 0, textarea?.selectionEnd ?? 0);
              applyEdit(edit.nextValue, edit.nextSelectionStart, edit.nextSelectionEnd, 'Toggled comment on selected code.');
            }}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-white/[0.08]"
          >
            <MessageSquare aria-hidden="true" className="h-3.5 w-3.5" />
            Comment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[3rem_minmax(0,1fr)]">
        <div
          ref={lineNumberRef}
          aria-hidden="true"
          className={clsx('overflow-hidden border-r border-white/10 bg-black/20 px-2 py-4 font-mono text-sm leading-7 text-[var(--color-text-muted)]', minHeightClassName)}
        >
          {lineNumbers.map((line) => (
            <div key={line} className="h-7 text-right tabular-nums">
              {line}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setStatus('Code updated.');
            setCursor(getLineAndColumn(event.target.value, event.target.selectionStart));
          }}
          onClick={updateCursor}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCursor}
          onScroll={(event) => {
            if (lineNumberRef.current) {
              lineNumberRef.current.scrollTop = event.currentTarget.scrollTop;
            }
          }}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className={clsx(
            minHeightClassName,
            'w-full resize-y overflow-auto rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-7 text-[#e5edf7] outline-none placeholder:text-slate-500 focus:ring-0'
          )}
          placeholder={placeholder}
          aria-describedby={helperText ? `${helperId} ${statusId}` : statusId}
          wrap="off"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-[var(--color-text-muted)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Hash aria-hidden="true" className="h-3.5 w-3.5" />
            {lineCount} {lineCount === 1 ? 'line' : 'lines'}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CornerDownLeft aria-hidden="true" className="h-3.5 w-3.5" />
            Line {cursor.line}, column {cursor.column}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <AlignLeft aria-hidden="true" className="h-3.5 w-3.5" />
            {value.length} characters
          </span>
        </div>
        <p id={statusId} role="status" aria-live="polite" aria-atomic="true" className="font-semibold text-[var(--color-action-primary)]">
          {status}
        </p>
      </div>
    </div>
  );
}
