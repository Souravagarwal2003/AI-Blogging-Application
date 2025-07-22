import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import connectDB from './db.js';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Backend API routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Serve static files from frontend build (after `npm run build`)
app.use(express.static(path.join(__dirname, '../frontend')));

// For all other routes, serve index.html (React handles routing)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

// Global error handler
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
