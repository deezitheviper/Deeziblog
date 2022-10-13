import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { createError } from '../config/error.js';
import jwt from "jsonwebtoken";


export const registerController = async (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        username: req.body.username.toLowerCase(),
        email: req.body.username.toLowerCase(),
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
    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    user = await User.findOne({username:username})
    .catch(err => next(err))
    if(!user){
        user = await User.findOne({
            email:email
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