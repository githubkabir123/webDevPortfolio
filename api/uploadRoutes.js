const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Absolute path for the uploads folder
const uploadDir = path.join(__dirname,  'uploads');

// ✅ Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created uploads folder at: ${uploadDir}`);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the absolute path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Upload route
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // ✅ Return relative URL for the uploaded file
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ fileUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

module.exports = router;
