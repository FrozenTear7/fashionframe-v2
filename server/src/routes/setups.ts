import express from 'express';
import auth from '../middleware/auth';
import validObjectId from '../middleware/validObjectId';
import multer from 'multer';
import csrf from 'csurf';
import createSetup from '../controllers/setupController/createSetup';
import favoriteSetupById from '../controllers/setupController/favoriteSetupById';
import getSetups from '../controllers/setupController/getSetups';
import getSetupByUserId from '../controllers/setupController/getSetupByUserId';
import getSetupById from '../controllers/setupController/getSetupById';
import updateSetupById from '../controllers/setupController/updateSetupById';
import deleteSetupById from '../controllers/setupController/deleteSetupById';

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
router.post(
  '/:id/favorite',
  [csrfProtection, auth, validObjectId],
  favoriteSetupById
);
router.get('/', getSetups);
router.get('/user/:userId', validObjectId, getSetupByUserId);
router.get('/:id', validObjectId, getSetupById);
router.put('/:id', [csrfProtection, auth, validObjectId], updateSetupById);
router.delete('/:id', [csrfProtection, auth, validObjectId], deleteSetupById);

export default router;
