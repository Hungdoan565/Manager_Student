import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable automatic refresh of tokens
    autoRefreshToken: true,
    // Persist session in localStorage
    persistSession: true,
    // Detect session from URL
    detectSessionInUrl: true
  },
  // Enable real-time subscriptions
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Helper functions for common operations
export const supabaseHelpers = {
  // Get current user
  async getCurrentUser() {
    // First, check if there is a session. If not, simply return null
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError
    if (!session) return null

    // With a session present, fetch the user
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      // Gracefully handle the common "Auth session missing" error
      if (error.name === 'AuthSessionMissingError') return null
      throw error
    }
    return user ?? null
  },

  // Get user profile
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) return false
    return !!session
  }
}

// Export Supabase client
export default supabase