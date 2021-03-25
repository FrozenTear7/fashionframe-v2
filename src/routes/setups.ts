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

const router = express.Router();

router.post('/', auth, createSetup);
router.post('/:id/like', auth, likeSetupById);
router.get('/user/:userId', getSetupsByUserId);
router.get('/:id', getSetupById);
router.put('/:id', auth, updateSetupById);
router.delete('/:id', auth, deleteSetupById);

export default router;
