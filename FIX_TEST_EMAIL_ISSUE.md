# 🔧 Fix "test@nutriwell.com" Email Issue

## Problem
Your profile still shows "test@nutriwell.com" instead of your actual email because it's cached in browser storage.

## ✅ Simple Solution

**Step 1: Clear Browser Data**
1. Press `F12` to open Developer Tools
2. Go to the `Console` tab
3. Type this command and press Enter:
   ```javascript
   localStorage.clear()
   ```
4. Close Developer Tools

**Step 2: Refresh & Sign In**
1. Refresh the page (`Ctrl+R` or `Cmd+R`)
2. Sign in again with your real email
3. Go to Profile/Settings

**Result**: Your actual email should now appear instead of "test@nutriwell.com"

## Alternative Method
If the above doesn't work:
1. Go to `Application` tab in Developer Tools (F12)
2. Click `Local Storage` → `http://localhost:3003`
3. Delete all entries that contain "mock-user" or "nutriwell"
4. Refresh and sign in again

## Why This Happened
The app was using cached test data from development. Clearing the cache forces it to use your real authentication data from Privy.

---

**After fixing this, your profile will show your real email and all data will persist properly across sign-ins!** 