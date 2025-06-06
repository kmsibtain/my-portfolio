"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronDown, Github, Linkedin, Twitter, ExternalLink, GitBranch } from "lucide-react"
import { Button } from "./components/ui/button"
import { ThemeProvider, useTheme } from "./contexts/ThemeContext"
import ThemeToggle from "./components/ThemeToggle"
import { Rouge_Script } from 'next/font/google'
import { Iceberg } from 'next/font/google'
import { Merriweather } from 'next/font/google'

const rougeScript = Rouge_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const iceberg = Iceberg({
  weight: '400',
  subsets: ['latin'],
  
})

const merriweather = Merriweather({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

interface Repository {
  name: string
  description: string | null
  html_url: string
  homepage?: string
  topics: string[]
  fork: boolean
  updated_at: string
}

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  // Define the repositories to display (include forked repos if desired)
  const selectedRepos = ["CodeFast", "Living-Plus", "Cinemate"]

  // Map repository names to custom image paths
  const repoImages: { [key: string]: string } = {
    "CodeFast": "/images/CodeFast.png",        
    "Living-Plus": "/images/Living-Plus.png",  
    "Cinemate": "/images/Cinemate.png",        
  }

  // Map repository names to custom tags
  const repoTags: { [key: string]: string[] } = {
    "CodeFast": ["Productivity", "Reactjs", "Node.js"],
    "Living-Plus": ["E-commerce", "React", "Tailwind"],
    "Cinemate": ["Movies", "Next.js", "API"],
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setActiveSection(sectionId)
  }

  // Update active section and scroll progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector(".scroll-container")
      if (!scrollContainer) return

      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
      const progress = (scrollTop / scrollHeight) * 100
      setScrollProgress(progress)

      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = scrollTop + 100

      let currentSection = "home"
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section
            break
          }
        }
      }
      setActiveSection(currentSection)
    }

    const scrollContainer = document.querySelector(".scroll-container")
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true })
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Fetch GitHub repositories and filter by selected names
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/kmsibtain/repos", {
          headers: {
            "Accept": "application/vnd.github.v3+json",
            // Uncomment and add token for private repos or higher rate limits
            // "Authorization": `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch repositories")
        }
        const data: Repository[] = await response.json()
        // Filter by selected repo names and sort by update date
        const filteredRepos = data
          .filter((repo) => selectedRepos.includes(repo.name))
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        setRepos(filteredRepos)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching repos:", error)
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const skills = [
    { name: "HTML5", icon: "🌐" },
    { name: "CSS3", icon: "🎨" },
    { name: "JavaScript", icon: "⚡" },
    { name: "TypeScript", icon: "📘" },
    { name: "PHP", icon: "🐘" },
    { name: "Laravel", icon: "🔺" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind", icon: "💨" },
    { name: "Sass", icon: "💅" },
    { name: "Bootstrap", icon: "🅱️" },
    { name: "MySQL", icon: "🗄️" },
    { name: "Docker", icon: "🐳" },
    { name: "Firebase", icon: "🔥" },
    { name: "AWS", icon: "☁️" },
    { name: "Git", icon: "📝" },
  ]

  const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ]

  return (
    <div className="scroll-smooth transition-colors duration-300">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-slate-800/90 border-slate-700"
        } ${merriweather.className}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className={`text-4xl font-bold italic ${theme === "light" ? "text-blue-600" : "text-sky-400"} ${rougeScript.className}`}>
              Muhammad Sibtain
            </div>
            <div className="hidden md:flex space-x-8 relative">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative transition-colors duration-200 py-2 px-1 ${
                    theme === "light"
                      ? `text-gray-700 hover:text-blue-600 ${activeSection === item.id ? "text-blue-600" : ""}`
                      : `text-white hover:text-sky-400 ${activeSection === item.id ? "text-sky-400" : ""}`
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 ${
                        theme === "light" ? "bg-blue-600" : "bg-sky-400"
                      }`}
                    ></span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className={`absolute bottom-0 left-0 w-full h-1 ${theme === "light" ? "bg-gray-200" : "bg-slate-700"}`}>
          <div
            className={`h-full transition-all duration-150 ease-out ${
              theme === "light" ? "bg-blue-600" : "bg-sky-400"
            }`}
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </nav>

      {/* Scroll Container */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-container">
        {/* Hero Section */}
        <section
          id="home"
          className={`h-screen flex items-center justify-center snap-start transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-br from-gray-50 via-white to-blue-50"
              : "bg-gradient-to-br from-slate-800 via-slate-700 to-sky-800"
          } ${merriweather.className}`}
        >
          <div className={`text-center px-6 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            <div className="text-6xl mb-4">👋</div>
            <h1 className="text-2xl mb-4">Hi,</h1>
            <h2 className="text-3xl mb-6">My name is</h2>
            <h1
              className={`text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700"
                  : "bg-gradient-to-r from-sky-400 to-sky-600"
              } ${iceberg.className}`}
              style={{ WebkitTextStroke: theme === "light" ? "2px #3b82f6" : "2px #0ea5e9" }}
            >
              Muhammad Sibtain
            </h1>
            <p className="text-2xl mb-12">I am a Web Developer 💻</p>
            <div className="animate-bounce">
              <ChevronDown className={`w-8 h-8 mx-auto ${theme === "light" ? "text-gray-800" : "text-white"}`} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`min-h-screen flex items-center snap-start pt-20 transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-br from-gray-50 via-white to-blue-50"
              : "bg-gradient-to-br from-slate-800 via-slate-700 to-sky-800"
          } ${merriweather.className}`}
        >
          <div className={`max-w-4xl mx-auto px-6 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            <h2
              className={`text-4xl font-bold text-center mb-12 ${theme === "light" ? "text-gray-900" : "text-white"}`}
            >
              About me
            </h2>
            <div className="text-lg leading-relaxed space-y-6">
              <p>
                <span className={`text-6xl font-bold ${theme === "light" ? "text-blue-600" : "text-sky-400"}`}>H</span>
                i, my name is{" "}
                <span className={`font-semibold ${theme === "light" ? "text-blue-600" : "text-sky-400"}`}>
                  Muhammad Sibtain
                </span>
                , a Computer Science student with a solid foundation in programming, algorithms, and system-level concepts. I'm comfortable working with languages like C++, Java, and Python, and I enjoy applying my classroom knowledge to hands-on projects in areas like OS concepts, testing, and full-stack development.
              </p>
              <p>
                I have a passion for building things that people love to use. I want to be a{" "}
                <span className={`font-semibold ${theme === "light" ? "text-blue-600" : "text-sky-400"}`}>
                  Full Stack Developer
                </span>{" "}
                so I learn technical every day.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className={`min-h-screen flex items-center snap-start pt-20 transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-br from-gray-50 via-white to-blue-50"
              : "bg-gradient-to-br from-slate-800 via-slate-700 to-sky-800"
          } ${merriweather.className}`}
        >
          <div className={`max-w-6xl mx-auto px-6 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            <h2
              className={`text-4xl font-bold text-center mb-12 ${theme === "light" ? "text-gray-900" : "text-white"}`}
            >
              Technical skills
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-8 justify-items-center">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center group hover:scale-110 transition-transform">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl mb-2 transition-all ${
                      theme === "light"
                        ? "bg-white shadow-md border border-gray-200 group-hover:bg-gray-50 group-hover:shadow-lg"
                        : "bg-slate-700 group-hover:bg-slate-600"
                    }`}
                  >
                    {skill.icon}
                  </div>
                  <span className={`text-sm ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`min-h-screen flex items-center snap-start pt-20 transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-br from-gray-50 via-white to-blue-50"
              : "bg-gradient-to-br from-slate-800 via-slate-700 to-sky-800"
          } ${merriweather.className}`}
        >
          <div className={`max-w-7xl mx-auto px-6 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            <h2
              className={`text-4xl font-bold text-center mb-12 ${theme === "light" ? "text-gray-900" : "text-white"}`}
            >
              My projects
            </h2>
            {loading ? (
              <p className="text-center">Loading projects...</p>
            ) : repos.length === 0 ? (
              <p className="text-center">No selected projects found.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map((repo, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 ${
                      theme === "light" ? "bg-white shadow-lg border-b border-gray-200" : "bg-slate-700/50"
                    }`}
                  >
                    <div className={`aspect-video relative ${theme === "light" ? "bg-gray-100" : "bg-gray-600"}`}>
                      <Image
                        src={repoImages[repo.name] || "/placeholder.svg"} // Use custom image or fallback
                        alt={repo.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {/* Custom Tags */}
                        {repoTags[repo.name]?.length > 0 ? (
                          repoTags[repo.name].map((tag, tagIndex) => (
                            <span
                              key={`custom-${tagIndex}`}
                              className={`px-2 py-1 text-white text-sm rounded-full ${
                                theme === "light" ? "bg-green-600" : "bg-green-500"
                              }`}
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span
                            className={`px-2 py-1 text-white text-sm rounded-full ${
                              theme === "light" ? "bg-green-600" : "bg-green-500"
                            }`}
                          >
                            No custom tags
                          </span>
                        )}
                        {/* GitHub API Topics */}
                        {repo.topics.length > 0 ? (
                          repo.topics.map((tag, tagIndex) => (
                            <span
                              key={`api-${tagIndex}`}
                              className={`px-2 py-1 text-white text-sm rounded-full ${
                                theme === "light" ? "bg-blue-600" : "bg-sky-600"
                              }`}
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span
                            className={`px-2 py-1 text-white text-sm rounded-full ${
                              theme === "light" ? "bg-blue-600" : "bg-sky-600"
                            }`}
                          >
                            No API tags
                          </span>
                        )}
                        {/* Fork Status */}
                        {/* <span
                          className={`px-2 py-1 text-white text-sm rounded-full ${
                            theme === "light" ? "bg-gray-600" : "bg-gray-500"
                          }`}
                        >
                          {repo.fork ? "Forked" : "Original"}
                        </span> */}
                      </div>
                      <h3
                        className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-blue-600" : "text-sky-400"}`}
                      >
                        {repo.name}
                      </h3>
                      <p className={`mb-4 text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                        {repo.description || "No description available"}
                      </p>
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`flex items-center gap-2 ${
                            theme === "light"
                              ? "border-blue-600 text-white hover:bg-blue-600 hover:text-white"
                              : "border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white"
                          }`}
                          asChild
                        >
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <GitBranch className="w-4 h-4" />
                            Repo
                          </a>
                        </Button>
                        {repo.homepage && (
                          <Button
                            variant="outline"
                            size="sm"
                            className={`flex items-center gap-2 ${
                              theme === "light"
                                ? "border-blue-600 text-white hover:bg-blue-600 hover:text-white"
                                : "border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white"
                            }`}
                            asChild
                          >
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                              Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`h-screen flex flex-col justify-center snap-start transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-br from-gray-50 via-white to-blue-50"
              : "bg-gradient-to-br from-slate-800 via-slate-700 to-sky-800"
          } ${merriweather.className}`}
        >
          <div
            className={`max-w-4xl mx-auto px-6 text-center flex-1 flex flex-col justify-center ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            <h2 className={`text-4xl font-bold mb-8 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Get in touch
            </h2>
            <p className="text-xl mb-4">Please feel free to contact me if you have any question!</p>
            <p className="text-xl mb-12">{"I'll try to get back to you 🤗"}</p>
            <div className="flex justify-center space-x-8 mb-16">
              <a
                href="https://github.com/kmsibtain"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  theme === "light" ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-sky-400"
                }`}
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-sibtain-544a05267/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  theme === "light" ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-sky-400"
                }`}
              >
                <Linkedin className="w-8 h-8" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  theme === "light" ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-sky-400"
                }`}
              >
                <Twitter className="w-8 h-8" />
              </a>
            </div>
          </div>
          <footer className={`text-center pb-8 ${theme === "light" ? "text-gray-700" : "text-white"}`}>
            <p>
              Designed and Built by{" "}
              <span className={`font-semibold ${theme === "light" ? "text-blue-600" : "text-sky-400"}`}>
                Muhammad Sibtain
              </span>
            </p>
          </footer>
        </section>
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}