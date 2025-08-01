# NutriWell Database Setup - Quick Reference

## ✅ Current Status: PENDING EXECUTION

### What's Ready:
- ✅ Supabase project configured
- ✅ Connection details verified
- ✅ Schema file prepared (`schema.sql`)
- ✅ Verification script created

### What You Need To Do:

#### 1. Execute Schema (2 minutes)
```bash
# Open Supabase SQL Editor
open "https://app.supabase.com/project/tkfaqwhhraroibxsxeih/sql/new"

# Copy schema to clipboard  
cat database/schema.sql | pbcopy

# Then paste in SQL Editor and click "Run"
```

#### 2. Verify Setup
```bash
node database/verify-setup.js
```

#### 3. Start Development
```bash
npm run dev
```

## 🎯 Expected Results

After executing the schema, you should see:
- ✅ 7 tables created (users, nutrition_entries, recipes, etc.)
- ✅ Row Level Security (RLS) policies configured
- ✅ Indexes and triggers set up
- ✅ All verification tests passing

## 🏗️ Database Schema Overview

| Table | Purpose |
|-------|---------|
| `users` | User profiles and preferences |
| `nutrition_entries` | Daily food intake tracking |
| `recipes` | User-created recipes |
| `recipe_ingredients` | Recipe ingredient details |
| `activity_entries` | Exercise and activity data |
| `meal_plans` | Weekly meal planning |
| `user_goals` | Progress tracking towards goals |

## 🔒 Security

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Public recipes are visible to all users
- Anonymous access properly restricted

## 🧪 Testing

After setup, test with:
1. Sign up with a test account
2. Complete onboarding flow
3. Add nutrition entries
4. Create recipes
5. Track activities

## 📞 Support

If you encounter issues:
1. Check Supabase dashboard logs
2. Verify environment variables
3. Re-run verification script
4. Check browser console for errors 