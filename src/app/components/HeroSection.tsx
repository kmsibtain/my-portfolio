"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { Iceberg } from "next/font/google"
import { useTheme } from "../contexts/ThemeContext"

const iceberg = Iceberg({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

interface HeroSectionProps {
  onScrollToProjects?: () => void
  onScrollToContact?: () => void
}

const GREETINGS = [
  { text: "Hi, my name is", lang: "English", flag: "🇬🇧" },
  { text: "¡Hola! Mi nombre es", lang: "Spanish", flag: "🇪🇸" },
  { text: "Bonjour, je m'appelle", lang: "French", flag: "🇫🇷" },
  { text: "Hallo! Ich heiße", lang: "German", flag: "🇩🇪" },
  { text: "Ciao! Mi chiamo", lang: "Italian", flag: "🇮🇹" },
  { text: "Olá! Meu nome é", lang: "Portuguese", flag: "🇵🇹" },
  { text: "こんにちは、私の名前は", lang: "Japanese", flag: "🇯🇵" },
  { text: "سلام! میرا نام ہے", lang: "Urdu", flag: "🇵🇰" },
  { text: "مرحباً! اسمي", lang: "Arabic", flag: "🇦🇪" },
  { text: "Привет! Меня зовут", lang: "Russian", flag: "🇷🇺" },
  { text: "Hej! Mitt namn är", lang: "Swedish", flag: "🇸🇪" },
]

const ROLES = [
  { prefix: "a", title: "Web Developer", emoji: "💻", color: "from-blue-500 to-indigo-600" },
  { prefix: "an", title: "AI Engineer", emoji: "🤖", color: "from-purple-500 to-pink-500" },
  { prefix: "a", title: "Full Stack Developer", emoji: "🚀", color: "from-sky-400 to-blue-600" },
  { prefix: "a", title: "Software Engineer", emoji: "⚡", color: "from-emerald-400 to-teal-600" },
  { prefix: "a", title: "Creative Coder", emoji: "✨", color: "from-amber-400 to-orange-500" },
  { prefix: "a", title: "Next.js Specialist", emoji: "▲", color: "from-cyan-400 to-blue-500" },
]

export default function HeroSection({ onScrollToProjects, onScrollToContact }: HeroSectionProps) {
  const { theme } = useTheme()

  // Dynamic greeting state
  const [displayedGreeting, setDisplayedGreeting] = useState(GREETINGS[0].text)
  const [isGreetingAnimating, setIsGreetingAnimating] = useState(false)

  // Dynamic role state
  const [roleIndex, setRoleIndex] = useState(0)
  const [isRoleAnimating, setIsRoleAnimating] = useState(false)

  // Hover popup state with cursor tracking
  const [isHovered, setIsHovered] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const nameRef = useRef<HTMLHeadingElement>(null)

  // Greeting cycler
  useEffect(() => {
    let index = 0
    const greetingInterval = setInterval(() => {
      setIsGreetingAnimating(true)
      setTimeout(() => {
        index = (index + 1) % GREETINGS.length
        setDisplayedGreeting(GREETINGS[index].text)
        setIsGreetingAnimating(false)
      }, 300)
    }, 3200)

    return () => clearInterval(greetingInterval)
  }, [])

  // Role cycler
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setIsRoleAnimating(true)
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length)
        setIsRoleAnimating(false)
      }, 350)
    }, 3600)

    return () => clearInterval(roleInterval)
  }, [])

  // Track cursor position relative to the name container
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsHovered(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const currentRole = ROLES[roleIndex]

  return (
    <section
      id="home"
      className={`relative h-screen min-h-[680px] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pt-16 pb-12 snap-start transition-colors duration-500 select-none ${theme === "light"
          ? "bg-gradient-to-br from-slate-50 via-white to-blue-50/50 text-slate-800"
          : "bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#0b1329] text-white"
        }`}
    >
      {/* Background Decorative Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 transition-colors duration-700 ${theme === "light" ? "bg-blue-300" : "bg-sky-600/25"
            }`}
        />
        <div
          className={`absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-25 transition-colors duration-700 ${theme === "light" ? "bg-indigo-300" : "bg-indigo-600/25"
            }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 pointer-events-none ${theme === "light" ? "bg-cyan-200" : "bg-sky-500/10"
            }`}
        />
      </div>

      {/* Main Hero Container - Truly Vertically Centered */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto">

        {/* Dynamic Multi-Language Greeting ("Hi, my name is") */}
        <div className="min-h-[3.25rem] flex items-center justify-center mb-2">
          <p
            className={`text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide transition-all duration-300 ease-out flex items-center gap-2.5 ${isGreetingAnimating
                ? "opacity-0 -translate-y-2 scale-95"
                : "opacity-100 translate-y-0 scale-100"
              } ${theme === "light" ? "text-slate-600" : "text-slate-300"}`}
          >
            <span>{displayedGreeting}</span>
            <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          </p>
        </div>

        {/* Interactive Name with Pill Photo Cursor Follow Reveal */}
        <div
          className="relative inline-block my-2 sm:my-3 cursor-pointer max-w-full"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsHovered((prev) => !prev)}
        >
          <h1
            ref={nameRef}
            className={`group text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-normal transition-all duration-300 select-none relative pb-1 whitespace-nowrap ${iceberg.className}`}
          >
            <span
              className={`relative inline-block whitespace-nowrap text-transparent bg-clip-text ${theme === "light"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700"
                  : "bg-gradient-to-r from-sky-400 to-sky-600"
                }`}
              style={{ WebkitTextStroke: theme === "light" ? "1.5px #3b82f6" : "1.5px #0ea5e9" }}
            >
              Muhammad Sibtain
              {/* Bold Neon Asterisk Indicator */}
              <span
                className={`inline-block ml-1.5 sm:ml-2.5 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black align-middle transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110 ${theme === "light" ? "text-blue-600" : "text-[#a3e635]"
                  }`}
                style={{ WebkitTextStroke: "0px" }}
              >
                *
              </span>
            </span>
          </h1>

          {/* Floating Pill Photo following cursor */}
          <div
            className={`pointer-events-none absolute top-0 left-0 z-50 transition-opacity duration-200 ease-out ${isHovered ? "opacity-100" : "opacity-0"
              }`}
            style={{
              transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate3d(-50%, -50%, 0) scale(${isHovered ? 1 : 0.5
                })`,
              transition: isHovered
                ? "transform 0.08s ease-out, opacity 0.2s ease-out, scale 0.2s ease-out"
                : "opacity 0.2s ease-out, scale 0.2s ease-out",
            }}
          >
            {/* Pill Container */}
            <div className="relative w-36 h-64 sm:w-44 sm:h-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              {/* Outer Capsule Glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-sky-400/40 via-lime-400/30 to-purple-500/40 blur-md -z-10" />

              {/* Capsule Image Card */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white/40 shadow-2xl">
                <Image
                  src="/images/profile.png"
                  alt="Muhammad Sibtain"
                  fill
                  className="object-cover object-top"
                  priority
                  unoptimized
                />
              </div>

              {/* Rotating Circular Sticker Badge on Top Right Shoulder (matching reference) */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none">
                <div className="relative w-full h-full animate-spin-slow">
                  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                    <defs>
                      <path
                        id="badgeCirclePath"
                        d="M 80, 80 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                      />
                    </defs>
                    <circle
                      cx="80"
                      cy="80"
                      r="50"
                      fill="rgba(15, 23, 42, 0.9)"
                      stroke="rgba(163, 230, 53, 0.4)"
                      strokeWidth="1"
                    />
                    <text
                      fontSize="10.5"
                      fontWeight="bold"
                      letterSpacing="2.5"
                      fill="#a3e635"
                      className="font-mono uppercase"
                    >
                      <textPath href="#badgeCirclePath" startOffset="0%">
                        • FULL STACK • AI ENGINEER • DEV •
                      </textPath>
                    </text>
                  </svg>
                </div>
                {/* Center Avatar Emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-xl filter drop-shadow">😎</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Changing Role Title */}
        <div className="mt-3 sm:mt-5 mb-5 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
          <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}>
            I am {currentRole.prefix}
          </span>
          <div className="min-w-[260px] sm:min-w-[320px] md:min-w-[360px] flex items-center justify-center">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl backdrop-blur-md transition-all duration-300 ease-out border shadow-sm ${isRoleAnimating
                  ? "opacity-0 scale-90 translate-y-2"
                  : "opacity-100 scale-100 translate-y-0"
                } ${theme === "light"
                  ? "bg-white/90 border-slate-200/90 text-slate-900 shadow-sm"
                  : "bg-slate-800/80 border-slate-700 text-white shadow-sm"
                }`}
            >
              <span className={`font-bold ${theme === "light" ? "text-blue-600" : "text-sky-400"}`}>
                {currentRole.title}
              </span>
              <span className="text-xl sm:text-2xl">{currentRole.emoji}</span>
            </span>
          </div>
        </div>

        {/* Summary Description */}
        <p
          className={`max-w-2xl text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-6 sm:mb-8 transition-colors duration-300 ${theme === "light" ? "text-slate-600" : "text-slate-400"
            }`}
        >
          Passionate about building scalable modern applications, machine learning workflows, and responsive user interfaces with clean architecture.
        </p>

        {/* Action Buttons & Socials */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
          {onScrollToProjects && (
            <button
              onClick={onScrollToProjects}
              className={`px-6 py-3 rounded-full font-medium text-sm sm:text-base flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${theme === "light"
                  ? "bg-slate-900 hover:bg-slate-800 text-white"
                  : "bg-white hover:bg-slate-100 text-slate-900 font-semibold"
                }`}
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}

          {onScrollToContact && (
            <button
              onClick={onScrollToContact}
              className={`px-6 py-3 rounded-full font-medium text-sm sm:text-base flex items-center gap-2 transition-all duration-200 backdrop-blur-md border hover:scale-105 active:scale-95 ${theme === "light"
                  ? "bg-white/80 hover:bg-white text-slate-800 border-slate-300 shadow-sm"
                  : "bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600"
                }`}
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
          )}

          {/* Social Quick Links */}
          <div className="flex items-center gap-2 ml-1 sm:ml-2">
            <a
              href="https://github.com/kmsibtain"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${theme === "light"
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                }`}
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/msibtain/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${theme === "light"
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                }`}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator - Anchored at the bottom */}
      <div
        onClick={onScrollToProjects}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-[11px] uppercase tracking-widest font-mono">Scroll Down</span>
        <div className="animate-bounce">
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </section>
  )
}
