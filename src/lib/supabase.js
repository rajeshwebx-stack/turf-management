// TurfZone – Supabase client configuration
// Replace with your actual Supabase project URL and anon key

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ──────────────────────────────────────────────
// Helper functions
// ──────────────────────────────────────────────

/** Fetch all turfs */
export async function getTurfs() {
  const { data, error } = await supabase
    .from('turfs')
    .select('*')
    .order('rating', { ascending: false })
  if (error) throw error
  return data
}

/** Fetch available slots for a turf on a given date */
export async function getAvailableSlots(turfId, date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('slot_start, slot_end')
    .eq('turf_id', turfId)
    .eq('date', date)
  if (error) throw error
  return data
}

/** Create a new booking */
export async function createBooking(booking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
  if (error) throw error
  return data[0]
}
