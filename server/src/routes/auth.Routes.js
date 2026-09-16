import {Router} from 'express'
import { register, login, logout, me } from '../controllers/authControllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/me',authMiddleware,me)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)


export default router;