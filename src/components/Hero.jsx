import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TURF_INFO } from '../data/mockData'

/* ── Starfield Canvas ─────────────────────────── */
function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let stars = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const count = Math.floor((canvas.width * canvas.height) / 8000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.3 + 0.05,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const time = Date.now() * 0.001
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.speed + star.phase) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`
        ctx.fill()
      })
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />
}

/* ── Animation variants ─────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full h-full overflow-hidden"
    >
      {/* ── Cosmic gradient background (Rajesh style) ── */}
      <div className="fixed bg-gradient-to-b from-purple-950 to-indigo-500 inset-0 z-[-3]">
        <Starfield />
      </div>

      {/* Background Video (autoplays, muted, loops) with turf image poster fallback */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-2] opacity-35"
        poster="/assets/hero-turf.png"
      >
        <source src="https://player.vimeo.com/external/437521800.sd.mp4?s=a23d76819a9d576645ed36a00fea2bbc7469e6c9&profile_id=139&oauth2_token_id=1223210874" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-cricket-batsman-hitting-a-ball-in-slow-motion-41808-large.mp4" type="video/mp4" />
      </video>

      {/* Turf image backdrop overlay (as additional fallback layering) */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10 z-[-1]" style={{ backgroundImage: "url('/assets/hero-turf.png')" }} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75 z-0" />

      {/* Planet horizon glow (Rajesh signature) */}
      <div className="absolute border-b-4 sm:border-b-6 md:border-b-8 mb-1 sm:mb-2 border-black bottom-0 left-0 right-0 h-40 sm:h-48 md:h-52 lg:h-40 xl:h-32 bg-purple-900 rounded-t-[100%] blur-md z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-52 lg:h-40 xl:h-32 bg-black/90 rounded-t-[100%] z-0" />

      {/* ── Content ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-3 sm:px-4 lg:px-6 xl:px-8 z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="container mx-auto max-w-7xl flex flex-col justify-center items-center">
          {/* Shiny badge (Rajesh's "New Project Launched" style) */}
          <motion.div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 w-full px-1 sm:px-2 flex justify-center" variants={fadeUp}>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/90 text-xs sm:text-sm md:text-base lg:text-lg">
              <span className="bg-purple-800 text-gray-200 text-xs font-medium px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 rounded-full">Open</span>
              <span className="text-shiny">Book Your Cricket Session</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-3 sm:h-3 md:w-4 md:h-4">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          {/* Main headline (Rajesh style) */}
          <motion.div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-10 px-1 sm:px-2" variants={fadeUp}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight">
              Where cricket meets<br />
              premium <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-white">experience</span>
            </h1>
          </motion.div>

          {/* Intro line with name tag (Rajesh style) */}
          <motion.div className="flex relative flex-col items-center justify-center gap-2 sm:gap-3 md:flex-row" variants={fadeUp}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90">
              Welcome to
              <span
                className="mx-1.5 sm:mx-2 px-2 sm:px-3 md:px-5 py-0.5 sm:py-1 text-white bg-purple-700 inline-block text-sm sm:text-base md:text-lg lg:text-xl"
                style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
              >
                {TURF_INFO.name}
              </span>
            </p>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90">
              {TURF_INFO.tagline}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom CTAs (Rajesh style) ─────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-4 sm:pb-6 md:pb-8 lg:pb-12">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full px-3 sm:px-4 lg:px-6"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {/* Rajesh-style CTA with arrow circle */}
          <a
            className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-4 lg:px-7 lg:py-4 bg-black/40 backdrop-blur-md rounded-full border border-white/30 text-zinc-400 hover:bg-black/50 transition-colors w-full sm:w-auto max-w-xs sm:max-w-none"
            href="#booking"
          >
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">Book Your Slot</span>
            <div className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-9 lg:w-9 rounded-full bg-zinc-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:translate-x-2 transition-all duration-300 ease-in-out">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-4 sm:h-4 md:w-5 md:h-5">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>

          {/* Contact info */}
          <a href={`tel:${TURF_INFO.contact.phone.replace(/\s/g, '')}`} className="flex items-center z-10 justify-center gap-1.5 sm:gap-2 text-center w-full sm:w-auto max-w-xs sm:max-w-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex-shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="gray" strokeWidth="2" />
            </svg>
            <span className="text-zinc-400 hover:text-purple-500 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg truncate">
              {TURF_INFO.contact.phone}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
