import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Directory to store uploaded files
const uploadDir = 'uploads/';

// Ensure the upload directory exists
try {
    fs.mkdirSync('uploads', { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }
  

// Configure storage settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the uploadDir variable
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename the file with a timestamp
  },
});
 
// Create multer instance
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File type not supported!'));
  },
});

export default upload;
