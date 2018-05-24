import express from 'express'
import aritcleRouter from './article'
const router = express.Router()

router.use('*',(req,res,next)=>{
    // console.log(req)
    next()
})
router.use('/article', aritcleRouter)

export default router