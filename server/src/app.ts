import express, { Application, Request, Response, NextFunction } from 'express';
import authRoutes from './routes/authRoutes';
import kycRoutes from './routes/kycRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { sequelize } from './models';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Load environment variables at the start
dotenv.config();

// Create the express application
const app: Application = express();

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  })
);

// Set up middleware
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Configure routes
app.use('/auth', authRoutes);
app.use('/kyc', kycRoutes);
app.use('/upload', uploadRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  res.status((err as any).status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: (err as any).stack }),
    },
  });
});

// Separate server initialization function for better control
async function initializeServer(): Promise<Application> {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
    return app;
  } catch (error) {
    console.error('Failed to initialize server:', error);
    throw error;
  }
}

// Export both the app and the initialization function
export { app, initializeServer };
export default app;
