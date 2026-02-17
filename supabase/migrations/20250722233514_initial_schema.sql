-- NutriWell Database Schema
-- This schema is designed for Supabase/PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table - stores user profiles and preferences
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Privy user ID
  email TEXT UNIQUE,
  phone TEXT,
  wallet_address TEXT,
  
  -- Profile information
  display_name TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  
  -- Physical metrics
  height_cm INTEGER,
  weight_kg DECIMAL(5,2),
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'super_active')),
  
  -- Goals and preferences
  primary_goal TEXT CHECK (primary_goal IN ('lose_weight', 'gain_weight', 'maintain_weight', 'build_muscle', 'improve_health')),
  target_weight_kg DECIMAL(5,2),
  daily_calorie_goal INTEGER,
  
  -- Dietary preferences
  dietary_restrictions TEXT[], -- ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', etc.]
  allergies TEXT[],
  disliked_foods TEXT[],
  
  -- App preferences
  preferences JSONB DEFAULT '{
    "units": "metric",
    "theme": "light",
    "notifications": true,
    "privacy_level": "private",
    "data_sharing": false
  }'::jsonb,
  
  -- Subscription
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Nutrition entries table - stores daily food intake
CREATE TABLE IF NOT EXISTS nutrition_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Entry details
  date DATE NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  
  -- Food information
  food_name TEXT NOT NULL,
  brand TEXT,
  serving_size TEXT,
  quantity DECIMAL(8,2) NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'serving',
  
  -- Nutritional data (per serving)
  calories INTEGER NOT NULL DEFAULT 0,
  protein_g DECIMAL(8,2) DEFAULT 0,
  carbs_g DECIMAL(8,2) DEFAULT 0,
  fat_g DECIMAL(8,2) DEFAULT 0,
  fiber_g DECIMAL(8,2) DEFAULT 0,
  sugar_g DECIMAL(8,2) DEFAULT 0,
  sodium_mg DECIMAL(8,2) DEFAULT 0,
  
  -- Micronutrients (optional)
  vitamin_a_mcg DECIMAL(8,2) DEFAULT 0,
  vitamin_c_mg DECIMAL(8,2) DEFAULT 0,
  calcium_mg DECIMAL(8,2) DEFAULT 0,
  iron_mg DECIMAL(8,2) DEFAULT 0,
  
  -- Additional data
  notes TEXT,
  source TEXT, -- 'manual', 'barcode', 'recipe', 'database'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recipes table - stores user-created recipes
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Recipe details
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT[],
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  servings INTEGER NOT NULL DEFAULT 1,
  
  -- Nutritional data (per serving)
  calories_per_serving INTEGER DEFAULT 0,
  protein_per_serving_g DECIMAL(8,2) DEFAULT 0,
  carbs_per_serving_g DECIMAL(8,2) DEFAULT 0,
  fat_per_serving_g DECIMAL(8,2) DEFAULT 0,
  fiber_per_serving_g DECIMAL(8,2) DEFAULT 0,
  
  -- Recipe metadata
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  cuisine_type TEXT,
  dietary_tags TEXT[], -- ['vegetarian', 'gluten_free', etc.]
  
  -- Images
  image_url TEXT,
  
  -- Social features
  is_public BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  rating_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recipe ingredients table - stores ingredients for recipes
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  
  -- Ingredient details
  name TEXT NOT NULL,
  quantity DECIMAL(8,2) NOT NULL,
  unit TEXT NOT NULL,
  notes TEXT,
  
  -- Order in recipe
  sort_order INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity entries table - stores exercise and activity data
CREATE TABLE IF NOT EXISTS activity_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Activity details
  date DATE NOT NULL,
  activity_type TEXT NOT NULL, -- 'cardio', 'strength', 'sports', 'daily_living'
  activity_name TEXT NOT NULL, -- 'running', 'cycling', 'push_ups', etc.
  
  -- Duration and intensity
  duration_minutes INTEGER,
  intensity TEXT CHECK (intensity IN ('low', 'moderate', 'high', 'very_high')),
  
  -- Metrics
  calories_burned INTEGER DEFAULT 0,
  distance_km DECIMAL(8,2),
  steps INTEGER,
  heart_rate_avg INTEGER,
  heart_rate_max INTEGER,
  
  -- Strength training specific
  sets INTEGER,
  reps INTEGER,
  weight_kg DECIMAL(8,2),
  
  -- Additional data
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meal plans table - stores weekly meal planning
CREATE TABLE IF NOT EXISTS meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Plan details
  name TEXT NOT NULL,
  week_start_date DATE NOT NULL,
  
  -- Plan data (JSON structure for flexibility)
  plan_data JSONB NOT NULL DEFAULT '{}'::jsonb, -- Contains the weekly meal plan structure
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User goals table - tracks progress towards goals
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Goal details
  goal_type TEXT NOT NULL CHECK (goal_type IN ('weight', 'calories', 'protein', 'steps', 'exercise_minutes')),
  target_value DECIMAL(10,2) NOT NULL,
  current_value DECIMAL(10,2) DEFAULT 0,
  unit TEXT NOT NULL,
  
  -- Timeline
  start_date DATE NOT NULL,
  target_date DATE,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  achieved BOOLEAN DEFAULT FALSE,
  achieved_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_nutrition_entries_user_date ON nutrition_entries(user_id, date);
CREATE INDEX IF NOT EXISTS idx_activity_entries_user_date ON activity_entries(user_id, date);
CREATE INDEX IF NOT EXISTS idx_recipes_user_public ON recipes(user_id, is_public);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_active ON meal_plans(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_user_goals_user_active ON user_goals(user_id, is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nutrition_entries_updated_at BEFORE UPDATE ON nutrition_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activity_entries_updated_at BEFORE UPDATE ON activity_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at BEFORE UPDATE ON meal_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_goals_updated_at BEFORE UPDATE ON user_goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (id = current_user_id());
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (id = current_user_id());

CREATE POLICY "Users can view own nutrition entries" ON nutrition_entries FOR ALL USING (user_id = current_user_id());
CREATE POLICY "Users can view own activity entries" ON activity_entries FOR ALL USING (user_id = current_user_id());
CREATE POLICY "Users can view own meal plans" ON meal_plans FOR ALL USING (user_id = current_user_id());
CREATE POLICY "Users can view own goals" ON user_goals FOR ALL USING (user_id = current_user_id());

-- Recipes can be viewed by owner or if public
CREATE POLICY "Users can view own recipes" ON recipes FOR ALL USING (user_id = current_user_id());
CREATE POLICY "Users can view public recipes" ON recipes FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view recipe ingredients for accessible recipes" ON recipe_ingredients 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM recipes r 
    WHERE r.id = recipe_ingredients.recipe_id 
    AND (r.user_id = current_user_id() OR r.is_public = true)
  )
);

-- Function to get current user ID (will be set by the application)
CREATE OR REPLACE FUNCTION current_user_id() RETURNS TEXT AS $$
  SELECT COALESCE(
    current_setting('app.current_user_id', true),
    'anonymous'
  );
$$ LANGUAGE sql STABLE;