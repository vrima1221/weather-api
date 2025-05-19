import express from 'express'
import weatherController from '../controllers/weather.js'

const router = express.Router()

router.get('/', weatherController.getWeather)

export default router