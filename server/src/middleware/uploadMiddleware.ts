import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // Save files to the uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter to validate file type and size
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf']; // Allowed file extensions
  const fileExtension = path.extname(file.originalname).toLowerCase();

  // Check file type
  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error('Only .jpg, .png, and .pdf files are allowed!'));
  }

  cb(null, true); // Accept the file
};

// Create the upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});

export default upload;
