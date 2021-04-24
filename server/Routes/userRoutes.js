import express from 'express';
import { createUser, loginUser, editUser, getUserInfo, googleAuth } from '../controllers/user.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.post('/register', createUser );
router.post('/login', loginUser);
router.post('/googleAuth', auth, googleAuth );
router.get('/:id', auth, getUserInfo);
router.post('/edit/:id', auth, editUser);


export default router;
