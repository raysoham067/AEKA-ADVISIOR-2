# Quick Setup Guide

## Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)

## Step-by-Step Setup

### 1. Backend Setup
```bash
cd server
npm install
```

Create `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/creative-showcase
JWT_SECRET=your_secret_key_here
```

Start backend:
```bash
npm start
```

### 2. Frontend Setup
```bash
cd client/creative-showcase
npm install
```

Start frontend:
```bash
npm run dev
```

### 3. Access Application
Open browser: `http://localhost:5173`

## Important Notes

- The `uploads` directory will be created automatically when you upload your first image
- Make sure MongoDB is running before starting the server
- For production, update API URLs in frontend components to match your backend URL

## Testing the Application

1. Sign up with a new account
2. Login with your credentials
3. Upload an image from the dashboard
4. View your images on the dashboard
5. Visit `/profile/yourusername` to see your public profile
6. View all images on the landing page

