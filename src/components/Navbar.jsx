import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { TURF_INFO } from '../data/mockData'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Book Now', href: '#booking' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleLinkClick = () => setIsOpen(false)

  return (
    <>
      {/* Rajesh-style floating navbar */}
      <div className="fixed md:top-2 left-1/2 -translate-x-1/2 z-50 md:pt-4 w-full max-w-screen-lg px-5">
        <div className="flex backdrop-blur-sm md:py-0 md:backdrop-blur-none py-4 items-center justify-between">
          {/* Logo */}
          <a className="text-2xl w-24 font-bold" href="#hero">
            <div className="flex items-center">
              <span className="text-white">ST</span>
            </div>
          </a>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Desktop center pill nav */}
          <div className="hidden md:flex items-center justify-center backdrop-blur-md bg-black/20 rounded-full px-6 py-2 border border-white/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                className="relative px-4 py-2 text-sm transition-colors text-white/70 hover:text-white"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop right pill CTA */}
          <div className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <a className="text-white text-sm font-medium" href="#booking">
              Book Now
            </a>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="relative flex flex-col items-center justify-center h-full px-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block w-full max-w-xs text-center py-4 text-xl font-display font-semibold text-white/80 hover:text-purple-400 transition-colors touch-target"
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                className="mt-8"
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href="#booking"
                  onClick={handleLinkClick}
                  className="btn-primary text-base px-10 py-4 min-h-[56px]"
                >
                  Book Your Slot
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
