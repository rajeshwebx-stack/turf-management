import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TURF_INFO } from '../data/mockData'

export default function Preloader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #000000, #1a0533)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl text-white"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
            >
              {TURF_INFO.name.split(' ').map(w => w[0]).join('')}
            </div>

            {/* Loading bar */}
            <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #8B5CF6, #EC4899)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>

            <span className="text-white/40 text-sm font-medium tracking-widest uppercase">{TURF_INFO.name}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
