"use client"

import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800
        ${theme === 'light' ? 'bg-sky-400' : 'bg-slate-600'}`}
      aria-label="Toggle theme"
    >
      <span
        className={`${
          theme === 'light' ? 'translate-x-7' : 'translate-x-1'
        } inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-lg`}
      >
        <span className="flex h-full w-full items-center justify-center text-sm">
          {theme === 'light' ? '☀️' : '🌙'}
        </span>
      </span>
    </button>
  )
}