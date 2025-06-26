import express from 'express';
import { createBlogWithAI, getUserBlogs } from '../controllers/blogController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/generate', authMiddleware, createBlogWithAI);
router.get('/', authMiddleware, getUserBlogs);

export default router;