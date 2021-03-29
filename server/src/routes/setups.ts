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

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', [auth, upload.single('screenshotImage')], createSetup);
router.post('/:id/like', [auth, validObjectId], likeSetupById);
router.get('/', getSetups);
router.get('/user/:userId', validObjectId, getSetupsByUserId);
router.get('/:id', validObjectId, getSetupById);
router.put('/:id', [auth, validObjectId], updateSetupById);
router.delete('/:id', [auth, validObjectId], deleteSetupById);

export default router;
