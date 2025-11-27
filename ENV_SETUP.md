# Environment Variables Setup

Add these variables to your `.env.local` file:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ethio-travel
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ethio-travel

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Notifications (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@ethiotravel.com

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## How to Get API Keys:

### Stripe
1. Go to https://dashboard.stripe.com/register
2. Create an account
3. Get test keys from Dashboard > Developers > API keys
4. For webhook secret: Dashboard > Developers > Webhooks > Add endpoint
   - URL: `http://localhost:3000/api/payments/webhook`
   - Events: `checkout.session.completed`, `checkout.session.expired`

### Email (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account > Security > App passwords
3. Generate an app password for "Mail"
4. Use your email as SMTP_USER and the app password as SMTP_PASSWORD

### Google OAuth (Optional)
1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### Facebook OAuth (Optional)
1. Go to https://developers.facebook.com
2. Create a new app
3. Add Facebook Login product
4. Add redirect URI: `http://localhost:3000/api/auth/callback/facebook`
