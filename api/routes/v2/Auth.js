import express from "express";
const router = express.Router();
import { registerController} from '../../controllers/v2/auth.js';
import { checkDuplicate } from "../../middleware/v2/verifyReg.js";
import { validateRegister } from "../../middleware/validator.js";



router.post('/register',validateRegister,checkDuplicate, registerController)


export default router