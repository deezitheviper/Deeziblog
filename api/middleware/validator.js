import {check} from 'express-validator';


export const validateRegister = [
    check('username', 'name is required').not().isEmpty()
        .isLength({
            min: 4,
            max: 32,
        }).withMessage('name must be between 3 to 32 characters'),
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password', 'password is required').not().isEmpty()
        .isLength({
            min: 6
        })
        .matches('\\d').withMessage('Password must be at least 6 characters and contain a number')

]

export const validateLogin = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password', 'password is required').not().isEmpty()
        .isLength({
            min: 6
        })
        .matches('\\d').withMessage('Password must be at least 6 characters and contain a number')

]