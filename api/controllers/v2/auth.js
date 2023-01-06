import bcrypt from "bcryptjs";
import { createError } from '../../config/error.js';
import jwt from "jsonwebtoken";
import { db } from '../../models/v2/db.js';
import { validationResult } from 'express-validator';

export const registerController = async (req, res, next) => {
    const {username, email, password} = req.body;
    const errors = validationResult(req)
 
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
   

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
    const values = [
        username.toLowerCase(),
        email.toLowerCase(),
        hash
    ]
    
    db.query(q,[values], (err, data) => {
        if(err) return next(err);
        return res.status(200).send("User has been created")
    })
    
}

export const loginController = async (req, res, next) => {
    const {id, password} = req.body;
    
    const q = "SELECT * FROM users WHERE username = ? OR email = ?"

    db.query(q, [id,id], (err, user) => {
        if(err) return next(err);
        if(user.length === 0) return next(createError(404, "User not found"))
        const passwordCorrect = bcrypt.compareSync(`${password}`,user[0].password);
        if(!passwordCorrect) return next(createError(400, "Wrong Credentials"))
        const token = jwt.sign({id:user.id, isAdmin:user.isAdmin}, process.env.SECRET_KEY)
        const {password, ...otherDetails} = user[0]
        res.cookie("accesstoken", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails})
    })
}

export const logout = (req, res) => {
    res.clearCookie('accesstoken',{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged")
}