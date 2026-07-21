import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TURF_INFO } from '../data/mockData'

const QUICK_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Book Now', href: '#booking' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

function FadeInSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Inline SVG icons ─────────────────────────────── */
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 shrink-0">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 shrink-0">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 shrink-0 mt-0.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-black">
      {/* Purple gradient top border */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899, #7C3AED)' }} />

      <div className="container-app section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Brand ─────────────────────────────────── */}
          <FadeInSection className="lg:col-span-1">
            <a href="#hero" className="flex items-center gap-2.5 mb-4 group">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
              >
                ST
              </div>
              <span className="font-display font-bold text-lg text-white group-hover:text-purple-400 transition-colors">
                {TURF_INFO.name}
              </span>
            </a>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {TURF_INFO.tagline}. Premium box cricket experience with top-notch facilities in the heart of Erode.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href={TURF_INFO.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all touch-target"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </FadeInSection>

          {/* ── Quick Links ───────────────────────────── */}
          <FadeInSection>
            <h3 className="font-display font-semibold text-white text-base mb-4">Quick Links</h3>
            <ul className="space-y-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center h-10 text-[15px] text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FadeInSection>

          {/* ── Contact Info ──────────────────────────── */}
          <FadeInSection>
            <h3 className="font-display font-semibold text-white text-base mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href={`tel:${TURF_INFO.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-[15px] text-white/70 hover:text-white transition-colors py-1 touch-target"
              >
                <PhoneIcon />
                <span>{TURF_INFO.contact.phone}</span>
              </a>
              <a
                href={`mailto:${TURF_INFO.contact.email}`}
                className="flex items-center gap-3 text-[15px] text-white/70 hover:text-white transition-colors py-1 touch-target"
              >
                <MailIcon />
                <span>{TURF_INFO.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-[15px] text-white/70 py-1">
                <MapPinIcon />
                <span>{TURF_INFO.location}</span>
              </div>
            </div>
          </FadeInSection>

          {/* ── Get Directions ────────────────────────── */}
          <FadeInSection>
            <h3 className="font-display font-semibold text-white text-base mb-4">Find Us</h3>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Located on Gobichettipalayam Road, easily accessible from Erode city center.
            </p>
            <a
              href={TURF_INFO.contact.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-md bg-black/40 rounded-full border border-white/10 text-white/70 hover:bg-black/50 hover:text-white text-sm px-5 py-2.5 inline-flex items-center gap-2 transition-all"
            >
              <MapPinIcon />
              Get Directions
              <ExternalLinkIcon />
            </a>
          </FadeInSection>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────── */}
      <div className="border-t border-zinc-800">
        <div className="container-app py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/70">
          <span>© 2025 {TURF_INFO.name}. All rights reserved.</span>
          <span>Made with <span className="text-purple-500">♥</span> in Erode</span>
        </div>
      </div>
    </footer>
  )
}
