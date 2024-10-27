// src/middlewares/upload.ts
import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Directory to store uploaded files
const uploadDir = process.env.UPLOAD_DIR || 'uploads/';

// Ensure the upload directory exists
fs.mkdirSync(uploadDir, { recursive: true });

// Extend Express Request interface
interface CustomRequest extends Request {
  fileValidationError?: string;
}

// Configure storage settings for multer
const storage: StorageEngine = multer.diskStorage({
  destination: (req: CustomRequest, file, cb) => {
    cb(null, uploadDir); // Use the uploadDir variable
  },
  filename: (req: CustomRequest, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename the file with a timestamp
  },
});

// Create multer instance with file size limit and improved error handling
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
  fileFilter: (req: CustomRequest, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    req.fileValidationError = 'Error: File type not supported!';
    cb(null, false);
  },
});

export default upload;
