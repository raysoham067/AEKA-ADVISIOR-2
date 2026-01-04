const router = require("express").Router();
const Image = require("../models/Image");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

// Get random images for landing page
router.get("/all", async (req, res) => {
  try {
    const images = await Image.find().populate("userId", "username").sort({ createdAt: -1 });
    // Shuffle array for random display
    const shuffled = images.sort(() => 0.5 - Math.random());
    res.json(shuffled);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user's images
router.get("/me", auth, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get images by username
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const images = await Image.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload image
router.post("/add", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    const image = await Image.create({
      userId: req.user.id,
      imageUrl: imageUrl,
    });
    res.json({ message: "Image added", image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
