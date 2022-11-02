import express  from "express";
import { getUser, resetPass, updateUser } from "../controllers/user.js";
import { verifyUser } from "../middleware/verify.js";
const router = express.Router();

router.get("/:id",verifyUser,getUser)
router.patch("/:id",verifyUser,updateUser)
router.patch("/resetpass/:id", verifyUser, resetPass)





export default router