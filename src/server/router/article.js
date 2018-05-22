import express from 'express'
import {articleList,articleDetail} from '../controllers/article'
const router = express.Router()

router.get('/list', articleList)
router.get('/:id', articleDetail)

export default router