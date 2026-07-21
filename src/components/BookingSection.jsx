import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getNext7Days, generateTimeSlots } from '../data/mockData'
import { getPersistedBookings } from '../lib/bookingStore'
import BookingConfirmation from './BookingConfirmation'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
}

const slotVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
}

export default function BookingSection() {
  const days = useMemo(() => getNext7Days(), [])
  const [selectedDate, setSelectedDate] = useState(days[0].date)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [isPreBooking, setIsPreBooking] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [persistedBookings, setPersistedBookings] = useState([])
  const scrollRef = useRef(null)

  const selectedDay = days.find((d) => d.date === selectedDate)

  // Fetch booked slots from storage on date change
  useEffect(() => {
    let active = true
    async function load() {
      const booked = await getPersistedBookings(selectedDate)
      if (active) {
        setPersistedBookings(booked)
      }
    }
    load()
    return () => { active = false }
  }, [selectedDate])

  // Merge mock slots with persistent bookings
  const slots = useMemo(() => {
    const baseSlots = generateTimeSlots(selectedDate)
    return baseSlots.map((slot) => {
      if (persistedBookings.includes(slot.id)) {
        return { ...slot, status: 'booked' }
      }
      return slot
    })
  }, [selectedDate, persistedBookings])

  // Reset selected slot when date changes
  useEffect(() => {
    setSelectedSlot(null)
  }, [selectedDate])

  const handleSlotSelect = (slot) => {
    if (slot.status === 'booked') return
    setSelectedSlot(selectedSlot?.id === slot.id ? null : slot)
  }

  const handleBookingSuccess = (slotId) => {
    setPersistedBookings((prev) => [...prev, slotId])
    setSelectedSlot(null)
  }

  return (
    <section id="booking" className="relative py-16 px-4 sm:px-6 bg-black">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[480px] mx-auto">
        {/* ── Section Header ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <span className="text-gray-300 uppercase tracking-wider font-medium text-xs mb-2">Seamless Booking</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
            Book Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Session</span>
          </h2>
          <p className="text-gray-400 text-sm">Select your date, pick a time, and you're in!</p>
        </motion.div>

        {/* ── Pre-Book Toggle ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 flex gap-1 shadow-md">
            <button
              onClick={() => setIsPreBooking(false)}
              className={`flex-1 min-h-[48px] rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer ${
                !isPreBooking
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ⚡ Book Now
            </button>
            <button
              onClick={() => setIsPreBooking(true)}
              className={`flex-1 min-h-[48px] rounded-md text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isPreBooking
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📅 Pre-Book
              {isPreBooking && (
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                  Advance
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* ── Date Picker ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-4"
        >
          <div
            ref={scrollRef}
            className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
          >
            {days.map((day, i) => {
              // In pre-book mode, skip today (index 0) and tomorrow (index 1)
              if (isPreBooking && i < 2) return null

              const isActive = selectedDate === day.date
              return (
                <motion.button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  whileTap={{ scale: 0.93 }}
                  className={`snap-center flex-shrink-0 min-w-[68px] min-h-[72px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-500/20 text-white'
                      : 'bg-zinc-900 border-zinc-800 hover:border-purple-500/50 hover:shadow-lg'
                  }`}
                >
                  <span className={`text-[11px] font-medium uppercase tracking-wider ${isActive ? 'text-white/90' : 'text-zinc-400'}`}>
                    {day.dayName}
                  </span>
                  <span className={`text-xl font-bold ${isActive ? 'text-white' : 'text-white/90'}`}>
                    {day.dayNum}
                  </span>
                  <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-zinc-500'}`}>
                    {day.month}
                  </span>
                  {day.isWeekend && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isActive ? 'bg-white' : 'bg-[#FFD700]'}`} />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* ── Weekend Indicator ───────────────────────── */}
        <AnimatePresence>
          {selectedDay?.isWeekend && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg px-4 py-2.5">
                <span className="text-base">⚡</span>
                <span className="text-[#FFD700] text-sm font-medium">
                  Weekend rates apply — prices are ₹200/hr higher
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pre-booking Badge ───────────────────────── */}
        <AnimatePresence>
          {isPreBooking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 rounded-lg px-4 py-2.5">
                <span className="text-base">⏳</span>
                <span className="text-purple-400 text-sm font-medium">
                  Pre-booking mode — Reserve your slot in advance
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Time Slots Grid ─────────────────────────── */}
        <motion.div
          key={selectedDate}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <AnimatePresence mode="popLayout">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id
              const isBooked = slot.status === 'booked'

              return (
                <motion.button
                  key={slot.id}
                  layoutId={slot.id}
                  variants={slotVariants}
                  whileTap={!isBooked ? { scale: 0.95 } : {}}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={isBooked}
                  className={`relative rounded-lg p-3.5 text-left transition-all duration-200 border cursor-pointer min-h-[90px] flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-500/20 text-white'
                      : isBooked
                        ? 'bg-zinc-900 border-red-500/20 opacity-50 cursor-not-allowed'
                        : 'bg-zinc-900 border-zinc-800 hover:border-purple-500/50 hover:shadow-lg'
                  }`}
                >
                  {/* Status dot */}
                  <div className="flex items-start justify-between">
                    <span className={`text-sm font-medium leading-tight ${
                      isSelected ? 'text-white' : isBooked ? 'text-zinc-500' : 'text-white'
                    }`}>
                      {slot.startTime}
                      <br />
                      <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-zinc-500'}`}>
                        to {slot.endTime}
                      </span>
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                        isSelected
                          ? 'bg-white'
                          : isBooked
                            ? 'bg-red-500'
                            : 'bg-purple-500 shadow-sm shadow-purple-500/50'
                      }`}
                    />
                  </div>

                  <div className="flex items-end justify-between mt-2">
                    <span className={`text-lg font-bold ${
                      isSelected
                        ? 'text-white'
                        : isBooked
                          ? 'text-zinc-600 line-through'
                          : 'text-[#FFD700]'
                    }`}>
                      ₹{slot.price}
                    </span>
                    {isBooked && (
                      <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">
                        Booked
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
                        Selected ✓
                      </span>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Spacer when summary bar is visible */}
        {selectedSlot && <div className="h-28" />}
      </div>

      {/* ── Booking Summary Bar ───────────────────────── */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div className="bg-black/90 backdrop-blur-xl border-t border-zinc-800 px-4 pt-4 pb-6">
              <div className="max-w-[480px] mx-auto flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-base truncate">
                    {selectedSlot.startTime} – {selectedSlot.endTime}
                  </p>
                  <p className="text-[#FFD700] font-bold text-lg">₹{selectedSlot.price}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirmation(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-lg min-h-[48px] px-6 text-sm font-medium whitespace-nowrap transition-colors"
                >
                  Confirm Booking →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Booking Confirmation Modal ────────────────── */}
      <AnimatePresence>
        {showConfirmation && selectedSlot && (
          <BookingConfirmation
            slot={selectedSlot}
            date={selectedDate}
            onClose={() => setShowConfirmation(false)}
            isPreBooking={isPreBooking}
            onSuccess={() => handleBookingSuccess(selectedSlot.id)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
