import {
  createSetup,
  getSetupById,
  deleteSetupById,
  getSetupsByUserId,
  likeSetupById,
  updateSetupById,
  getSetups,
} from './../controllers/setupController';
import express from 'express';
import auth from '../middleware/auth';
import validObjectId from '../middleware/validObjectId';
import multer from 'multer';
import csrf from 'csurf';

const csrfProtection = csrf({
  cookie: true,
});

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post(
  '/',
  [auth, csrfProtection, upload.single('screenshotImage')],
  createSetup
);
router.post('/:id/like', [csrfProtection, auth, validObjectId], likeSetupById);
router.get('/', getSetups);
router.get('/user/:userId', validObjectId, getSetupsByUserId);
router.get('/:id', validObjectId, getSetupById);
router.put('/:id', [csrfProtection, auth, validObjectId], updateSetupById);
router.delete('/:id', [csrfProtection, auth, validObjectId], deleteSetupById);

export default router;
