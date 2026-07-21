import { useState } from 'react'
import { motion } from 'framer-motion'
import { PRICING } from '../data/mockData'

const tagStyles = {
  'Value Deal': 'bg-black/30 text-zinc-300 border border-gray-700',
  'Peak Hours': 'bg-black/30 text-amber-400 border border-gray-700',
  'Popular': 'bg-black/30 text-purple-400 border border-gray-700',
}

const getCardBackground = (id) => {
  switch (id) {
    case 'morning':
      return 'bg-gradient-to-b from-slate-900 to-slate-700'
    case 'afternoon':
      return 'bg-gradient-to-b from-blue-900 to-cyan-700'
    case 'evening':
      return 'bg-gradient-to-b from-amber-900 to-orange-800'
    case 'night':
      return 'bg-gradient-to-b from-purple-900 to-indigo-700'
    default:
      return 'bg-zinc-900'
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function PricingSection() {
  const [isWeekend, setIsWeekend] = useState(false)

  return (
    <section id="pricing" className="relative py-16 px-4 sm:px-6 bg-black">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[480px] mx-auto">
        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <span className="text-gray-300 uppercase tracking-wider font-medium text-xs mb-2">Transparent</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Pricing</span>
          </h2>
          <p className="text-zinc-400 text-sm">No hidden charges</p>
        </motion.div>

        {/* ── Weekday / Weekend Toggle ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-1 flex gap-1 shadow-md">
            <button
              onClick={() => setIsWeekend(false)}
              className={`flex-1 min-h-[48px] rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer ${
                !isWeekend
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Weekday
            </button>
            <button
              onClick={() => setIsWeekend(true)}
              className={`flex-1 min-h-[48px] rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isWeekend
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Weekend
            </button>
          </div>
        </motion.div>

        {/* ── Pricing Cards ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {PRICING.map((plan, i) => {
            const price = isWeekend ? plan.weekend : plan.weekday
            const bgClass = getCardBackground(plan.id)

            return (
              <motion.div
                key={plan.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                className={`${bgClass} rounded-lg p-5 relative overflow-hidden group transition-all duration-300 border border-zinc-800 shadow-md hover:shadow-lg hover:border-white/20`}
              >
                <div className="relative h-full flex flex-col">
                  {/* Icon + Tag Row */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{plan.icon}</span>
                    {plan.tag && (
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${tagStyles[plan.tag] || 'bg-black/30 text-zinc-300 border border-gray-700'}`}>
                        {plan.tag}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-white mb-0.5">{plan.label}</h3>

                  {/* Time range */}
                  <p className="text-sm text-zinc-300/80 mb-4 flex-grow">{plan.timeRange}</p>

                  {/* Price */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[#FFD700]">₹{price}</span>
                      <span className="text-sm text-zinc-300/60">/hr</span>
                    </div>

                    <a
                      href="#booking"
                      className="inline-flex w-full items-center justify-between rounded-full bg-black/40 backdrop-blur-md border border-white/30 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-black/50 transition-colors group/btn"
                    >
                      Book This Slot
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover/btn:bg-white/20 transition-colors">
                        <svg className="h-3 w-3 text-white transform transition-transform group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Hover shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
              </motion.div>
            )
          })}
        </div>

        {/* ── Weekend Note ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0">💡</span>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Weekend prices are <span className="text-[#FFD700] font-semibold">₹200/hr higher</span>.
              Holidays are charged at weekend rates.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
