# Creative Showcase 🎨

A full-stack web application for artists to upload and showcase their digital memories and artwork. Built with React (frontend) and Node.js/Express (backend) with MongoDB for data storage.

## Features

- **Landing Page**: Displays a random selection of user-uploaded images in a beautiful masonry/mosaic layout
- **User Authentication**: Secure signup and login functionality with JWT tokens
- **User Dashboard**: Private dashboard where users can upload images and view their own gallery
- **Public Profiles**: Each user has a public profile accessible via `/profile/[username]` showcasing their artwork
- **Image Upload**: Easy-to-use image upload interface with file validation
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt (password hashing)
- Multer (file uploads)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas account)

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "assignment akea advisiors"
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_jwt_key_here
```

**Example MongoDB connection strings:**
- Local: `mongodb://localhost:27017/creative-showcase`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/creative-showcase?retryWrites=true&w=majority`

### 3. Frontend Setup

```bash
cd ../client/creative-showcase
npm install
```

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server:**
   ```bash
   cd client/creative-showcase
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

3. Open your browser and navigate to `http://localhost:5173`

### Production Build

1. **Build the frontend:**
   ```bash
   cd client/creative-showcase
   npm run build
   ```

2. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
assignment akea advisiors/
├── client/
│   └── creative-showcase/
│       ├── src/
│       │   ├── components/
│       │   │   ├── MasonryGrid.jsx
│       │   │   └── Navbar.jsx
│       │   ├── Pages/
│       │   │   ├── Landing.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── Signup.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   └── PublicProfile.jsx
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Image.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── images.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Images
- `GET /api/images/all` - Get all images (randomized for landing page)
- `GET /api/images/me` - Get current user's images (requires authentication)
- `GET /api/images/user/:username` - Get images by username
- `POST /api/images/add` - Upload a new image (requires authentication)

## Deployment

### Deploying to Vercel (Frontend)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to the frontend directory:
   ```bash
   cd client/creative-showcase
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Update the API URL in your frontend code to point to your backend URL, or use environment variables.

### Deploying to Netlify (Frontend)

1. Build the project:
   ```bash
   cd client/creative-showcase
   npm run build
   ```

2. Deploy the `dist` folder to Netlify via drag-and-drop or Netlify CLI.

### Deploying Backend (Heroku/Railway/Render)

1. Set environment variables in your hosting platform:
   - `PORT` (usually auto-set)
   - `MONGO_URI`
   - `JWT_SECRET`

2. Make sure to update the frontend API URLs to point to your deployed backend.

3. For file uploads, consider using cloud storage (AWS S3, Cloudinary) instead of local storage for production.

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_jwt_key_here
```

## Usage

1. **Sign Up**: Create a new account with a unique username and email
2. **Login**: Access your dashboard with your credentials
3. **Upload Images**: Use the dashboard to upload your artwork (supports JPG, PNG, GIF, WebP)
4. **View Gallery**: Browse all uploaded images on the landing page
5. **Public Profile**: Share your profile link (`/profile/yourusername`) to showcase your work

## Features in Detail

- **Secure Authentication**: Passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **File Upload**: Multer handles image uploads with validation
- **Masonry Layout**: Beautiful responsive grid layout for images
- **User Profiles**: Each user has a unique public profile
- **Error Handling**: Comprehensive error handling on both frontend and backend

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (if using local MongoDB)
- Check your connection string in `.env`
- Verify network access if using MongoDB Atlas

### Image Upload Issues
- Ensure the `uploads` directory exists in the server folder
- Check file size (max 10MB)
- Verify file type (only images allowed)

### CORS Issues
- Ensure the backend CORS is configured correctly
- Check that the frontend URL matches the allowed origins

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is created for educational purposes.

## Author

Created as part of the assignment for Akea Advisors.

---

**Note**: Remember to update the API URLs in the frontend code when deploying to production. Consider using environment variables for better configuration management.

