import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.HAGE_SUPABASE_URL
const supabaseAnonKey = process.env.HAGE_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.HAGE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("HAGE_SUPABASE_URL and HAGE_SUPABASE_ANON_KEY must be set")
}

// Anon client — for public/read queries if needed
export const hageSupabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client — server-side API routes only, bypasses RLS.
// Auth is already enforced by NextAuth session checks in each route.
export function hageAdmin() {
  if (!serviceRoleKey) throw new Error("HAGE_SUPABASE_SERVICE_ROLE_KEY is not set")
  return createClient(supabaseUrl!, serviceRoleKey, {
    auth: { persistSession: false },
  })
}

export type GardenMarker = {
  id: string
  user_email: string
  lat: number
  lng: number
  type_id: string
  label: string
  color: string
  created_at: string
}

export type GardenBudget = {
  id: string
  user_email: string
  what: string
  shop: string
  amount: number
  category: string
  year: number
  date: string
  created_at: string
}

export type GardenNote = {
  id: string
  user_email: string
  month: number
  content: string
  updated_at: string
}
