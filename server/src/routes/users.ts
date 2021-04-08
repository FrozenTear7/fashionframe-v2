import express from 'express';
import auth from '../middleware/auth';
import csrf from 'csurf';
import signUpUser from '../controllers/userController/signUpUser';
import signInUser from '../controllers/userController/signInUser';
import getOwnProfile from '../controllers/userController/getOwnProfile';
import signOutUser from '../controllers/userController/signOutUser';
import getUserById from '../controllers/userController/getUserById';

const csrfProtection = csrf({
  cookie: true,
});

const router = express.Router();

router.post('/', csrfProtection, signUpUser);
router.post('/login', csrfProtection, signInUser);
router.get('/me', getOwnProfile);
router.get('/:id', csrfProtection, getUserById);
router.post('/logout', [csrfProtection, auth], signOutUser);

export default router;
