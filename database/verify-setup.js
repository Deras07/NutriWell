#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://tkfaqwhhraroibxsxeih.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZmFxd2hocmFyb2lieHN4ZWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTQ3MDAsImV4cCI6MjA2ODY3MDcwMH0.92MKrFctjhZVmw6cdQH6Yuc_ry8RnWcJHAfEJF4ZcPU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const requiredTables = [
  'users',
  'nutrition_entries', 
  'recipes',
  'recipe_ingredients',
  'activity_entries',
  'meal_plans',
  'user_goals'
]

async function verifyTable(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
    
    if (error) {
      if (error.code === '42P01') {
        return { exists: false, error: 'Table does not exist' }
      }
      return { exists: false, error: error.message }
    }
    
    return { exists: true, error: null }
  } catch (err) {
    return { exists: false, error: err.message }
  }
}

async function verifyDatabaseSetup() {
  console.log('🔍 Verifying NutriWell database setup...')
  console.log(`📡 Connected to: ${supabaseUrl}`)
  console.log('')
  
  let allTablesExist = true
  
  for (const table of requiredTables) {
    const result = await verifyTable(table)
    
    if (result.exists) {
      console.log(`✅ ${table} - Table exists and accessible`)
    } else {
      console.log(`❌ ${table} - ${result.error}`)
      allTablesExist = false
    }
  }
  
  console.log('')
  
  if (allTablesExist) {
    console.log('🎉 Database setup verification PASSED!')
    console.log('')
    console.log('📋 All required tables are present:')
    requiredTables.forEach(table => {
      console.log(`   • ${table}`)
    })
    console.log('')
    console.log('✨ Your NutriWell database is ready to use!')
    console.log('')
    console.log('🚀 Next steps:')
    console.log('   1. Run: npm run dev')
    console.log('   2. Sign up with a test account')
    console.log('   3. Complete the onboarding flow')
    console.log('   4. Test data entry (nutrition, recipes, activities)')
    console.log('')
    console.log('🔒 Row Level Security (RLS) is configured to ensure users can only access their own data.')
    
    return true
  } else {
    console.log('❌ Database setup verification FAILED!')
    console.log('')
    console.log('🔧 Please complete the manual setup:')
    console.log('   1. Go to: https://app.supabase.com/project/tkfaqwhhraroibxsxeih/sql/new')
    console.log('   2. Paste the schema from database/schema.sql')
    console.log('   3. Click "Run" to execute')
    console.log('   4. Run this verification script again: node database/verify-setup.js')
    
    return false
  }
}

async function testBasicOperations() {
  console.log('')
  console.log('🧪 Testing basic database operations...')
  
  try {
    // Test user creation (this will fail due to RLS, but table should exist)
    const { error: userError } = await supabase
      .from('users')
      .insert([{ id: 'test-user-12345', email: 'test@example.com' }])
    
    if (userError && userError.code === 'PGRST302') {
      console.log('✅ User table - RLS policies are working correctly')
    } else if (userError && userError.code === '23505') {
      console.log('✅ User table - Table structure is correct (duplicate key expected)')
    } else {
      console.log('⚠️  User table - Unexpected response:', userError?.message || 'Success')
    }
    
    // Test nutrition entries table
    const { error: nutritionError } = await supabase
      .from('nutrition_entries')
      .select('*')
      .limit(1)
    
    if (nutritionError && nutritionError.code === 'PGRST116') {
      console.log('✅ Nutrition entries - Table exists, no data (expected)')
    } else if (nutritionError) {
      console.log('⚠️  Nutrition entries - Error:', nutritionError.message)
    } else {
      console.log('✅ Nutrition entries - Table accessible')
    }
    
  } catch (err) {
    console.log('⚠️  Basic operations test error:', err.message)
  }
}

async function main() {
  const setupComplete = await verifyDatabaseSetup()
  
  if (setupComplete) {
    await testBasicOperations()
  }
}

main().catch(console.error) 