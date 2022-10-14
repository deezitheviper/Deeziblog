import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { createError } from '../config/error.js';
import jwt from "jsonwebtoken";


export const registerController = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new User({
        ...req.body,
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hash
    })
    await newUser.save()
    .catch(
        err => next(err)
    ) 
    res.status(200).send("User has been created")
}

export const loginController = async (req, res, next) => {
    let user = null;
    const id = req.body.id.toLowerCase();
    user = await User.findOne({username:id})
    .catch(err => next(err))
    if(!user){
        user = await User.findOne({
            email:id
        }).catch(err => next(err))
    }
    if(!user) return(createError(404,"This account does not exist"))
    const passwordCorrect = bcrypt.compareSync(`${req.body.password}`,user.password);
    if(!passwordCorrect) return next(createError(400, "Wrong Credentials"))
    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY)
    const {password, ...otherDetails} = user._doc
    res.cookie("accesstoken", token, {
        httpOnly: true,
    }).status(200).json({...otherDetails})
}

export const logout = (req, res) => {
    res.clearCookie('accesstoken',{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}