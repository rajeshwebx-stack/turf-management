// CricZone Arena — persistent local/Supabase booking state manager
import { supabase } from './supabase'

// Check if Supabase keys are configured
const isSupabaseConfigured = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_URL !== 'https://your-project.supabase.co' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your-anon-key'

/** 
 * Fetches all persisted bookings for a given date.
 */
export async function getPersistedBookings(dateStr) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('slot_id')
        .eq('date', dateStr)
      if (error) throw error
      return data.map(b => b.slot_id)
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to localStorage:", e)
    }
  }

  // LocalStorage Fallback
  const allBookings = JSON.parse(localStorage.getItem('criczone_bookings') || '{}')
  return allBookings[dateStr] || []
}

/** 
 * Persists a new booking for a given date.
 */
export async function saveBooking(dateStr, slotId, details = {}) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          date: dateStr,
          slot_id: slotId,
          created_at: new Date().toISOString(),
          ...details
        }])
      if (error) throw error
      return data
    } catch (e) {
      console.warn("Supabase insert failed, falling back to localStorage:", e)
    }
  }

  // LocalStorage Fallback
  const allBookings = JSON.parse(localStorage.getItem('criczone_bookings') || '{}')
  if (!allBookings[dateStr]) {
    allBookings[dateStr] = []
  }
  if (!allBookings[dateStr].includes(slotId)) {
    allBookings[dateStr].push(slotId)
  }
  localStorage.setItem('criczone_bookings', JSON.stringify(allBookings))
  return true
}
