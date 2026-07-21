import { motion } from 'framer-motion'
import { TURF_INFO, TURF_DETAILS, AMENITIES, RULES } from '../data/mockData'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

export default function AboutSection() {
  const details = Object.values(TURF_DETAILS)

  return (
    <section id="about" className="relative py-16 px-4 sm:px-6 bg-black">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[480px] mx-auto">
        {/* ── Header ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center"
        >
          <span className="text-gray-300 uppercase tracking-wider font-medium text-xs mb-2">
            Discover
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-white">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">{TURF_INFO.name}</span>{' '}
            <span>🏟️</span>
          </h2>
          <p className="text-white/70 text-sm leading-relaxed text-center">
            {TURF_INFO.description}
          </p>
        </motion.div>

        {/* ── Turf Details Grid ──────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 gap-3 mb-10"
        >
          {details.map((detail) => (
            <motion.div
              key={detail.label}
              variants={staggerItem}
              className="rounded-lg border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:shadow-lg hover:border-purple-500/30 p-4 flex flex-col gap-1.5"
            >
              <span className="text-2xl">{detail.icon}</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/70">
                {detail.label}
              </span>
              <span className="text-sm font-semibold text-white leading-tight">
                {detail.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Amenities ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>✨</span> Amenities
          </h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            className="grid grid-cols-2 gap-3"
          >
            {AMENITIES.map((amenity) => (
              <motion.div
                key={amenity.name}
                variants={staggerItem}
                className="rounded-lg border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:shadow-lg hover:border-purple-500/30 p-4 flex flex-col gap-2 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {amenity.icon}
                </span>
                <span className="text-sm font-semibold text-white">{amenity.name}</span>
                <span className="text-xs text-white/70 leading-relaxed">{amenity.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Ground Rules ───────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📋</span> Ground Rules
          </h3>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 shadow-md p-5">
            <ol className="space-y-3.5">
              {RULES.map((rule, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  {/* Purple numbered bullet */}
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/70 leading-relaxed">{rule}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
