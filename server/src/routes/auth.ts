import express from 'express';
import auth from '../middleware/auth';
import csrf from 'csurf';
import signUpUser from '../controllers/authController/signUpUser';
import signInUser from '../controllers/authController/signInUser';
import getOwnProfile from '../controllers/authController/getOwnProfile';
import signOutUser from '../controllers/authController/signOutUser';

const csrfProtection = csrf({
  cookie: true,
});

const router = express.Router();

router.post('/', csrfProtection, signUpUser);
router.post('/login', csrfProtection, signInUser);
router.get('/me', getOwnProfile);
router.post('/logout', [csrfProtection, auth], signOutUser);

export default router;
