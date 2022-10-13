import express from "express";
const router = express.Router()

router.get('/login', (req, res)=>{
        res.send("login api")
})


router.get('/register', (req, res)=>{
    res.send("register api")
})
export default router