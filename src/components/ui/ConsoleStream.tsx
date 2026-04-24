import { useEffect, useState } from 'react'

const DEFAULT_LINES = [
  '> init okultis.core',
  '  loading intents ....... ok',
  '  compiling reality ..... ok',
  '  attaching clients ..... 7 active',
  '  signal on #0077b6 ..... locked',
  '  status ................ ready',
]

interface ConsoleStreamProps {
  lines?: string[]
  className?: string
}

/**
 * Tiny decorative console panel. Types lines in sequence on mount and
 * leaves a blinking caret on the last line. Purely aesthetic — not a
 * real terminal and not interactive.
 */
export default function ConsoleStream({
  lines = DEFAULT_LINES,
  className = '',
}: ConsoleStreamProps) {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (revealed >= lines.length) return
    const t = window.setTimeout(() => setRevealed((n) => n + 1), 340)
    return () => window.clearTimeout(t)
  }, [revealed, lines.length])

  return (
    <div
      className={`mono text-[0.72rem] leading-[1.7] text-text-soft ${className}`}
      aria-hidden="true"
    >
      {lines.slice(0, revealed).map((line, i) => (
        <div
          key={i}
          className={i === revealed - 1 ? 'text-text' : ''}
        >
          {line}
          {i === revealed - 1 && revealed === lines.length && (
            <span className="caret text-accent" />
          )}
        </div>
      ))}
    </div>
  )
}
