# NutriWell Database Setup Guide

This guide will help you set up the database schema for your NutriWell application using Supabase.

## Prerequisites

1. **Supabase Project**: You already have a Supabase project configured with the connection details in your `.env.local` file.

2. **Database Access**: You can access your Supabase dashboard at: https://app.supabase.com/project/tkfaqwhhraroibxsxeih

## Setup Steps

### Step 1: Execute the Schema

1. Go to your Supabase Dashboard
2. Navigate to the "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the contents of `schema.sql` into the editor
5. Click "Run" to execute the schema

### Step 2: Verify Tables Created

After running the schema, you should have the following tables:

- **users** - User profiles and preferences
- **nutrition_entries** - Daily food intake tracking
- **recipes** - User-created recipes
- **recipe_ingredients** - Ingredients for recipes
- **activity_entries** - Exercise and activity data
- **meal_plans** - Weekly meal planning
- **user_goals** - Progress tracking towards goals

### Step 3: Set Up Row Level Security (RLS)

The schema automatically sets up Row Level Security policies that ensure:
- Users can only access their own data
- Public recipes are visible to all users
- Proper access control for all tables

### Step 4: Test Database Connection

You can test the database connection by running your app:

```bash
npm run dev
```

The app will automatically:
1. Connect to Supabase using the configured credentials
2. Create user records when users sign up through Privy
3. Sync authentication state between Privy and Supabase

## Database Schema Overview

### Users Table
Stores user profiles, preferences, goals, and subscription information. Linked to Privy authentication via the `id` field.

### Nutrition Tracking
- `nutrition_entries`: Individual food items logged by users
- Supports manual entry, barcode scanning, and recipe-based logging
- Tracks macronutrients and micronutrients

### Recipe System
- `recipes`: User-created recipes with nutritional calculations
- `recipe_ingredients`: Detailed ingredient lists for recipes
- Supports public sharing and rating system

### Activity Tracking
- `activity_entries`: Exercise and physical activity logging
- Supports different activity types and intensity levels
- Integrates with calorie burn calculations

### Meal Planning
- `meal_plans`: Weekly meal planning with JSON structure
- Flexible schema to support various meal planning approaches

### Goal Tracking
- `user_goals`: Tracks progress towards health and fitness goals
- Supports various goal types (weight, calories, steps, etc.)

## Environment Variables

Make sure your environment variables are correctly set:

```env
# In your .env file (for Vite - client-side)
VITE_SUPABASE_URL=https://tkfaqwhhraroibxsxeih.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_PRIVY_APP_ID=cmdf0y8n9016ajr0mip04tin3

# In your .env.local file (for server-side if needed)
SUPABASE_URL=https://tkfaqwhhraroibxsxeih.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PRIVY_APP_SECRET=your_privy_app_secret
```

## Authentication Flow

1. **User Signs In**: Via Privy (email, SMS, or wallet)
2. **User Sync**: App automatically creates/updates user in Supabase
3. **Onboarding**: New users complete profile setup
4. **Data Access**: All subsequent data operations use Supabase with RLS

## Troubleshooting

### Connection Issues
- Verify your Supabase URL and keys in environment variables
- Check that your Supabase project is active
- Ensure your IP is allowlisted in Supabase settings

### Authentication Issues
- Confirm Privy app ID is correct
- Check that user IDs are being properly synced between Privy and Supabase
- Verify RLS policies are not blocking legitimate access

### Schema Issues
- If tables already exist, you may need to drop them first
- Check the Supabase logs for any SQL execution errors
- Ensure all extensions are properly installed

## Next Steps

After setting up the database:

1. **Test Authentication**: Sign up with a test account
2. **Complete Onboarding**: Fill out the user profile
3. **Test Data Entry**: Add some nutrition entries or recipes
4. **Verify RLS**: Ensure users can only see their own data

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Review the Supabase logs in your dashboard
3. Verify all environment variables are correctly set
4. Test the database connection directly in Supabase SQL Editor