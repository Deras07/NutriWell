import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tkfaqwhhraroibxsxeih.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZmFxd2hocmFyb2lieHN4ZWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTQ3MDAsImV4cCI6MjA2ODY3MDcwMH0.92MKrFctjhZVmw6cdQH6Yuc_ry8RnWcJHAfEJF4ZcPU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'implicit'
  },
  global: {
    headers: {
      'x-client-info': 'nutriwell@1.0.0'
    }
  }
})

// Database helpers
export const dbHelpers = {
  // User operations
  async createUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()
      
      if (error) {
        console.error('Error creating user:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('Database error in createUser:', err)
      throw err
    }
  },

  async getUserById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('Database error in getUserById:', err)
      throw err
    }
  },

  async updateUser(id, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Nutrition data operations
  async saveNutritionEntry(entry) {
    const { data, error } = await supabase
      .from('nutrition_entries')
      .insert([entry])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserNutritionEntries(userId, dateFrom, dateTo) {
    let query = supabase
      .from('nutrition_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (dateFrom) query = query.gte('date', dateFrom)
    if (dateTo) query = query.lte('date', dateTo)
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  // Recipe operations
  async saveRecipe(recipe) {
    const { data, error } = await supabase
      .from('recipes')
      .insert([recipe])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserRecipes(userId) {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Activity operations
  async saveActivityEntry(entry) {
    const { data, error } = await supabase
      .from('activity_entries')
      .insert([entry])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserActivityEntries(userId, dateFrom, dateTo) {
    let query = supabase
      .from('activity_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (dateFrom) query = query.gte('date', dateFrom)
    if (dateTo) query = query.lte('date', dateTo)
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  }
}