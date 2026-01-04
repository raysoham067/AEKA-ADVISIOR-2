# Quick Start - Fix MongoDB Connection

## 🚀 Fastest Solution: MongoDB Atlas (5 minutes)

### Step 1: Create Free Account
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free, no credit card needed)

### Step 2: Create Free Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0) tier
3. Select a cloud provider and region (closest to you)
4. Click "Create"

### Step 3: Setup Database Access
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (SAVE THESE!)
5. Set privileges to "Atlas admin"
6. Click "Add User"

### Step 4: Setup Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   OR add your current IP address
4. Click "Confirm"

### Step 5: Get Connection String
1. Go back to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<username>` with your database username
6. Replace `<password>` with your database password
7. Add database name: Change `/?retryWrites` to `/creative-showcase?retryWrites`

**Final connection string should look like:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/creative-showcase?retryWrites=true&w=majority
```

### Step 6: Update .env File
Edit `server/.env` and replace the MONGO_URI line:
```
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/creative-showcase?retryWrites=true&w=majority
```

### Step 7: Restart Server
```bash
cd server
npm start
```

You should now see: `MongoDB Connected` ✅

---

## Alternative: Install MongoDB Locally

If you prefer local MongoDB:

1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB will run as a Windows service automatically
4. Keep the default .env: `MONGO_URI=mongodb://localhost:27017/creative-showcase`

