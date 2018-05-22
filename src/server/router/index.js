import express from 'express'
import aritcleRouter from './article'
const router = express.Router()

router.use('/article', aritcleRouter)

export default router