# 🎯 New Features - How to Use

All backend APIs are implemented! Here's how to add the UI components to your pages:

## 1. Reviews System

### Add to Tour Detail Page (`app/tours/[id]/page.tsx`)

```tsx
import ReviewForm from '@/components/ReviewForm';
import ReviewCard from '@/components/ReviewCard';

// In your component, fetch reviews:
const reviews = await fetch(`/api/reviews?tourId=${tourId}`).then(r => r.json());

// Display reviews section:
<section className="mt-12">
  <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>
  
  {/* Review Form - only show for authenticated users */}
  <ReviewForm tourId={tourId} onSuccess={() => window.location.reload()} />
  
  {/* Display Reviews */}
  <div className="mt-8 space-y-4">
    {reviews.map(review => (
      <ReviewCard key={review._id} review={review} />
    ))}
  </div>
</section>
```

## 2. Social Sharing

### Add to Any Page

```tsx
import SocialShare from '@/components/SocialShare';

<SocialShare 
  title="Amazing Tour in Ethiopia"
  description="Check out this incredible tour!"
  url={`https://yoursite.com/tours/${tourId}`}
/>
```

## 3. Payment Button

### Add to Bookings Page (`app/bookings/page.tsx`)

```tsx
const handlePayment = async (bookingId: string) => {
  const response = await fetch('/api/payments/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingId }),
  });
  
  const { url } = await response.json();
  window.location.href = url; // Redirect to Stripe checkout
};

// In your booking card:
{booking.paymentStatus === 'pending' && (
  <button 
    onClick={() => handlePayment(booking._id)}
    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  >
    Pay Now
  </button>
)}
```

## 4. Real-time Availability

### Add to Tour Page

```tsx
'use client';
import { useEffect, useState } from 'react';

const [availability, setAvailability] = useState(null);

useEffect(() => {
  fetch(`/api/schedules/${scheduleId}/availability`)
    .then(r => r.json())
    .then(setAvailability);
}, [scheduleId]);

// Display:
{availability && (
  <div className="bg-yellow-50 p-4 rounded-lg">
    <p className="font-semibold">
      {availability.available 
        ? `${availability.remainingSpots} spots remaining` 
        : 'Fully Booked'}
    </p>
  </div>
)}
```

## 5. OAuth Sign In

### Already Working!

The sign-in page (`/signin`) now supports:
- ✅ Email/Password
- ✅ Google OAuth (if configured)
- ✅ Facebook OAuth (if configured)

## 📁 Components Created

- ✅ `components/ReviewForm.tsx` - Star rating + comment form
- ✅ `components/ReviewCard.tsx` - Display individual reviews
- ✅ `components/SocialShare.tsx` - Social media share buttons

## 🔧 Environment Setup

Before testing payments and emails, add to `.env.local`:

```env
# Stripe (get from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@ethiotravel.com

# OAuth (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## 🎨 Quick Demo Page

I can create a demo page at `/features-demo` that shows all these features working together. Would you like me to do that?

## 📝 Next Steps

1. **Test Reviews**: Go to any tour page and add the review components
2. **Test Payments**: Add the payment button to your bookings page
3. **Test Social Sharing**: Add share buttons to tour/city pages
4. **Configure APIs**: Add Stripe and email credentials to `.env.local`

All the heavy lifting is done - just drop these components into your existing pages! 🚀
