import express from 'express'
import unsubscribeContorller from '../controllers/unsubscribe.js'

const router = express.Router()

router.get('/:token', unsubscribeContorller.unsubscribeUser)

export default router