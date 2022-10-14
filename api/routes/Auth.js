import express from "express";
const router = express.Router();
import {loginController, registerController,logout} from '../controllers/auth.js';


router.post('/login', loginController)
router.post('/register', registerController)
router.post('/logout', logout)

export default router