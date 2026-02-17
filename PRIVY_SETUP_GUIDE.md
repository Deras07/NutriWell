# Privy Authentication Setup Guide for NutriWell

## 🚀 Overview
This guide will help you configure Privy authentication with email, SMS, Web3 wallet, and social login options for your NutriWell app.

## 📱 Current Configuration
Your Privy app is already configured with:
- **App ID**: `cmdf0y8n9016ajr0mip04tin3`
- **App Secret**: `2A2NEGxqHV5X2KvJRF5UvaCqeUCEVDpLzEbFiHCFCYSq14MsqrfTkvi19hK97p8kxhUkxstnzMcPjkvWaCipTNvd`

## 🔐 Authentication Methods Configured

### 1. **Email Authentication** ✅
- Users can sign up/login with email
- Email verification required
- Automatic wallet creation after login

### 2. **SMS Authentication** ✅  
- Users can sign up/login with phone number
- SMS verification required
- Automatic wallet creation after login

### 3. **Web3 Wallet Authentication** ✅
- Users can connect existing wallets (MetaMask, WalletConnect, etc.)
- Embedded wallet creation for users without wallets
- Support for Ethereum mainnet

### 4. **Social Login** ✅
- Google OAuth
- Twitter OAuth  
- Discord OAuth
- GitHub OAuth

## ⚙️ Required Setup Steps

### Step 1: Environment Variables
Create a `.env` file in your project root with:

```bash
# Privy Configuration
REACT_APP_PRIVY_APP_ID=cmdf0y8n9016ajr0mip04tin3
REACT_APP_PRIVY_APP_SECRET=2A2NEGxqHV5X2KvJRF5UvaCqeUCEVDpLzEbFiHCFCYSq14MsqrfTkvi19hK97p8kxhUkxstnzMcPjkvWaCipTNvd

# OAuth Client IDs for Social Logins
REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
REACT_APP_TWITTER_CLIENT_ID=your_twitter_oauth_client_id_here
REACT_APP_DISCORD_CLIENT_ID=your_discord_oauth_client_id_here
REACT_APP_GITHUB_CLIENT_ID=your_github_oauth_client_id_here

# WalletConnect Project ID
REACT_APP_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

### Step 2: Get OAuth Client IDs

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (for production)
7. Copy the Client ID to `REACT_APP_GOOGLE_CLIENT_ID`

#### Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Set up OAuth 2.0
4. Add callback URLs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`
5. Copy the Client ID to `REACT_APP_TWITTER_CLIENT_ID`

#### Discord OAuth
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to OAuth2 → General
4. Add redirect URIs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`
5. Copy the Client ID to `REACT_APP_DISCORD_CLIENT_ID`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Homepage URL to your app URL
4. Set Authorization callback URL to:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`
5. Copy the Client ID to `REACT_APP_GITHUB_CLIENT_ID`

### Step 3: WalletConnect Setup
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID to `REACT_APP_WALLET_CONNECT_PROJECT_ID`

## 🎨 Customization Options

### Theme Colors
The app uses your brand colors:
- **Primary**: `#E8B4B8` (Pastel coral)
- **Theme**: Light mode
- **Logo**: Add your logo URL in the PrivyProvider config

### Wallet Configuration
- **Embedded Wallets**: Automatically created for users without wallets
- **Supported Chains**: Currently Ethereum mainnet, easily expandable
- **Wallet Creation**: Triggered after email/SMS login

## 🔧 Testing Your Setup

### Local Development
1. Start your app: `npm run dev`
2. Navigate to login/signup
3. Test each authentication method:
   - Email signup/login
   - SMS signup/login  
   - Wallet connection
   - Social logins (after adding client IDs)

### Production Deployment
1. Update redirect URIs in OAuth providers
2. Set environment variables in your hosting platform
3. Test all authentication flows

## 🚨 Security Notes

- **Never commit** your `.env` file to version control
- **Keep your app secret** secure and private
- **Use HTTPS** in production for all OAuth callbacks
- **Validate redirect URIs** to prevent OAuth attacks

## 📚 Additional Resources

- [Privy Documentation](https://docs.privy.io/)
- [Privy React Auth SDK](https://docs.privy.io/guides/frontend/react-auth)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/rfc6819)

## 🆘 Troubleshooting

### Common Issues
1. **OAuth redirect errors**: Check callback URLs in provider settings
2. **Wallet connection fails**: Verify WalletConnect project ID
3. **Social login not working**: Ensure client IDs are correct
4. **Environment variables not loading**: Restart your dev server

### Support
- Check Privy documentation for detailed guides
- Review OAuth provider documentation for specific setup steps
- Test each authentication method individually to isolate issues

---

**Your NutriWell app is now configured with enterprise-grade authentication! 🎉**
