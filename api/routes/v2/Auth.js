import express from "express";
const router = express.Router();
import { registerController, loginController} from '../../controllers/v2/auth.js';
import { checkDuplicate } from "../../middleware/v2/verifyReg.js";
import { validateRegister, validateLogin } from "../../middleware/validator.js";



router.post('/register',validateRegister,checkDuplicate, registerController)
router.post('/login',validateLogin, loginController)


export default router