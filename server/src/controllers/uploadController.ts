import { Request, Response } from 'express';

export const uploadFileController = (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Generate public URL for the file
    const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(201).json({ message: 'File uploaded successfully', publicUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};
