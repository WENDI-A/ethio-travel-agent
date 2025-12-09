# Mongoose MissingSchemaError Fix Summary

## Problem
The build was failing with: `Schema hasn't been registered for model "User"` error. This occurs when Mongoose models that reference other models through population are used before the referenced model is registered.

## Solution
Ensured that the User model is imported before any model that references it, either directly in the model file or in the API routes that use population.

## Files Modified

### 1. Model Files
- **models/Booking.ts** - Added `import './User';` to ensure User is registered before Booking
- **models/Review.ts** - Added `import './User';` to ensure User is registered before Review

### 2. API Route Files
- **app/api/bookings/route.ts** - Already imports User correctly ✓
- **app/api/bookings/[id]/route.ts** - Added User import before Booking
- **app/api/reviews/route.ts** - Added User import before Review
- **app/api/reviews/[id]/route.ts** - Added User import before Review
- **app/api/tours/route.ts** - Added City import before Tour (for cityId population)
- **app/api/tours/[id]/route.ts** - Added City import before Tour (for cityId population)
- **app/api/ai/context/route.ts** - Already imports City before Tour ✓

### 3. Library Files
- **lib/availability.ts** - Added User import before Booking

### 4. Files Already Correct
- **app/api/auth/[...nextauth]/route.ts** - Already imports User correctly ✓
- **app/api/auth/register/route.ts** - Already imports User correctly ✓
- **app/api/users/[id]/route.ts** - Already imports User correctly ✓
- **app/api/payments/create-checkout/route.ts** - Uses dynamic imports correctly ✓
- **app/api/payments/webhook/route.ts** - Uses dynamic imports correctly ✓
- **scripts/seed.ts** - Already imports models in correct order ✓

## Key Principles Applied

1. **Import before use**: Always import a model before importing any model that references it
2. **Side-effect imports**: Use `import './User';` in model files to ensure registration
3. **Explicit imports**: Import models explicitly in API routes rather than relying on mongoose.model()
4. **Order matters**: Import models in dependency order (User → Booking, City → Tour, etc.)

## Testing
After these changes, run:
```bash
npm run build
```

The build should complete without MissingSchemaError.

## Additional Notes
- The payment routes use dynamic imports which is correct for edge runtime compatibility
- All models use the pattern: `models.ModelName || model('ModelName', schema)` which prevents duplicate registration
- Database connection (dbConnect) is called before any model operations in all routes
