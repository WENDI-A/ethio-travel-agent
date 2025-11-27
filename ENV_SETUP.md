# Environment Variables Setup

Copy this file to `.env.local` and fill in your actual values:

```bash
MONGODB_URI=mongodb://localhost:27017/ethio-travel
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ethio-travel?retryWrites=true&w=majority

OPENAI_API_KEY=your_openai_api_key_here

NEXTAUTH_SECRET=your_nextauth_secret_here_generate_with_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000

# Optional: For image uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## How to Get API Keys

1. **MongoDB**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use local MongoDB
2. **OpenAI**: Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
3. **NextAuth Secret**: Generate with `openssl rand -base64 32`
4. **Cloudinary** (optional): Sign up at [Cloudinary](https://cloudinary.com/)
