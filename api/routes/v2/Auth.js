import express from "express";
const router = express.Router();
import { registerController} from '../../controllers/v2/auth.js';
import { checkDuplicate } from "../../middleware/v2/verifyReg.js";



router.post('/register',checkDuplicate, registerController)


export default router