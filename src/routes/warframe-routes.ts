import express from 'express'
import frames from '../../public/warframe_data/frames.json'
import ephemeras from '../../public/warframe_data/ephemeras.json'
import helmets from '../../public/warframe_data/helmets.json'
import skins from '../../public/warframe_data/skins.json'
import colorPickers from '../../public/warframe_data/colorPickers.json'
import chestAttachments from '../../public/warframe_data/chestAttachments.json'
import armAttachments from '../../public/warframe_data/armAttachments.json'
import legAttachments from '../../public/warframe_data/legAttachments.json'
import syandanas from '../../public/warframe_data/syandanas.json'

const router = express.Router()

router.get('/frames', (_req, res) => {
  res.json(frames)
})

router.get('/ephemeras', (_req, res) => {
  res.json(ephemeras)
})

router.get('/helmets', (_req, res) => {
  res.json(helmets)
})

router.get('/skins', (_req, res) => {
  res.json(skins)
})

router.get('/colorPickers', (_req, res) => {
  res.json(colorPickers)
})

router.get('/chestAttachments', (_req, res) => {
  res.json(chestAttachments)
})

router.get('/armAttachments', (_req, res) => {
  res.json(armAttachments)
})

router.get('/legAttachments', (_req, res) => {
  res.json(legAttachments)
})

router.get('/syandanas', (_req, res) => {
  res.json(syandanas)
})

export default router
