import {
  createSetup,
  getSetupById,
  deleteSetupById,
  getSetupsByUserId,
} from './../controllers/setupController';
import express from 'express';

const router = express.Router();

router.post('/', createSetup);
router.get('/user/:userId', getSetupsByUserId);
router.get('/:id', getSetupById);
// router.put('/:id', updateSetupById);
router.delete('/:id', deleteSetupById);

export default router;
