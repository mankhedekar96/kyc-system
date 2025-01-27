import type { Server } from 'http';
import { initializeServer } from './app';

async function startServer(): Promise<void> {
  try {
    
    // Import and initialize the server
    const app = await initializeServer();

    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => gracefulShutdown(server));
    process.on('SIGINT', () => gracefulShutdown(server));
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

function gracefulShutdown(server: Server): void {
  console.log('Received shutdown signal. Closing server...');
  server?.close(() => {
    console.log('Server closed successfully');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

startServer();
