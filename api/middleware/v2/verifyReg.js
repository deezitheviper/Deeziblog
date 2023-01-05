import { db } from '../../models/v2/db.js';
import { createError } from '../error.js';

export const checkDuplicate =  (req, res, next) => {
   
    const {username, email} = req.body;

    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q,[username.toLowerCase(),email.toLowerCase()], (err, data) => {
        if(err) return next(err);
        if(data.length) return next(createError(500, "Failed! User already exist!"))
    })
}