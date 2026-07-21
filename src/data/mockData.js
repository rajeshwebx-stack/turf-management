// Sunshine Turf — single-turf cricket booking data

export const TURF_INFO = {
  name: 'Sunshine Turf',
  tagline: "Erode's Premier Cricket Experience",
  description:
    "Experience the finest box cricket in Erode with our state-of-the-art artificial turf, professional-grade floodlights, and top-notch facilities. Whether it's a friendly weekend match or competitive league play, Sunshine Turf delivers an unmatched cricketing experience.",
  location: 'Gobichettipalayam Road, Erode, Tamil Nadu 638001',
  contact: {
    phone: '+91 98765 43210',
    email: 'book@sunshineturf.in',
    whatsapp: '919876543210',
    instagram: 'https://instagram.com/sunshineturf',
    maps: 'https://maps.google.com/?q=Sunshine+Turf+Erode',
  },
  rating: 4.8,
  totalBookings: 5000,
  totalPlayers: 12000,
}

export const AMENITIES = [
  { icon: '💡', name: 'Floodlights', desc: 'Professional LED floodlights for night play' },
  { icon: '🅿️', name: 'Free Parking', desc: 'Ample parking space for cars & bikes' },
  { icon: '🚿', name: 'Washroom', desc: 'Clean restrooms & changing rooms' },
  { icon: '🏏', name: 'Equipment', desc: 'Bats, balls, stumps available on request' },
  { icon: '🪑', name: 'Seating Area', desc: 'Covered gallery for spectators' },
  { icon: '💧', name: 'Drinking Water', desc: 'RO purified drinking water' },
  { icon: '📶', name: 'Free Wi-Fi', desc: 'High-speed Wi-Fi in the venue' },
  { icon: '🎥', name: 'CCTV', desc: '24/7 security surveillance' },
]

export const RULES = [
  'Rubber-soled or turf shoes only — no spikes allowed',
  'Maximum 7 players per side for box cricket',
  'Arrive 10 minutes before your slot',
  'No smoking or alcohol inside the premises',
  'Outside food not allowed — snack counter available',
  'Equipment damage will be charged separately',
  'Cancellations must be made 2 hours before the slot',
  "Management reserves the right to reschedule during bad weather",
]

export const TURF_DETAILS = {
  surface: { label: 'Surface', value: 'Premium Artificial Turf', icon: '🌿' },
  pitchSize: { label: 'Pitch Size', value: '22 × 14 m (Box Cricket)', icon: '📐' },
  format: { label: 'Format', value: '5-a-side / 6-a-side / 7-a-side', icon: '🏏' },
  floodlights: { label: 'Floodlights', value: 'Professional LED — Day & Night', icon: '💡' },
  boundary: { label: 'Boundary', value: 'Netted enclosure — 20ft high', icon: '🏁' },
  scoreboard: { label: 'Scoreboard', value: 'Digital LED scoreboard', icon: '📊' },
}

export const PRICING = [
  {
    id: 'morning',
    label: 'Morning',
    timeRange: '6:00 AM – 10:00 AM',
    icon: '🌅',
    weekday: 800,
    weekend: 1000,
    tag: 'Value Deal',
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    timeRange: '10:00 AM – 4:00 PM',
    icon: '☀️',
    weekday: 900,
    weekend: 1100,
    tag: null,
  },
  {
    id: 'evening',
    label: 'Evening',
    timeRange: '4:00 PM – 9:00 PM',
    icon: '🌇',
    weekday: 1200,
    weekend: 1400,
    tag: 'Peak Hours',
  },
  {
    id: 'night',
    label: 'Night',
    timeRange: '9:00 PM – 12:00 AM',
    icon: '🌙',
    weekday: 1000,
    weekend: 1200,
    tag: 'Popular',
  },
]

/** Returns the next 7 days starting from today. */
export function getNext7Days() {
  const days = []
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]

  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push({
      date: d.toISOString().split('T')[0],
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      month: monthNames[d.getMonth()],
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    })
  }
  return days
}

/** Generates 18 hourly time slots (6 AM – 12 AM) for a given date string. */
export function generateTimeSlots(dateStr) {
  const date = new Date(dateStr)
  const isWeekend = date.getDay() === 0 || date.getDay() === 6
  const slots = []

  for (let h = 6; h < 24; h++) {
    const fmt = (hr) => {
      const suffix = hr >= 12 ? 'PM' : 'AM'
      const display = hr > 12 ? hr - 12 : hr === 0 ? 12 : hr
      return `${display}:00 ${suffix}`
    }

    let price
    if (h >= 6 && h < 10) price = isWeekend ? 1000 : 800
    else if (h >= 10 && h < 16) price = isWeekend ? 1100 : 900
    else if (h >= 16 && h < 21) price = isWeekend ? 1400 : 1200
    else price = isWeekend ? 1200 : 1000

    // Deterministic "random" based on hour + date for demo
    const rand = Math.abs(Math.sin(h * 13 + date.getDate() * 7))
    const status = rand < 0.25 ? 'booked' : 'available'

    slots.push({
      id: `${dateStr}-${h}`,
      hour: h,
      startTime: fmt(h),
      endTime: fmt(h + 1),
      price,
      status,
      isWeekend,
    })
  }
  return slots
}
