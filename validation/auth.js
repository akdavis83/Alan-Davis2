const {body} = require('express-validator')
exports.login = ()=>{
    return [
        body('username')
        .isString()
        .not().isEmpty()
        .withMessage('Username Required')
        .isAlphanumeric()
        .withMessage('Username should have numbers and letters only')
        .isLength({min:5})
        .withMessage('Username should be at least 5 characters'), 
        body('password')
        .isString()
        .not().isEmpty()
        .withMessage('Password Required')
        .isAlphanumeric()
        .withMessage('Password should be letters and numbers only')
        .isLength({min:8})
        .withMessage('Password  Should be at least 8 characters long')
    ]
}

exports.register = ()=>{
    return [
        body('username')
    .isString()
    .not().isEmpty()
    .withMessage('Username Required')
    .isAlphanumeric()
    .withMessage('Username should be numbers and letters only')
    .isLength({min:5})
    .withMessage('Username should be at least 5 characters'), 
    body('password')
    .isString()
    .not().isEmpty()
    .withMessage('Password Required')
    .isAlphanumeric()
    .withMessage('Password should be letters and numbers only')
    .isLength({min:8})
    .withMessage('Password should be at least 8 characters long'), 
    body('repeatPassword')
    .isString()
    .not().isEmpty()
    .withMessage('Password 2 Required')
    .custom((value, {req})=>{
        if(value !==req.body.password)
            throw new Error('Passwords not matching')
        else 
        return true
    })
    ]

}