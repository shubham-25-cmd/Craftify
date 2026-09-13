import express from 'express'
import { googleAuth, logout, getMe } from '../controllers/authControllers.js'
const router = express.Router();

router.get('/me', getMe)
router.post('/google', googleAuth)
router.post('/logout', logout)


export default router;