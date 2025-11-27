# 🇪🇹 Ethio Travel - AI-Powered Ethiopian Tourism Platform

A modern, AI-integrated travel agency website for discovering and booking tours across Ethiopia's most beautiful cities.

## ✨ Features

### Core Features
- 🏛️ **City Explorer**: Browse Ethiopian cities with rich descriptions and stunning imagery
- 🎫 **Tour Packages**: Discover curated tour packages with flexible filtering
- 📅 **Booking System**: Easy booking with availability management
- 👤 **User Profiles**: Personalized user accounts with booking history

### AI-Powered Features
- 🤖 **AI Travel Assistant**: 24/7 chatbot powered by GPT-4 to answer travel questions
- ⭐ **Personalized Recommendations**: ML-based tour suggestions based on preferences and history
- 🎨 **AI Image Generation**: DALL-E 3 integration for generating city/tour images
- ✍️ **AI Content Generator**: GPT-4 powered descriptions for cities and tours
- 🌍 **Multilingual Translation**: Support for Amharic, English, Oromo, and Tigrinya
- 💰 **Dynamic Pricing**: AI-optimized pricing based on demand and seasonality

## 🛠️ Tech Stack

- **Frontend**: Next.js 16+, React, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **AI Services**: OpenAI (GPT-4, DALL-E 3)
- **Authentication**: NextAuth.js with OAuth (Google, Facebook)
- **Payments**: Stripe
- **Email**: Nodemailer
- **Icons**: Heroicons

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- OpenAI API key

## 🚀 Getting Started

### 1. Clone the repository

\`\`\`bash
git clone <your-repo-url>
cd ethio-travel
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/ethio-travel
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ethio-travel

OPENAI_API_KEY=your_openai_api_key_here

NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
\`\`\`

**Get your API keys:**
- MongoDB: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- OpenAI: [OpenAI Platform](https://platform.openai.com/api-keys)
- NextAuth Secret: Run `openssl rand -base64 32`

### 4. Seed the database

\`\`\`bash
npm run seed
\`\`\`

This will populate your database with sample Ethiopian cities, tours, and schedules.

### 5. Run the development server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
ethio-travel/
├── app/
│   ├── api/              # API routes
│   │   ├── cities/       # City CRUD endpoints
│   │   ├── tours/        # Tour CRUD endpoints
│   │   ├── bookings/     # Booking endpoints
│   │   └── ai/           # AI service endpoints
│   │       ├── chat/
│   │       ├── recommend/
│   │       ├── generate-image/
│   │       ├── generate-content/
│   │       ├── translate/
│   │       └── dynamic-pricing/
│   ├── cities/           # Cities pages
│   ├── tours/            # Tours pages
│   ├── bookings/         # Bookings page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── Hero.tsx
│   ├── CityCard.tsx
│   ├── TourCard.tsx
│   └── AIChat.tsx        # AI chatbot widget
├── lib/
│   ├── mongodb.ts        # MongoDB connection
│   └── openai.ts         # OpenAI client
├── models/
│   ├── City.ts
│   ├── Tour.ts
│   ├── Schedule.ts
│   ├── Booking.ts
│   └── User.ts
├── scripts/
│   └── seed.ts           # Database seeding
└── ARCHITECTURE.md       # System architecture diagram
\`\`\`

## 🎯 API Endpoints

### Core APIs
- `GET /api/cities` - List all cities (with search)
- `GET /api/cities/[id]` - Get city details
- `GET /api/tours` - List tours (with filters)
- `GET /api/tours/[id]` - Get tour details
- `POST /api/bookings` - Create booking
- `GET /api/schedules/[id]/availability` - Check real-time availability

### Payment APIs
- `POST /api/payments/create-checkout` - Create Stripe checkout session
- `POST /api/payments/webhook` - Handle Stripe webhooks

### Review APIs
- `GET /api/reviews` - Get reviews (with filters)
- `POST /api/reviews` - Create review
- `PUT /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review

### AI APIs
- `POST /api/ai/chat` - AI travel assistant
- `POST /api/ai/recommend` - Get personalized recommendations
- `POST /api/ai/generate-image` - Generate images with DALL-E
- `POST /api/ai/generate-content` - Generate descriptions with GPT-4
- `POST /api/ai/translate` - Translate content
- `POST /api/ai/dynamic-pricing` - Calculate dynamic pricing

## 🎨 Design Features

- **Ethiopian Color Palette**: Green and gold theme inspired by the Ethiopian flag
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Smooth Animations**: Framer Motion for delightful interactions
- **Glassmorphism**: Modern glass effects and gradients
- **Dark Mode Ready**: CSS variables for easy theme switching

## 📊 Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed system architecture diagram showing all components and AI integrations.

## 🔮 Future Enhancements

### ✅ Completed
- [x] **NextAuth.js authentication** - Fully implemented with credentials and OAuth providers
- [x] **Payment gateway integration** - Stripe integration with checkout and webhooks
- [x] **User reviews and ratings** - Complete review system for tours and cities
- [x] **Real-time availability updates** - Live capacity tracking for tours
- [x] **Email notifications** - Booking and payment confirmation emails
- [x] **Social media integration** - OAuth login (Google/Facebook) and social sharing

### 🚧 Planned
- [ ] Progressive Web App (PWA) - Installable app with offline support
- [ ] Admin dashboard enhancements (review moderation, payment reports)
- [ ] Advanced analytics and reporting
- [ ] Multi-currency support
- [ ] SMS notifications
- [ ] Mobile apps (iOS/Android)

## 📝 Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Ethiopian Tourism Organization
- OpenAI for AI capabilities
- Next.js team for the amazing framework
- All contributors and supporters

---

