import {
  createSetup,
  getSetupById,
  deleteSetupById,
  getSetupsByUserId,
  likeSetupById,
  updateSetupById,
} from './../controllers/setupController';
import express from 'express';
import auth from '../middleware/auth';
import validObjectId from '../middleware/validObjectId';

const router = express.Router();

router.post('/', auth, createSetup);
router.post('/:id/like', [auth, validObjectId], likeSetupById);
router.get('/user/:userId', getSetupsByUserId);
router.get('/:id', validObjectId, getSetupById);
router.put('/:id', auth, updateSetupById);
router.delete('/:id', auth, deleteSetupById);

export default router;
