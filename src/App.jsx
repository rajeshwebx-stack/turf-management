import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import BookingSection from './components/BookingSection'
import PricingSection from './components/PricingSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import BookingConfirmation from './components/BookingConfirmation'

/* ── Scroll progress bar (purple gradient like Rajesh) ── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
        transformOrigin: '0%',
        zIndex: 100,
        boxShadow: '0 0 8px rgba(139,92,246,0.5)',
      }}
    />
  )
}

export default function App() {
  const [confirmationData, setConfirmationData] = useState(null)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <Preloader />
      <ScrollProgressBar />
      <Navbar />

      <main>
        <Hero />
        <BentoGrid />
        <BookingSection onConfirm={setConfirmationData} />
        <PricingSection />
        <AboutSection />
      </main>

      <Footer />
      <FloatingWhatsApp />

      {confirmationData && (
        <BookingConfirmation
          data={confirmationData}
          onClose={() => setConfirmationData(null)}
        />
      )}
    </div>
  )
}
