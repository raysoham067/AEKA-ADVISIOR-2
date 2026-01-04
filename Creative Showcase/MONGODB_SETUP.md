# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database) ⭐

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account (no credit card required)
3. Create a free cluster (M0 - Free tier)

### Step 2: Get Your Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `creative-showcase` or keep the default

### Step 3: Update .env File
Update `server/.env` with your Atlas connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/creative-showcase?retryWrites=true&w=majority
```

### Step 4: Create Database User
1. In Atlas, go to "Database Access"
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Set privileges to "Atlas admin" or "Read and write to any database"

---

## Option 2: Install MongoDB Locally

### Windows Installation:
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service (recommended)
5. MongoDB will start automatically

### Start MongoDB (if not running as service):
```bash
# Navigate to MongoDB bin directory (usually)
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod
```

### Verify MongoDB is running:
```bash
mongosh
```

---

## Quick Test Connection

After setting up either option, restart your server:
```bash
cd server
npm start
```

You should see: `MongoDB Connected` instead of the error.

