import express from 'express'
import confirmController from '../controllers/confirm.js'

const router = express.Router()

router.get('/:token', confirmController.confirmSubscription)

export default router