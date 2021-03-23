import { createUser, loginUser } from './../controllers/authController';
import express from 'express';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);

export default router;
