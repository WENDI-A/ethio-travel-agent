# Cloudinary Setup Guide

## Quick Start (5 Minutes)

### 1. Create Cloudinary Account
1. Visit: https://cloudinary.com/users/register_free
2. Sign up with email
3. Verify your email
4. Go to Dashboard

### 2. Get Your Credentials
From your Cloudinary Dashboard, copy:
- **Cloud Name** (e.g., `dxyz123abc`)
dqtnppc7l
- **API Key** (e.g., `123456789012345`)========IS MINE 619196755825452

- **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123`)========IS MINE 8c5N493tbUDudzKui8ri5XDuYGs

### 3. Update .env.local
Replace these lines in your `.env.local` file:

```env
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxyz123abc
```

### 4. Restart Server
```bash
# Stop server (Ctrl+C in terminal)
npm run dev
```

### 5. Upload Media
1. Go to: http://localhost:3000/admin/media
2. Select "Cities" folder
3. Drag & drop Ethiopian city images
4. Click "Upload All"
5. Copy URLs from gallery

### 6. Update Seed Data
Replace Unsplash URLs in `scripts/seed.ts` with your Cloudinary URLs:

```typescript
// Before
images: ['https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800']

// After
images: ['https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/ethio-travel/cities/addis-ababa.jpg']
```

### 7. Re-seed Database
```bash
npm run seed
```

## Done! 🎉

Your Ethiopian travel app now uses Cloudinary for all media management.

---

## Folder Organization

- **cities/** - City images and videos
- **tours/** - Tour package media
- **attractions/** - Specific attraction photos
- **general/** - Other media

---

## Tips

- Upload high-quality images (Cloudinary will optimize them)
- Use descriptive filenames (e.g., `lalibela-church.jpg`)
- Videos are automatically optimized for streaming
- Free tier: 25GB storage, 25GB bandwidth/month
