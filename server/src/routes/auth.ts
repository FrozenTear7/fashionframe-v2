import {
  createUser,
  loginUser,
  getOwnProfile,
  logoutUser,
  getCsrfToken,
} from './../controllers/authController';
import express from 'express';
import auth from '../middleware/auth';
import csrf from 'csurf';

const csrfProtection = csrf({
  cookie: true,
});

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/me', [csrfProtection, auth], getOwnProfile);
router.post('/logout', [csrfProtection, auth], logoutUser);
router.get('/csrf-token', getCsrfToken);

export default router;
