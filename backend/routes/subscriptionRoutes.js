import express from 'express';
import { subscribe } from '../controllers/subscriptionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, subscribe);

export default router;