import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  image_url: string | null
  tier: 'free' | 'silver' | 'gold' | 'platinum'
  created_at: string
}

export type Tier = 'free' | 'silver' | 'gold' | 'platinum'

// Tier hierarchy for filtering
export const TIER_HIERARCHY: Record<Tier, number> = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
}

export const TIER_COLORS: Record<Tier, string> = {
  free: 'bg-gray-100 text-gray-800',
  silver: 'bg-gray-200 text-gray-900',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800',
}