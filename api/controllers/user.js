import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const getUser = async (req, res, next) => {
    const {id} = req.params 
    const user = await User.findOne({"username":id})
    const {password, ...otherDetails} = user._doc
    console.log(otherDetails)
}

export const updateUser = async (req, res, next) => {
    const {id} = req.params;
    const {email, avatar} = req.body;
    await User.findOneAndUpdate({username:id},{email:email,profilepic:avatar},{new: true})
    .catch(err => next(err))
    res.status(200).json("Updated Successfully ")
}

export const resetPass = async (req, res, next) => {
    const {id} = req.params
    const {password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await User.findByIdAndUpdate(id,{password:hash})
    .catch(err => next(err))
    res.status(200).json("Password Changed")
}