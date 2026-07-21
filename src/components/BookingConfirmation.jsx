import { useState } from 'react'
import { motion } from 'framer-motion'
import { TURF_INFO } from '../data/mockData'
import { saveBooking } from '../lib/bookingStore'

export default function BookingConfirmation({ slot, date, onClose, isPreBooking = false, onSuccess }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState('')

  if (!slot || !date) return null

  // Format date nicely
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!phone.trim()) {
      setError('Please enter your phone number.')
      return
    }
    setError('')

    // Save slot to local database/Supabase
    await saveBooking(date, slot.id, { name, phone, type: isPreBooking ? 'Pre-Booking' : 'Instant' })
    
    // Callback to trigger re-fetch of booked slots in UI
    if (onSuccess) {
      onSuccess()
    }
    setIsConfirmed(true)
  }

  // Build WhatsApp message
  const bookingType = isPreBooking ? 'Pre-Booking' : 'Booking'
  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to confirm a ${bookingType} at ${TURF_INFO.name}.\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `📅 Date: ${formattedDate}\n` +
    `⏰ Time: ${slot.startTime} – ${slot.endTime}\n` +
    `💰 Price: ₹${slot.price}\n\n` +
    `Please confirm my slot. Thank you!`
  )
  const whatsappUrl = `https://wa.me/${TURF_INFO.contact.whatsapp}?text=${whatsappMessage}`

  // Phone link
  const phoneUrl = `tel:${TURF_INFO.contact.phone.replace(/\s/g, '')}`

  const details = [
    { label: 'Date', value: formattedDate },
    { label: 'Time', value: `${slot.startTime} – ${slot.endTime}` },
    { label: 'Duration', value: '1 Hour' },
    { label: 'Price', value: `₹${slot.price}`, highlight: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-md"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-[480px] max-h-[85vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-t-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 rounded-full bg-zinc-700" />
        </div>

        <div className="px-5 pb-8">
          {!isConfirmed ? (
            /* ── Step 1: Input Form ──────────────────────── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-white text-center">
                Confirm Details
              </h3>
              <p className="text-zinc-400 text-xs text-center">
                Fill in your details below to reserve your slot in the scheduler.
              </p>

              {/* Details summary */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4 divide-y divide-zinc-800">
                {details.map((item, i) => (
                  <div key={i} className={`flex justify-between items-center ${i > 0 ? 'pt-2.5' : ''} ${i < details.length - 1 ? 'pb-2.5' : ''}`}>
                    <span className="text-xs text-white/60">{item.label}</span>
                    <span className={`text-xs font-semibold ${item.highlight ? 'text-purple-400' : 'text-white'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form Inputs */}
              <div className="flex flex-col gap-3 mt-1">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs text-center">{error}</p>}

              <button
                type="submit"
                className="w-full min-h-[48px] rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm hover:opacity-90 active:scale-[0.99] transition-all"
              >
                Book & Reserve Slot
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-medium text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                Cancel
              </button>
            </form>
          ) : (
            /* ── Step 2: Success & Redirection ───────────── */
            <div className="flex flex-col items-center">
              {/* Success checkmark */}
              <div className="flex justify-center mb-4 mt-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              </div>

              <h3 className="text-xl font-bold text-white text-center mb-2">
                Slot Reserved! 🎉
              </h3>
              <p className="text-zinc-400 text-xs text-center max-w-sm mb-6 leading-relaxed">
                Your booking is saved in the scheduler database. Click below to notify us on WhatsApp or call to confirm your play time.
              </p>

              {/* Details summary */}
              <div className="w-full rounded-lg border border-zinc-800 bg-zinc-800/30 p-4 mb-6 divide-y divide-zinc-800">
                {details.map((item, i) => (
                  <div key={i} className={`flex justify-between items-center ${i > 0 ? 'pt-2.5' : ''} ${i < details.length - 1 ? 'pb-2.5' : ''}`}>
                    <span className="text-xs text-white/60">{item.label}</span>
                    <span className={`text-xs font-semibold ${item.highlight ? 'text-purple-400' : 'text-white'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 w-full">
                {/* WhatsApp */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  className="w-full min-h-[48px] rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 hover:brightness-110"
                  style={{
                    background: '#25D366',
                    boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Notify via WhatsApp
                </motion.a>

                {/* Phone */}
                <motion.a
                  href={phoneUrl}
                  whileTap={{ scale: 0.97 }}
                  className="bg-black/40 backdrop-blur-md w-full min-h-[48px] rounded-xl font-semibold text-white/70 text-sm flex items-center justify-center gap-2 cursor-pointer border border-white/10 hover:bg-black/50 hover:text-white transition-all"
                >
                  📞 Call to Confirm
                </motion.a>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-zinc-800 bg-zinc-800 text-sm text-zinc-300 hover:bg-zinc-700 transition-all font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
