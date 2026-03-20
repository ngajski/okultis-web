import { useTheme } from '@/hooks/useTheme'

export default function EclipseToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent border-none outline-none group"
    >
      <svg
        viewBox="0 0 32 32"
        width={32}
        height={32}
        className="overflow-visible"
        aria-hidden="true"
      >
        {/* Corona glow -visible during eclipse (dark mode) */}
        <circle
          cx="16"
          cy="16"
          r="12"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          className="transition-opacity duration-500 ease-in-out"
          style={{ opacity: isDark ? 0.6 : 0 }}
        />

        {/* Sun body */}
        <circle
          cx="16"
          cy="16"
          r="9"
          className="transition-all duration-500 ease-in-out"
          fill={isDark ? 'var(--color-accent)' : '#f4c542'}
          style={{
            filter: isDark ? 'drop-shadow(0 0 6px var(--color-accent))' : 'drop-shadow(0 0 4px rgba(244, 197, 66, 0.5))',
          }}
        />

        {/* Eclipse disc (the "moon" sliding over) */}
        <circle
          cx={isDark ? 18 : 28}
          cy={isDark ? 14 : 4}
          r="9"
          fill="var(--color-bg)"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Sun rays -only visible in light mode */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 16 + Math.cos(rad) * 11
          const y1 = 16 + Math.sin(rad) * 11
          const x2 = 16 + Math.cos(rad) * 14
          const y2 = 16 + Math.sin(rad) * 14
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#f4c542"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="transition-all duration-500 ease-in-out origin-center"
              style={{
                opacity: isDark ? 0 : 0.8,
                transform: isDark ? 'scale(0)' : 'scale(1)',
                transformOrigin: '16px 16px',
              }}
            />
          )
        })}
      </svg>
    </button>
  )
}
