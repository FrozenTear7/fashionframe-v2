import {
  createSetup,
  getSetupById,
  deleteSetupById,
} from './../controllers/setupController';
import express from 'express';

const router = express.Router();

router.post('/', createSetup);
// router.get('/:userId', getSetupsByUserId);
router.get('/:id', getSetupById);
// router.put('/:id', updateSetupById);
router.delete('/:id', deleteSetupById);

export default router;
