// authRoutes.js
import express from 'express';
import { login, register } from '../controllers/authController.js'; // Import the login and register functions from authController

const router = express.Router();

router.post('/login', login); // Use the login function from authController
router.post('/register', register); // Use the register function from authController

export default router;
