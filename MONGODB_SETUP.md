# MongoDB Setup Guide for Ethio Travel

## Option 1: MongoDB Atlas (Cloud - Recommended for Beginners) ☁️

### Step 1: Create Free MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a free M0 cluster (512MB free tier)

### Step 2: Get Your Connection String
1. In Atlas dashboard, click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ethio-travel?retryWrites=true&w=majority`

### Step 3: Whitelist Your IP Address
1. In Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### Step 4: Create Database User
1. In Atlas, go to **Database Access**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username and password (remember these!)
5. Set role to **"Atlas Admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Step 5: Add to Your Project
Create or update `.env.local` file in your project root:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/ethio-travel?retryWrites=true&w=majority
OPENAI_API_KEY=your_openai_key_here
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Step 6: Test Connection & Seed Database
```powershell
# Test the connection and seed
npm run seed
```

---

## Option 2: Local MongoDB (For Advanced Users) 💻

### Step 1: Install MongoDB Community Edition

#### For Windows:
1. Download from: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer (.msi file)
3. Choose **"Complete"** installation
4. Check **"Install MongoDB as a Service"**
5. Check **"Install MongoDB Compass"** (GUI tool)
6. Complete installation

### Step 2: Verify MongoDB is Running
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# If not running, start it
Start-Service -Name MongoDB

# Or check with mongosh
mongosh
```

### Step 3: Create Database
```powershell
# Connect to MongoDB
mongosh

# In MongoDB shell:
use ethio-travel
db.createCollection("cities")
exit
```

### Step 4: Add to Your Project
Create or update `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/ethio-travel
OPENAI_API_KEY=your_openai_key_here
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Step 5: Seed Database
```powershell
npm run seed
```

---

## Quick Start (Easiest Way) 🚀

### If you don't have MongoDB yet:

**I recommend MongoDB Atlas** because:
- ✅ Free tier available (512MB)
- ✅ No installation needed
- ✅ Works from anywhere
- ✅ Automatic backups
- ✅ Easy to use

Just follow **Option 1** above!

---

## Troubleshooting Common Issues

### Error: "MongooseServerSelectionError"
**Solution**: Check your connection string and make sure:
- Password doesn't contain special characters (or URL encode them)
- IP address is whitelisted in Atlas
- MongoDB service is running (for local)

### Error: "Authentication failed"
**Solution**: 
- Verify username and password are correct
- Make sure database user has proper permissions

### Error: "ECONNREFUSED"
**Solution**: 
- For local MongoDB: Make sure MongoDB service is running
- For Atlas: Check your internet connection

### Connection String Format Issues
**Correct format for Atlas**:
```
mongodb+srv://username:password@cluster.mongodb.net/ethio-travel?retryWrites=true&w=majority
```

**Correct format for Local**:
```
mongodb://localhost:27017/ethio-travel
```

---

## After Connecting Successfully

Once your `.env.local` is set up, run:

```powershell
# Seed the database with 26 cities
npm run seed

# Start the development server
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## Need Help?

1. **Check MongoDB Atlas Dashboard** - See if cluster is active
2. **Test connection** - Use MongoDB Compass to test connection string
3. **Check logs** - Look at terminal output for specific errors
4. **Verify .env.local** - Make sure file is in project root (not in scripts folder)

---

**Recommendation**: Start with **MongoDB Atlas** (Option 1) - it's the easiest and most reliable way to get started!
